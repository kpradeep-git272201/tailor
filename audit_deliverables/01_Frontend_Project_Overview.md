# 01. Frontend Project Overview & Architectural Inventory

## 1. Executive Summary & Technology Stack

The existing frontend repository is a hybrid mobile application developed under the Ionic Framework and Angular ecosystem with Capacitor for native mobile deployment.

### Core Framework & Library Versions (from `package.json`)
* **Angular Core & CLI:** Version `^19.0.0` (`@angular/core`, `@angular/common`, `@angular/router`, `@angular/forms`, `@angular/animations`, `@angular/platform-browser`)
* **Ionic Framework:** `@ionic/angular` `^8.0.0`, `@ionic/core` `^8.5.1` (Standalone component paradigm mixed with NgModule wrappers)
* **Capacitor Mobile Runtime:** `@capacitor/core` `7.0.1`, `@capacitor/android` `7.0.1`, `@capacitor/geolocation` `^7.1.2`, `@capacitor/haptics` `7.0.0`, `@capacitor/keyboard` `7.0.0`, `@capacitor/status-bar` `^7.0.0`
* **UI & Component Libraries:**
  * `@angular/material` & `@angular/cdk`: `^19.1.3` (Stepper, Menu, Buttons, Form Fields)
  * `@ng-bootstrap/ng-bootstrap`: `^18.0.0` (NgbCarousel, Alerts, Pagination)
  * `bootstrap`: `^5.3.3` (CSS utilities)
  * `ionicons`: `^7.0.0`
  * `swiper`: `^11.2.10`
* **Utilities & Language:**
  * `typescript`: `~5.6.3`
  * `rxjs`: `~7.8.0`
  * `moment`: `^2.30.1` (Date arithmetic)
  * `zone.js`: `~0.15.0`

---

## 2. Project Folder Structure & Architectural Organization

```
d:\Project\tailor_ui\tailor\
├── android\                     # Capacitor Android native project wrapper
├── src\
│   ├── app\
│   │   ├── auth\                # Authentication module (Login, OTP, Reset, Registration)
│   │   │   ├── login\
│   │   │   ├── otp-verification\
│   │   │   ├── registeration\   # Note spelling typo in folder name
│   │   │   ├── reset-password\
│   │   │   ├── auth-routing.module.ts
│   │   │   └── auth.module.ts
│   │   ├── components\          # Reusable UI components
│   │   │   └── menu\            # Angular Material dialog-based menu (unused)
│   │   ├── dashboard\           # Core customer feature flows
│   │   │   ├── pages\
│   │   │   │   ├── article\             # Garment sub-category and fabric browser
│   │   │   │   ├── article-details\     # Fabric details, color picker, cart CTA
│   │   │   │   ├── default-dashborad\   # Landing page (spelling typo)
│   │   │   │   ├── menu\                # Ionic Page menu view
│   │   │   │   ├── order-summary\       # Checkout, geocoding, and order review
│   │   │   │   ├── top-rated-fabric\    # Embedded fabric grid
│   │   │   │   ├── top-rated-tailor\    # Embedded tailor list
│   │   │   │   ├── withfabric\          # Fabric material and color swatches
│   │   │   │   └── withoutfabric\       # Empty placeholder view
│   │   │   ├── dashboard-routing.module.ts
│   │   │   └── dashboard.module.ts
│   │   ├── environments\        # Conflicting secondary environment folder
│   │   │   ├── environment.ts
│   │   │   └── environment.prod.ts
│   │   ├── footer\              # Globally embedded tab footer
│   │   ├── interceptors\        # HTTP Error interceptor
│   │   ├── model\               # Modals misnamed as models (UI components)
│   │   │   ├── chart-model\
│   │   │   ├── color-model\
│   │   │   ├── filter-model\
│   │   │   ├── generic-model\
│   │   │   ├── size-model\
│   │   │   └── stiching-price\
│   │   ├── services\            # Application data and UI services
│   │   │   ├── alert\           # AlertService (Ionic Alert & Toast wrappers)
│   │   │   ├── common\          # CommonService (HTTP calls & mock data)
│   │   │   ├── icon\            # IconService (Ionicons registry)
│   │   │   ├── master\          # MasterService (Mock rates, hours, categories)
│   │   │   ├── withfabric\      # WithfabricService (Duplicated mock data)
│   │   │   └── withoutfabric\   # Empty service
│   │   ├── sharedmodule\        # Shared NgModule importing/exporting Ionic standalone tags
│   │   ├── tailor\              # Tailor feature module
│   │   │   ├── pages\
│   │   │   │   ├── tailor-details\
│   │   │   │   ├── tailor-list\
│   │   │   │   └── tailor-profile\
│   │   │   ├── tailor-routing.module.ts
│   │   │   └── tailor.module.ts
│   │   ├── users\               # User profile, cart, and orders module
│   │   │   ├── pages\
│   │   │   │   ├── address\     # Address book form & list
│   │   │   │   ├── cart\        # Shopping bag & tailor assignment
│   │   │   │   ├── myorder\     # Order status & tracking stepper
│   │   │   │   └── wish-list\   # Bookmarked items
│   │   │   ├── users-routing.module.ts
│   │   │   └── users.module.ts
│   │   ├── app.component.html   # Root template (contains router-outlet & app-footer)
│   │   ├── app.component.ts     # Root component
│   │   ├── app.config.ts        # AppConfig (Base API, endpoints, exposed encryption key)
│   │   └── app.routes.ts        # Primary root routing table
│   ├── assets\                  # Static image, icon, logo, and flag assets
│   ├── environments\            # Root environment folder (used by AppConfig)
│   ├── theme\                   # SCSS variables and custom styles
│   ├── global.scss              # Global application styles
│   ├── index.html               # Main HTML entry point
│   └── main.ts                  # Application bootstrap (provideHttpClient, provideRouter)
```

