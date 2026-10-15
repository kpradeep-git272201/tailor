# 04. Business Flow & User Journey Audit

## 1. Overview of Evaluated User Journeys

This audit rigorously traces the actual navigation flows, state transfers, validation gates, runtime risks, and data persistence across the implemented user journeys in the codebase.

The intended primary business journey in the Tailor App is:
$$\text{Home} \rightarrow \text{Service Selection} \rightarrow \text{Article Catalog} \rightarrow \text{Fabric \& Customization} \rightarrow \text{Tailor Booking} \rightarrow \text{Cart / Bag} \rightarrow \text{Checkout / Order Summary} \rightarrow \text{Order Tracking}$$

Alongside this journey, three secondary flows were audited:
1. **Authentication Flow:** Login $\rightarrow$ Phone OTP Entry $\rightarrow$ Verification $\rightarrow$ Redirect to Previous URL.
2. **Wishlist Flow:** Fabric/Color Browse $\rightarrow$ Bookmark $\rightarrow$ LocalStorage $\rightarrow$ Wishlist Screen.
3. **Address Management Flow:** Checkout / Menu $\rightarrow$ Address Modal $\rightarrow$ Geolocation $\rightarrow$ Save.

---

## 2. Step-by-Step Transition Audit

### Transition 1: Home Landing $\rightarrow$ Service / Article Catalog
* **Source Screen:** `DefaultDashboradPage` (`/main/dashboard`)
* **Destination Screen:**
  * Option A (Article thumbnail click): `/main/article/:articleId`
  * Option B ("With Fabric" service card): `/main/with-fabric`
  * Option C ("Without Fabric" service card): `/main/with-out-fabric`
* **Data Passed:**
  * Option A: `router.navigate(['/main/article', article.articleId], { state: { serviceType: 'With Fabric', articleData: article } })`
  * Option B: `router.navigate(['/main/with-fabric'], { queryParams: { navigatedData: JSON.stringify({ serviceType: 'With Fabric' }) } })`
  * Option C: `router.navigate(['/main/with-out-fabric'], { queryParams: { navigatedData: JSON.stringify({ serviceType: 'Without Fabric' }) } })`
* **API Calls:**
  * Home calls `CommonService.getArticles()` (`GET catalog/api/v1/article`).
* **State Management & Persistence:**
  * Calls `CommonService.setCurrentPath()` storing `currentUrl` in `localStorage.redirectUrl`.
* **Validation & Gates:** None (Guest access allowed).
* **Missing Functionality:**
  * Clicking "Without Fabric" attempts to navigate to `/main/with-out-fabric`, but this route **does not exist in `DashboardRoutingModule`**, causing an immediate router error and blank view.
* **Runtime Risks & Refresh Vulnerability:**
  * Option A passes `articleData` solely via `history.state`. **If the customer refreshes their browser or resumes from background on the article screen, `history.state` is wiped clean (`undefined`), breaking downstream rendering!**

---

### Transition 2: Article Selection $\rightarrow$ Article Details & Customizer
* **Source Screen:** `ArticlePage` (`/main/article/:articleId`)
* **Destination Screen:** `ArticleDetailsPage` (`/main/article/:articleId/:artCatId`)
* **Data Passed:**
  ```typescript
  this.router.navigate(['/main/article', fabric.fabricId, fabric.fabricCategoryId], {
    state: {
      serviceType: this.navigatedData.serviceType,
      article: this.navigatedData.article,
      fabric: fabric.fabric,
      articleData: this.articleData
    }
  });
  ```
* **API Calls:**
  * Destination page fires `forkJoin` with 3 parallel HTTP GET requests:
    1. `CommonService.getFabricCategoryByFabricId(fabricId)`
    2. `CommonService.getFabricByFabricId(fabricId)`
    3. `CommonService.getFabricColorByFabricId(fabricId)`
* **State Management:**
  * `history.state` is read inside `getRouterState()` on `ngOnInit()`.
* **Validation & Gates:** None.
* **Missing Functionality:**
  * Size chart button opens dummy modal (`SizeModelPage` / `ChartModelPage`) that is disconnected from the data model.
* **Runtime Risks & Refresh Vulnerability:**
  * High risk: If user refreshes on `ArticleDetailsPage`, `this.articleData` is `undefined`, and subsequent calls to `addToCurrentBag(this.articleData, color)` fail with `TypeError: Cannot read properties of undefined (reading 'articleId')`.

---

### Transition 3: Article Details $\rightarrow$ Tailor Selection
* **Source Screen:** `ArticleDetailsPage`
* **Destination Screen:** `TailorListPage` (Invoked as an Ionic Modal via `ModalController.create({ component: TailorListPage })`)
* **Data Passed:**
  * Via `componentProps`: `{ bookTailor: this.navigatedData, selectedItem: selectedItem }`
* **API Calls:**
  * Modal opens and calls `CommonService.getTailors()` (`GET api/v2/tailors`).
  * Clicking "View Price List" on any tailor calls `CommonService.getStichingPriceByTailorId(tailorId)`.
* **State Management:**
  * Tailor selection returns data via `modalController.dismiss(tailor, 'confirmed')`.
