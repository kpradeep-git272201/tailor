# 08. New Project Rebuild Roadmap & Clean Architecture Strategy

## 1. Feature Disposition Matrix

Based on our thorough audit of the existing codebase, features are categorized into five distinct architectural dispositions:

### 1. Features to Preserve (Working Concepts & Strong UI Patterns)
* **Visual Card & Aesthetic Palette:** The visual presentation of fabric textures, garment cards, and brand logos has strong aesthetic appeal and should be carried over into the new design system.
* **OTP Authentication Workflow:** The UX of passwordless phone-number login with timer countdown and resend options is well suited for mobile users.
* **Garment Customizer Layout:** The layout showing main garment photos, inside detail shots, color swatches, and fabric properties provides an engaging e-commerce experience.
* **Tailor Rating & Distance Cards:** The tailor preview cards showing rating, years of experience, distance in km, and specialty tags communicate key trust signals effectively.
* **Order Status Stepper:** The visual progress stepper (Booked $\rightarrow$ Cutting $\rightarrow$ Stitching $\rightarrow$ Trial $\rightarrow$ Delivered) provides excellent order visibility.

### 2. Features that Need Correction (Defective Code to Fix)
* **OTP Verification Logic:** Remove hardcoded `"123456"` submission and wire actual entered digits.
* **Cart Item Addition:** Replace the single-item overwrite in `addToBag()` with an array append/merge strategy that supports multiple items.
* **Order Tracking Null Safety:** Fix the `TypeError` crash in `MyorderPage` when order list is empty.
* **Tailor Details Navigation:** Remove broken `router.getCurrentNavigation()` in `ngOnInit`; load tailor data by route ID parameter.
* **Billing Calculation:** Correct the inverted parameters in `calculateTotalPrice()`.
* **Wishlist Toggle:** Implement true item deduplication and toggle on/off.
* **Environment Configuration:** Unify environment files and remove redundant `src/app/environments` folder.

### 3. Features that Need Complete Redesign
* **Modal vs Model Directory:** Eradicate the misnamed `src/app/model/` directory containing pages; extract proper UI bottom sheets (`FilterSheet`, `ColorPickerSheet`, `SizeChartSheet`) into `src/app/shared/components/` and create true TypeScript domain interfaces in `src/app/core/models/`.
* **State Management:** Eliminate fragile `history.state` object passing; replace with a lightweight reactive Signals-based or RxJS State Store (`CartStore`, `AuthStore`, `OrderStore`).
* **Rate Computation:** Replace N burst HTTP requests in loops with a single batch quotation call.
* **Tab Navigation:** Implement standard Ionic Tab routing (`ion-tabs`, `ion-tab-bar`) rather than a globally embedded component with rogue redirects.

### 4. Features that are Incomplete (Need Implementation from Scratch)
* **Customer Registration View (`RegisterationPage`):** Build complete profile registration with name, email, alternate contact, and delivery location.
* **Without-Fabric Workflow (`WithoutfabricPage`):** Build the custom tailoring flow where customers specify fabric type, pick-up dates, and style notes.
* **Backend Order Integration:** Build true `POST /api/v1/orders` and `GET /api/v1/orders` integrations.
* **Cloud Cart Synchronization:** Sync cart state with backend for logged-in users.
* **Address Management:** Build cloud-backed address book CRUD operations.

### 5. Features to Defer to Phase 2 (Implement Later)
* Real-time GPS location tracking and live tailor doorstep pickup tracking.
* In-app video consultation with tailors.
* Payment gateway integrations (Razorpay / Stripe) beyond Cash on Delivery.
* Complex 3D garment visualization.

---

## 2. Proposed Clean Project Architecture