---

## 3. Application Configuration & Bootstrap Architecture

### Bootstrap (`src/main.ts`)
The application bootstraps standalone `AppComponent` using Angular's modern `bootstrapApplication`:
```typescript
bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideHttpClient(withInterceptors([errorInterceptor])),
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideAnimationsAsync(),
  ],
});
```

### Configuration & Base URLs (`src/app/app.config.ts`)
```typescript
export const AppConfig = {
  encryptionKey: 'urwz0BFEnXCSJJGSS3GgAgupk2Wt2eMFe1idLe7xXcg=', // EXPOSED KEY!
  APP_VERSION: 'v 2.2.0',
  lastUpdate: 'November 24, 2025',
  BASE_API: environment.BASE_URL + environment.CONREXT_PATH, // "http://localhost:8080/tailor/"
  ENDPOINTS: {
    AUTH: {
      LOGIN: `api/v1/auth/send-otp`,
      VERIFY_OTP: `api/v1/auth/verify-otp`,
    },
    PRIVATE: {
      ARTICLE: `catalog/api/v1/article`,
      FABRIC_CATEGORY: `api/v1/articles`,
      ALL_FABRIC_CATEGORIES: `api/v1/fabric/fabric-categories`,
      FABRIC_CATEGORY_BY_ID: `api/v1/fabric/fabric-category`,
      TAILOR_ARTICLE_RATES: `api/v2/tailors/article-rates`,
      TAILORS: `api/v2/tailors`,
      WORK_HOURS_LAST10DAYS: `api/v2/tailors`,
      STICHINGPRICE: `api/v2/tailors/article-stitchingPrice`
    },
    MASTER: {
      FABRIC_COLOR: `master/api/v1/fabric-color/fabric`,
      FABRIC_COLOR_BY_FABRIC_ID: `api/v1/fabric`
    }
  }
};
```

---

## 4. Routing Architecture & Inconsistencies

### Root Routes (`src/app/app.routes.ts`)
* Active routes:
  * `/auth` -> loads `AuthModule`
  * `/main` -> loads `DashboardModule`
  * `/` -> redirects to `/main`
  * `/stiching-price` -> `StichingPricePage`
* Commented-out routes:
  * `/order-summary`, `/login`, `/otp-verification`, `/registeration`, `/reset-password`, `/tailor-list`, `/tailor-details`, `/tailor-profile`, `/footer`, `/top-rated-fabric`, `/top-rated-tailor`

