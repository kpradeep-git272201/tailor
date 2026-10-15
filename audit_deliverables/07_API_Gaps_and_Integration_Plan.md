# 07. API Gaps & Backend Integration Plan

## 1. Executive Summary & Integration Assessment

The current Tailor App frontend contains references to 13 internal backend API endpoints across `AppConfig` and `CommonService`, plus 2 third-party geolocation endpoints.

### Key Audit Findings:
1. **0% Test Verification:** Zero unit, integration, or e2e tests exist that verify frontend-to-backend API contracts.
2. **Missing Production Core Endpoints:** Critical eCommerce operations—specifically **Order Placement**, **Order History**, **Cart Management**, **User Address Book**, **Wishlist**, and **User Registration**—have **zero backend API endpoints referenced in the frontend**. They are simulated purely via browser `localStorage`.
3. **Burst Call Anti-Patterns:** Multiple endpoints are invoked inside uncoordinated `forEach` loops in `CartPage`, creating race conditions and HTTP request storms.
4. **Security Vulnerabilities:** Plaintext Google Maps API keys and encryption keys are hardcoded in source files. Outgoing HTTP requests lack an automated JWT Bearer token interceptor.

---

## 2. API Classification Inventory

Every integration site in the frontend has been inspected and categorized into the standard classification matrix:

| Class | Definition | Total Count | Endpoints / Features Affected |
|---|---|:---:|---|
| **Class A** | API call exists and has evidence of successful testing | **0** | None. (No mock HTTP testing in `*.spec.ts` files) |
| **Class B** | API call exists but has not been verified | **0** | No active backend instance available during audit |
| **Class C** | API call exists but appears defective or incomplete | **6** | `sendOtp` (plain text response), `verifyOtp` (hardcoded "123456" OTP), `getArticles` (response double-wrapping), `getLast10DaysWorkHours` (burst loop), `getArticleRatesByTailorAndArticle` (burst loop), Google Geocoding (exposed key, hardcoded coords) |
| **Class D** | References backend endpoint whose implementation is unavailable | **13** | All internal endpoints in `AppConfig.ENDPOINTS.PRIVATE` & `MASTER` |
| **Class E** | Feature uses Mock JSON, static data, or LocalStorage instead of real API | **10** | Promotional Brands, Service Types, Top Tailors, Fabric Master, Color Classification, Tailor Work Hours, Tailor Rates, Orders, Addresses, Wishlist |
| **Class F** | Required backend API integration appears completely missing | **8** | Order Placement, Order History, Cart Sync, Address CRUD, Wishlist CRUD, Profile, Registration, Tailor Reviews |

---

## 3. Detailed Gaps Analysis & Required Backend Contracts

To transform the Tailor App from a mock-heavy prototype into a production-grade enterprise application, the following Spring Boot REST contracts must be established.

### Gap 1: Order Placement & Checkout (`POST /api/v1/orders`)
* **Current Status:** Purely simulated in `OrderSummaryPage.confirmOrder()` via `localStorage.setItem('myOrder', ...)`.
* **Required Backend Contract:**
  * **Endpoint:** `POST /api/v1/orders`
  * **Auth:** Bearer Token required
  * **Request Body:**
    ```json
    {
      "items": [
        {
          "articleId": 1,
          "fabricId": 101,
          "colorId": 2,
          "tailorId": 100,
          "quantity": 1,
          "customMeasurements": {
            "chest": 40.5,
            "waist": 34.0,
            "shoulder": 18.0,
            "sleeve": 25.0
          }
        }
      ],
      "deliveryAddressId": "addr-8921",
      "paymentMethod": "CASH_ON_DELIVERY",
      "specialInstructions": "Double stitch hem"
    }
    ```
  * **Response Body (201 Created):**
    ```json
    {
      "success": true,
      "data": {
        "orderId": "ORD-2026-90214",
        "orderStatus": "PLACED",
        "bookingDate": "2026-10-15T18:00:00Z",
        "estimatedTrialDate": "2026-10-18T18:00:00Z",
        "estimatedDeliveryDate": "2026-10-21T18:00:00Z",
        "billing": {
          "itemsTotal": 500.00,
          "stitchingTotal": 450.00,
          "handlingCharge": 9.00,
          "deliveryCharge": 0.00,
          "taxGst": 45.00,
          "grandTotal": 1004.00
        }
      }
    }
    ```

---