* **Validation & Gates:**
  * Checks `this.loggedUser`. If null, prompts `AlertService.showAlertWithCancel('Alrert!', 'Please login to continue')`.
  * Verifies `this.selectedColor` is chosen; if missing, opens `ColorModelPage` modal first.
* **Missing Functionality:**
  * Filter and Sort buttons inside `TailorListPage` open `ChartModelPage`, which returns dummy mock data `{ selectedSize: 'L', color: 'Red' }` without filtering tailors.

---

### Transition 4: Customizer $\rightarrow$ Shopping Bag / Cart
* **Source Screen:** `ArticleDetailsPage`
* **Destination Screen:** `CartPage` (`/main/cart`)
* **Data Passed:**
  * Via LocalStorage: `localStorage.setItem('shopping_bag', JSON.stringify([this.currentBag]))`
* **API Calls:**
  * Destination page calls `CommonService.getArticles()` (`GET catalog/api/v1/article`).
* **Validation & Gates:**
  * Checks `this.loggedUser`. If unauthenticated, prompts user to login and redirects to `/auth/login`.
* **CRITICAL ARCHITECTURAL DEFECT:**
  ```typescript
  // ArticleDetailsPage line 437
  localStorage.setItem('shopping_bag', JSON.stringify([this.currentBag]));
  ```
  * Instead of appending the new item to the existing shopping bag array, **it overwrites the entire cart array with an array of length 1 containing only the current item!**
  * As a consequence, **multi-item ordering is completely impossible** through the standard UI flow. Any previously added garment is silently lost.

---

### Transition 5: Shopping Bag $\rightarrow$ Tailor Assignment & Rate Computation
* **Source Screen:** `CartPage` (`/main/cart`)
* **Destination Screen:** Same screen (in-place reactive updates) or `TailorListPage` (Modal)
* **User Actions:**
  * Customer checks item checkbox $\rightarrow$ clicks "Book Tailor" or "Auto Assign Tailor".
* **API Calls & Bursts:**
  * When tailor is selected from modal, `CartPage` iterates:
  ```typescript
  this.shoppingBag.forEach((element: any) => {
    if (element.isChecked) {
      this.commonService.getArticleRatesByTailorAndArticle(data.tailorId, element.articleId).subscribe(resp => {
        let priceList = resp.body?.data;
        const stichingPrice = priceList[0].rates.find(a => a.articleId == element.articleId);
        element.stitchingPrice = stichingPrice.stitchingPrice * Number(element.quntity);
        item.totalTailorCharge += element.stitchingPrice;
        this.calculateExpectedDeliveryDate(element, data, checkedArticle?.length);
      });
    }
  });
  ```
  * `calculateExpectedDeliveryDate()` subsequently fires another HTTP call:
    `CommonService.getLast10DaysWorkHours(tailor.tailorId)` (`GET api/v2/tailors/:tailorId/work-hours/last10days`).
* **Runtime Risks:**
  * N parallel uncoordinated HTTP requests fired inside a loop.
  * If user changes tailor or checks/unchecks quickly, race conditions cause `item.totalTailorCharge` to compound incorrectly.

---

### Transition 6: Shopping Bag $\rightarrow$ Order Summary & Checkout
* **Source Screen:** `CartPage` (`/main/cart`)
* **Destination Screen:** `OrderSummaryPage` (`/main/with-fabric/:article/:articleId/order-summary`)
* **Data Passed:**
  ```typescript
  const billDetails = {
    itemTotal: this.calculateTotalPrice(),
    deliveryCharge: 0,
    handlingCharge: 9,
    totalTailorCharge: myOrder.totalTailorCharge,
    grandTotal: this.calculateTotalPrice(9, myOrder.totalTailorCharge) // Note: inverted args!
  };
  this.router.navigate(['/main/with-fabric', bookArticle[0].articleId, bookArticle[0].fabric, 'order-summary'], {
    queryParams: {
      billDetails: JSON.stringify(billDetails),
      order: JSON.stringify(bookArticle)
    }
  });
  ```
* **API Calls:**
  * `OrderSummaryPage` invokes Google Geocoding API via `fetch()` with hardcoded coordinates.
* **State Management:**
  * URL query parameters `billDetails` and `order` are parsed on `ngOnInit()`.
* **Validation & Gates:**
  * Requires at least one article to have `isFreez === true` (tailor assigned).

---

### Transition 7: Order Summary $\rightarrow$ Order Confirmation & Storage
* **Source Screen:** `OrderSummaryPage`
* **Destination Screen:** Redirects to `/main/dashboard`
* **User Actions:** Customer selects payment mode (`cash` or `upi`) $\rightarrow$ clicks "Confirm Order".
* **API Calls:**
  * **ZERO BACKEND API CALLS!**
  * No `POST /api/v1/orders` exists.
* **State Management:**
  ```typescript
  const myOrders = order.filter(o => o.phoneNumber == this.loggedUser.phoneNumber);
  myOrders.push({
    phoneNumber: this.loggedUser.phoneNumber,
    bookingDate: moment().format('DD-MM-YYYY'),
    orderId: this.getOrderId(),
    data: this.myOrder,
    selectedItems: this.selectedItems,
    billDetails: this.billDetails
  });
  localStorage.setItem('myOrder', JSON.stringify(myOrders));
  ```