### Child Routes:
1. **`DashboardRoutingModule` (`/main`)**:
   * `/main/dashboard` -> `DefaultDashboradPage`
   * `/main/with-fabric` -> `WithfabricPage`
   * `/main/article/:articleId` -> `ArticlePage`
   * `/main/with-fabric/:article` -> `ArticlePage` (alias route)
   * `/main/article/:articleId/:artCatId` -> `ArticleDetailsPage`
   * `/main/with-fabric/:articleId/:fabricId` -> `ArticleDetailsPage` (alias route)
   * `/main/with-fabric/:article/:articleId/order-summary` -> `OrderSummaryPage`
   * `/main/menu` -> `MenuPage`
   * `/main/cart` -> `CartPage`
   * `/main/myorder` -> `MyorderPage`
   * `/main/tailor` -> loads `TailorModule`
   * `/main/user` -> loads `UsersModule`
2. **`TailorRoutingModule` (`/main/tailor`)**:
   * `/main/tailor/tailorList` -> `TailorListPage`
   * `/main/tailor/tailorList/:id` -> `TailorDetailsPage`
3. **`UsersRoutingModule` (`/main/user`)**:
   * `/main/user/address` -> `AddressPage`
   * `/main/user/cart` -> `CartPage`
   * `/main/user/wish-list` -> `WishListPage`
4. **`AuthRoutingModule` (`/auth`)**:
   * `/auth/login` -> `LoginPage`
   * `/auth/otp-verification` -> `OtpVerificationPage`
   * `/auth/reset-password` -> `ResetPasswordPage`

### Critical Routing Inconsistencies Discovered:
1. `WithoutfabricPage` exists in files, but route `/main/with-out-fabric` is **NOT defined in any routing module**. Clicking "Without Fabric" on the dashboard navigates to `/main/with-out-fabric`, triggering a 404 route failure.
2. `RegisterationPage` is defined in source code but is **not registered in `AuthRoutingModule`**.
3. `TailorProfilePage` is defined in source code but is **not registered in `TailorRoutingModule`**.
4. In `DefaultDashboradPage.ts`: `getExpTailors()` navigates to `'/tabs/customer/tailors'` which **does not exist**.
5. In `TopRatedTailorPage.ts`: `viewTailor()` navigates to `['/tailor', tailor.tailorId]` which **does not exist** (route is `/main/tailor/tailorList/:id`).
6. In `FooterPage.ts`: `ionViewWillEnter()` attempts to redirect unauthenticated users to `'/tabs/customer'`, causing unexpected route cancellation on app load.

---

## 5. End-to-End Dependency Mapping