### Gap 2: Order History & Tracking (`GET /api/v1/orders` & `GET /api/v1/orders/{id}`)
* **Current Status:** `MyorderPage` reads local array from `localStorage.getItem('myOrder')` and crashes if empty.
* **Required Backend Contract:**
  * **Endpoint:** `GET /api/v1/orders` (supports `?page=0&size=10&status=ACTIVE`)
  * **Auth:** Bearer Token required
  * **Response Body:**
    ```json
    {
      "success": true,
      "data": {
        "content": [
          {
            "orderId": "ORD-2026-90214",
            "orderDate": "2026-10-15T18:00:00Z",
            "currentStage": "STITCHING",
            "stageIndex": 2,
            "stages": [
              { "name": "Booked", "completed": true, "timestamp": "2026-10-15T18:00:00Z" },
              { "name": "Fabric Sourced", "completed": true, "timestamp": "2026-10-16T10:00:00Z" },
              { "name": "Stitching", "completed": false, "timestamp": null },
              { "name": "Trial Ready", "completed": false, "timestamp": null },
              { "name": "Delivered", "completed": false, "timestamp": null }
            ],
            "tailor": {
              "tailorId": 100,
              "name": "Rahul Kumar",
              "phone": "+919876543210"
            },
            "items": [
              { "articleName": "Casual Shirt", "fabricType": "Cotton", "color": "Navy Blue", "quantity": 1 }
            ],
            "grandTotal": 1004.00
          }
        ],
        "totalElements": 1,
        "totalPages": 1
      }
    }
    ```

---

### Gap 3: Cloud Cart / Shopping Bag Sync (`/api/v1/cart`)
* **Current Status:** Saved in `localStorage.getItem('shopping_bag')`. Overwritten with a single item on `addToBag()`.
* **Required Backend Contracts:**
  * `GET /api/v1/cart`: Retrieve current user's active bag.
  * `POST /api/v1/cart/items`: Add item (merges duplicates, increments quantity).
  * `PUT /api/v1/cart/items/{itemId}`: Update quantity or assigned tailor.
  * `DELETE /api/v1/cart/items/{itemId}`: Remove single item.
  * `DELETE /api/v1/cart`: Clear cart on checkout.

---

### Gap 4: User Address Book (`/api/v1/user/addresses`)
* **Current Status:** Stored in `localStorage.getItem('myAddress')`.
* **Required Backend Contracts:**
  * `GET /api/v1/user/addresses`: List saved addresses for authenticated user.
  * `POST /api/v1/user/addresses`: Create new address.
  * `PUT /api/v1/user/addresses/{id}`: Update address details or set as default.
  * `DELETE /api/v1/user/addresses/{id}`: Delete address.

---

### Gap 5: Customer Wishlist (`/api/v1/wishlist`)
* **Current Status:** Stored in `localStorage.getItem('wish_list')`. Toggling adds duplicate items repeatedly.
* **Required Backend Contracts:**
  * `GET /api/v1/wishlist`: List bookmarked fabric and color items.
  * `POST /api/v1/wishlist/toggle`: Atomic toggle (adds if missing, removes if present).

---

### Gap 6: Batch Rate & Work Hours Calculation Endpoint
* **Current Problem in `CartPage`:**
  To compute prices for items in the cart, the frontend fires separate calls to `api/v2/tailors/article-rates/{tailorId}/{articleId}` and `api/v2/tailors/{tailorId}/work-hours/last10days` for every item in a loop.
* **Recommended Backend Optimization:**
  * **Endpoint:** `POST /api/v2/tailors/calculate-quote`
  * **Request Body:**
    ```json
    {
      "tailorId": 100,
      "items": [
        { "articleId": 1, "quantity": 1 },
        { "articleId": 2, "quantity": 2 }
      ]
    }
    ```
  * **Response Body (Single Roundtrip):**
    ```json
    {
      "tailorId": 100,
      "totalStitchingCharge": 1700.00,
      "breakdown": [
        { "articleId": 1, "unitPrice": 500.00, "quantity": 1, "subtotal": 500.00 },
        { "articleId": 2, "unitPrice": 600.00, "quantity": 2, "subtotal": 1200.00 }
      ],
      "estimatedTrialDate": "2026-10-18",
      "estimatedDeliveryDate": "2026-10-21"
    }
    ```

---

## 4. Frontend Integration Architecture Strategy

### 1. Centralized Standard API Envelope
All Spring Boot REST endpoints must adopt a uniform response envelope:
```typescript
export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
  timestamp: string;
  errorCode?: string;
}
```

### 2. HTTP Interceptors Architecture
1. **`AuthInterceptor`:**
   Intercepts every outgoing request, retrieves the JWT token from `AuthService`, and attaches the header:
   `Authorization: Bearer <token>`.
2. **`ErrorInterceptor`:**
   Safely catches `HttpErrorResponse` without throwing TypeErrors on empty or HTML bodies. Automatically triggers `401 Unauthorized` token refresh or redirects to login.
3. **`LoggingInterceptor`:**
   Logs request durations and error traces in development mode.

### 3. Interchangeable Data Provider Pattern (Mock vs Real HTTP)
Instead of UI components importing `CommonService` directly, the rebuild must decouple the UI behind abstract data provider interfaces:
```typescript
export abstract class CatalogDataProvider {
  abstract getArticles(): Observable<Article[]>;
  abstract getFabricCategories(articleId: number): Observable<FabricCategory[]>;
  abstract getFabricDetails(fabricId: number): Observable<FabricDetail>;
}

// In development / testing:
{ provide: CatalogDataProvider, useClass: MockCatalogService }

// In production / integration:
{ provide: CatalogDataProvider, useClass: HttpCatalogService }
```
This guarantees that UI components are 100% testable without running a backend, and switching to Spring Boot requires zero modifications to UI templates or components.