* **Critical Flaw:**
  * Order is committed strictly to browser local storage. If user switches devices, uninstalls the app, or clears cache, all order history is permanently destroyed.
  * Cart cleanup logic (`removeArticleFromCart()`) filters by `element.artCatId`, which does not exist on items added via `ArticleDetailsPage`, causing cart items to fail to clean up.

---

### Transition 8: Navigation Hub $\rightarrow$ My Orders & Tracking
* **Source Screen:** `MenuPage` (`/main/menu`) or `FooterPage` ("Order" tab)
* **Destination Screen:** `MyorderPage` (`/main/myorder`)
* **Data Passed:** Reads `localStorage.getItem('myOrder')`.
* **CRITICAL RUNTIME CRASH BUG:**
  ```typescript
  // MyorderPage lines 62-66
  this.orderList = order.filter(myOrder => myOrder.phoneNumber == this.loggedUser.phoneNumber);
  this.selectedItems = this.orderList[0].selectedItems; // CRASHES IF EMPTY!
  this.tailor = this.orderList[0].data[0].tailor;       // CRASHES IF EMPTY!
  ```
  * If a new user navigates to "My Orders" before placing an order, `this.orderList` is empty `[]`.
  * Accessing `this.orderList[0].selectedItems` throws an unhandled `TypeError: Cannot read properties of undefined (reading 'selectedItems')`, **crashing the screen entirely!**

---

### Transition 9: Authentication & OTP Verification Flow
* **Source Screen:** `LoginPage` (`/auth/login`)
* **Step 1:** Customer enters 10-digit mobile number $\rightarrow$ clicks "Get verification code".
  * Calls `CommonService.sendOtp({ mobile: phone })`.
  * If HTTP 200, navigates to `/auth/otp-verification?phone=...`.
* **Step 2:** Customer inputs OTP on `OtpVerificationPage`.
  * UI presents 4 digit input boxes (`otp[0]...otp[3]`).
  * Customer clicks "Verify OTP".
* **CRITICAL IMPLEMENTATION DEFECT:**
  ```typescript
  // OtpVerificationPage lines 84-87
  const enteredOtp = this.otp.join('');
  const payload = {
    "mobile": this.phoneNumber,
    "otp": "123456" // HARDCODED!
  };
  this.commomService.verifyOtp(payload).subscribe(...);
  ```
  * The application completely ignores whatever code the user typed, and submits hardcoded `"123456"`.
  * If verified, stores `{ loggedUser: resp.body, token: resp.headers.get('Authorization') }` in localStorage.
  * Redirection logic checks `localStorage.getItem('redirectUrl')` and attempts to return the user to their initiating page.

---

## 3. Data Integrity & State Preservation Matrix

| State Attribute | Screen 1: Catalog | Screen 2: Customizer | Screen 3: Cart | Screen 4: Checkout | Screen 5: Tracking | Preserved Across Refresh? |
|---|---|---|---|---|---|---|
| **Article ID** | Route Param | Route Param | Cart Array | Query Param | Stored Object | Partially (breaks if state empty) |
| **Fabric Selection** | Route State | Route Param | Cart Array | Query Param | Stored Object | No (lost on refresh in state) |
| **Color Variant** | Default Mock | User Selected | Cart Array | Query Param | Stored Object | Yes (once in cart) |
| **Quantity** | N/A | Local State | Cart Stepper | Query Param | Stored Object | Yes (in cart) |
| **Fabric Price** | Category Rate | Per Meter | Base Price | Item Total | Bill Summary | Computed in client |
| **Tailor Choice** | N/A | Modal Props | Item Property | Order Object | Order Object | Yes (stored in item) |
| **Stitching Charge** | N/A | Rate Table | API Computed | Grand Total | Bill Details | Client computed |
| **Delivery Address** | N/A | N/A | N/A | Modal / GPS | Stored Address | LocalStorage only |
| **Auth JWT Token** | N/A | N/A | LocalStorage | LocalStorage | LocalStorage | Token stored, never sent in headers |

---

## 4. Key Flow Flaws Summary

1. **State Loss on Browser Page Refresh:**
   `history.state` is used heavily across `DefaultDashboradPage`, `ArticlePage`, and `ArticleDetailsPage`. Angular resets `history.state` to `{ usr: null }` on direct browser reload or deep linking, breaking multiple downstream properties.
2. **Single-Item Cart Overwrite:**
   `ArticleDetailsPage.addToBag()` replaces `localStorage.getItem('shopping_bag')` with a single-element array, preventing cart accumulation.
3. **Hardcoded Mock Authentication:**
   `OtpVerificationPage` bypasses real OTP verification by sending hardcoded `"123456"`.
4. **Client-Side-Only Order Lifecycle:**
   No order entity is ever posted to a backend server. Order placement is an entirely simulated write to `localStorage`.
5. **Unhandled Empty States Leading to Crashes:**
   `MyorderPage` assumes at least one order exists and crashes when `orderList` is empty.