```
tailor-app-v2/
├── src/
│   ├── app/
│   │   ├── core/                        # Singleton core infrastructure
│   │   │   ├── guards/                  # auth.guard.ts, guest.guard.ts
│   │   │   ├── interceptors/            # auth.interceptor.ts, error.interceptor.ts, logging.interceptor.ts
│   │   │   ├── models/                  # PURE TypeScript interfaces
│   │   │   │   ├── user.model.ts
│   │   │   │   ├── article.model.ts
│   │   │   │   ├── fabric.model.ts
│   │   │   │   ├── tailor.model.ts
│   │   │   │   ├── cart.model.ts
│   │   │   │   ├── order.model.ts
│   │   │   │   └── api-response.model.ts
│   │   │   ├── providers/               # Abstract Data Provider Contracts
│   │   │   │   ├── auth.provider.ts
│   │   │   │   ├── catalog.provider.ts
│   │   │   │   ├── tailor.provider.ts
│   │   │   │   ├── cart.provider.ts
│   │   │   │   └── order.provider.ts
│   │   │   └── services/                # Provider Implementations
│   │   │       ├── mock/                # Mock JSON & In-Memory Providers
│   │   │       │   ├── mock-auth.service.ts
│   │   │       │   ├── mock-catalog.service.ts
│   │   │       │   ├── mock-tailor.service.ts
│   │   │       │   ├── mock-cart.service.ts
│   │   │       │   └── mock-order.service.ts
│   │   │       └── http/                # Real Spring Boot REST Providers
│   │   │           ├── http-auth.service.ts
│   │   │           ├── http-catalog.service.ts
│   │   │           ├── http-tailor.service.ts
│   │   │           ├── http-cart.service.ts
│   │   │           └── http-order.service.ts
│   │   ├── state/                       # Reactive Signal Stores
│   │   │   ├── auth.store.ts
│   │   │   ├── cart.store.ts
│   │   │   └── order.store.ts
│   │   ├── shared/                      # Reusable UI components & pipes
│   │   │   ├── components/
│   │   │   │   ├── color-picker-sheet/
│   │   │   │   ├── size-guide-modal/
│   │   │   │   ├── filter-bottom-sheet/
│   │   │   │   ├── tailor-card/
│   │   │   │   ├── order-stepper/
│   │   │   │   ├── empty-state/
│   │   │   │   └── loading-skeleton/
│   │   │   ├── pipes/                   # currency-inr.pipe.ts, time-ago.pipe.ts
│   │   │   └── directives/
│   │   ├── features/                    # Feature Pages & Routable Modules
│   │   │   ├── auth/                    # login, otp, register
│   │   │   ├── home/                    # dashboard, banners, recommendations
│   │   │   ├── catalog/                 # article-list, fabric-detail, customizer
│   │   │   ├── tailor/                  # tailor-list, tailor-profile
│   │   │   ├── cart/                    # cart-view, checkout
│   │   │   └── orders/                  # order-history, order-tracking
│   │   ├── layout/                      # App Shell & Tab Navigation
│   │   │   ├── tabs-layout.component.ts
│   │   │   └── tabs-layout.component.html
│   │   ├── app.config.ts                # Application configuration & provider switches
│   │   └── app.routes.ts                # Clean modular routing
│   ├── assets/
│   │   ├── data/                        # Static Mock JSON files for development
│   │   │   ├── articles.json
│   │   │   ├── fabrics.json
│   │   │   ├── tailors.json
│   │   │   ├── orders.json
│   │   │   └── addresses.json
│   │   ├── images/
│   │   └── icons/
│   └── environments/
│       ├── environment.ts               # Local / Mock development mode
│       ├── environment.staging.ts       # QA / Staging Spring Boot server
│       └── environment.prod.ts          # Production server
```

---

## 3. Core TypeScript Models Required

```typescript
// src/app/core/models/article.model.ts
export interface Article {
  articleId: number;
  articleName: string;
  imagePath: string;
  basePrice: number;
  estimatedHours: number;
  isActive: boolean;
  categories?: FabricCategory[];
}

export interface FabricCategory {
  fabricCategoryId: number;
  fabricName: string;
  categoryName: string;
  pricePerMeter: number;
  imageUrl: string;
}

export interface ColorVariant {
  colorId: number;
  colorName: string;
  hexCode: string;
  images: { imageUrl: string; angle: string }[];
  isAvailable: boolean;
}

// src/app/core/models/tailor.model.ts
export interface Tailor {
  tailorId: number;
  name: string;
  phone: string;
  avatarUrl: string;
  rating: number;
  reviewsCount: number;
  experienceYears: number;
  distanceKm: number;
  grade: 'A' | 'B' | 'C' | 'D';
  specialties: string[];
  portfolioImages: string[];
}

export interface StitchingRate {
  articleId: number;
  articleName: string;
  stitchingPrice: number;
}

// src/app/core/models/cart.model.ts
export interface CartItem {
  cartItemId: string;
  articleId: number;
  articleName: string;
  fabricId: number;
  fabricName: string;
  colorId: number;
  colorName: string;
  hexCode: string;
  imageUrl: string;
  quantity: number;
  unitPrice: number;
  assignedTailor?: Tailor;
  stitchingCharge: number;
  estimatedDeliveryDate?: string;
}

export interface CartSummary {
  items: CartItem[];
  itemsTotal: number;
  stitchingTotal: number;
  handlingCharge: number;
  deliveryCharge: number;
  taxGst: number;
  grandTotal: number;
}

// src/app/core/models/order.model.ts
export interface Order {
  orderId: string;
  bookingDate: string;
  currentStage: 'BOOKED' | 'CUTTING' | 'STITCHING' | 'TRIAL' | 'DELIVERED';
  trialDate?: string;
  deliveryDate?: string;
  tailor: Tailor;
  items: CartItem[];
  shippingAddress: Address;
  billing: CartSummary;
  paymentMethod: 'CASH' | 'UPI';
  paymentStatus: 'PENDING' | 'PAID';
}

export interface Address {
  addressId?: string;
  fullName: string;
  phoneNumber: string;
  houseNo: string;
  area: string;
  landmark?: string;
  city: string;
  state: string;
  pincode: string;
  addressType: 'HOME' | 'WORK' | 'OTHER';
  isDefault: boolean;
}
```

---

## 4. Interchangeable Data Provider Pattern