| Page / Screen | Child Components | Calling Services | API Endpoints | Expected Data Models |
|---|---|---|---|---|
| **Default Dashboard** (`DefaultDashboradPage`) | `TopRatedFabricPage`, `TopRatedTailorPage`, `IonPopover` | `CommonService`, `IconService`, `MasterService` | `GET catalog/api/v1/article` | `Article[]`, `Brand[]`, `ServiceType[]` |
| **With Fabric** (`WithfabricPage`) | `NgbCarousel` | `CommonService`, `WithfabricService`, `IconService` | None (Mock data functions) | `FabricItem[]`, `ColorCategory[]`, `MenuItem[]` |
| **Article Selection** (`ArticlePage`) | `NgbCarousel`, `SharedModule` | `CommonService`, `WithfabricService`, `IconService` | `GET api/v1/articles/{id}/fabric-categories`<br>`GET api/v1/fabric/fabric-categories` | `FabricCategory[]`, `FabricItem[]` |
| **Article Details** (`ArticleDetailsPage`) | `ColorModelPage` (Modal), `TailorListPage` (Modal) | `CommonService`, `AlertService`, `IconService` | `GET api/v1/fabric/fabric-category/{id}`<br>`GET master/api/v1/fabric-color/fabric/{id}`<br>`GET api/v1/fabric/{id}/colors` | `FabricCategory`, `FabricColor[]`, `ColorVariant[]` |
| **Tailor Listing** (`TailorListPage`) | `ChartModelPage` (Modal), `StichingPricePage` (Popover) | `CommonService`, `PopoverController`, `ModalController` | `GET api/v2/tailors`<br>`GET api/v2/tailors/article-stitchingPrice/{id}` | `Tailor[]`, `StitchingPriceItem[]` |
| **Tailor Details** (`TailorDetailsPage`) | `StichingPricePage` (Popover) | `MasterService`, `PopoverController` | None (reads `history.state.tailor` + mock rates) | `Tailor`, `RateCard[]` |
| **Cart / Shopping Bag** (`CartPage`) | `TailorListPage` (Modal) | `CommonService`, `AlertService`, `MasterService` | `GET catalog/api/v1/article`<br>`GET api/v2/tailors/article-rates/{tId}/{aId}`<br>`GET api/v2/tailors/{tId}/work-hours/last10days` | `CartItem[]`, `RateInfo[]`, `WorkHourRecord[]` |
| **Order Summary** (`OrderSummaryPage`) | `AddressPage` (Modal) | `CommonService`, `AlertService`, `Geolocation` | `GET maps.googleapis.com/maps/api/geocode/json` | `OrderRecord`, `Address`, `GeocodeResult` |
| **My Orders** (`MyorderPage`) | `MatStepperModule` | `IconService` | None (LocalStorage `myOrder`) | `OrderHistoryItem[]` |
| **User Address** (`AddressPage`) | `IonAccordion`, `IonCheckbox` | `FormBuilder`, `IconService`, `ModalController` | None (LocalStorage `myAddress`) | `AddressFormValues`, `Address[]` |
| **Wishlist** (`WishListPage`) | `SharedModule` | `IconService` | None (LocalStorage `wish_list`) | `WishlistItem[]` |
| **Customer Login** (`LoginPage`) | `SharedModule` | `CommonService`, `FormBuilder` | `POST api/v1/auth/send-otp` | `{ mobile: string }` -> `text` |
| **OTP Verification** (`OtpVerificationPage`) | `SharedModule` | `CommonService` | `POST api/v1/auth/verify-otp` | `{ mobile: string, otp: string }` -> `AuthToken` |
| **Stitching Price** (`StichingPricePage`) | `SharedModule` | `PopoverController` | None (ComponentProps data input) | `StitchingPriceItem[]` |

---

## 6. LocalStorage & State Persistence Usage

The frontend heavily relies on browser `localStorage` as its primary persistence mechanism:
1. `localStorage.getItem('loggedUser')`: Stored upon successful OTP verification. Contains user mobile number and role.
2. `localStorage.getItem('token')`: Stored from Authorization response header. **Critical Defect:** It is never extracted or sent in subsequent requests!
3. `localStorage.getItem('shopping_bag')`: Array of cart items. Read and modified by `ArticleDetailsPage`, `CartPage`, and `OrderSummaryPage`.
4. `localStorage.getItem('myOrder')`: Array of confirmed orders. Simulated order placement writes here; `MyorderPage` reads here.
5. `localStorage.getItem('myAddress')`: Array of saved customer delivery addresses.
6. `localStorage.getItem('wish_list')`: Array of bookmarked fabrics and colors.
7. `localStorage.getItem('redirectUrl')` & `'navigatedData'`: Stored to support post-login route redirection.

---

## 7. Build, Asset & Static Data Configuration

* **Build Output:** Angular compilation builds successfully into `d:\Project\tailor_ui\tailor\www` (Bundle size: ~6.03 MB initial, 87 lazy chunks).
* **Asset Directory:** `src/assets/` contains complete photographic assets for:
  * Articles: `assets/images/article/Master/Article1...6/` (Inside angles, colors, main images)
  * Fabrics: `assets/images/fabrics/` (Cotton, Silk, Wool, Polyester, Linen, Denim, Chiffon, Velvet)
  * Brands: `assets/images/brands/` (Pure Cotton, Royal Silk, Denim Pro, etc.)
  * Tailors: `assets/images/tailors/` (Tailor 1, 2, 3 photos)
  * Portfolios: `assets/portfolio/` and `assets/pre-work-img/`
  * Icons & Flags: `assets/flags/india.png`, `assets/logo/eComm-logo.png`
* **Static / Mock Data Providers:**
  * `MasterService`: ~900 lines of hardcoded arrays (`getTailorWorkHrs`, `getArticles`, `getArticleCategory`, `getArticleCatTexture`, `fabricPriceRange`, `getTailorArticleRates`).
  * `CommonService`: ~1,490 lines containing ~1,000 lines of hardcoded arrays duplicating `WithfabricService`.
  * `WithfabricService`: ~500 lines of duplicate mock data.