### Abstract Provider Interface
```typescript
// src/app/core/providers/catalog.provider.ts
export abstract class CatalogDataProvider {
  abstract getArticles(): Observable<Article[]>;
  abstract getArticleById(id: number): Observable<Article>;
  abstract getFabricCategories(articleId: number): Observable<FabricCategory[]>;
  abstract getFabricDetails(fabricId: number): Observable<FabricCategory>;
  abstract getColorVariants(fabricId: number): Observable<ColorVariant[]>;
}
```

### Mock Provider (Initial Phase)
```typescript
// src/app/core/services/mock/mock-catalog.service.ts
@Injectable()
export class MockCatalogService extends CatalogDataProvider {
  constructor(private http: HttpClient) { super(); }
  getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>('assets/data/articles.json');
  }
  // reads local JSON data with realistic latency delay
}
```

### Real HTTP Provider (Final Integration)
```typescript
// src/app/core/services/http/http-catalog.service.ts
@Injectable()
export class HttpCatalogService extends CatalogDataProvider {
  constructor(private http: HttpClient) { super(); }
  getArticles(): Observable<Article[]> {
    return this.http.get<ApiResponse<Article[]>>(`${environment.apiUrl}/api/v1/articles`)
      .pipe(map(resp => resp.data));
  }
}
```

### Switching Providers in `app.config.ts`:
```typescript
export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: CatalogDataProvider,
      useClass: environment.useMockData ? MockCatalogService : HttpCatalogService
    },
    {
      provide: TailorDataProvider,
      useClass: environment.useMockData ? MockTailorService : HttpTailorService
    },
    {
      provide: OrderDataProvider,
      useClass: environment.useMockData ? MockOrderService : HttpOrderService
    }
  ]
};
```

---

## 5. Recommended Implementation Roadmap & Phasing

```
┌────────────────────────────────────────────────────────┐
│ Phase 1: Foundation, Design Tokens & Core Models       │
│ Duration: Week 1                                       │
│ • Setup new clean Ionic 8 + Angular 19 project         │
│ • Create Core TypeScript models & schemas              │
│ • Build Mock JSON datasets in assets/data/             │
│ • Setup Abstract Provider interfaces & Mock providers  │
│ • Implement Auth, Error & Logging Interceptors         │
└───────────────────────────┬────────────────────────────┘
                            │
┌───────────────────────────▼────────────────────────────┐
│ Phase 2: Design System & Reusable Components           │
│ Duration: Week 2                                       │
│ • Global SCSS design tokens (Tailor HSL palette)       │
│ • ColorPickerBottomSheet, SizeGuideModal               │
│ • StitchingPricePopover, FilterBottomSheet             │
│ • EmptyStateComponent, LoadingSkeleton                 │
│ • TabsLayout shell with proper Ionic Tab routing       │
└───────────────────────────┬────────────────────────────┘
                            │
┌───────────────────────────▼────────────────────────────┐
│ Phase 3: Catalog & Customizer Flows (Mock First)       │
│ Duration: Week 3                                       │
│ • Home Dashboard with dynamic categories & banners     │
│ • Article Browser & Sub-article selector               │
│ • Garment Customizer with reactive color switching     │
│ • Tailor Listing, Rate Cards & Portfolio view          │
└───────────────────────────┬────────────────────────────┘
                            │
┌───────────────────────────▼────────────────────────────┐
│ Phase 4: Cart, Checkout & Order Lifecycle              │
│ Duration: Week 4                                       │
│ • Reactive CartStore supporting multiple items         │
│ • Batch tailor quotation & delivery date estimation    │
│ • Address book management with form validation         │
│ • Order Review & Simulated Checkout                    │
│ • My Orders tracking with animated status stepper      │
└───────────────────────────┬────────────────────────────┘
                            │
┌───────────────────────────▼────────────────────────────┐
│ Phase 5: Spring Boot Backend Integration               │
│ Duration: Week 5                                       │
│ • Switch environment.useMockData = false               │
│ • Wire real SMS OTP gateway on Spring Boot             │
│ • Connect catalog, tailor, cart & order endpoints      │
│ • Verify JWT Bearer token authentication & refresh     │
│ • End-to-end integration testing & performance tuning  │
└────────────────────────────────────────────────────────┘
```

---

## 6. Testing & Acceptance Criteria

Every screen and feature in the rebuilt application must satisfy strict acceptance criteria before release:

1. **State Preservation Test:** A customer can refresh the browser or minimize the app on any screen (`/article`, `/customizer`, `/cart`, `/checkout`) without data loss or exceptions.
2. **Multi-Item Cart Test:** Adding 3 different garments with distinct colors and fabrics preserves all 3 items in the cart with accurate subtotal, tailor fee, and handling calculations.
3. **Authentication Token Test:** After OTP verification, JWT token is automatically transmitted in the `Authorization: Bearer` header on all protected requests.
4. **Empty State Test:** Opening "My Orders" or "Wishlist" with 0 items displays a helpful graphic and a "Start Shopping" button without console errors.
5. **Zero Type Assertions:** Build with `"strict": true` and `"noImplicitAny": true` in `tsconfig.json` with 0 compilation warnings.
6. **Code Coverage:** Minimum 80% unit test coverage across Services, Signal Stores, and Core Utilities.
