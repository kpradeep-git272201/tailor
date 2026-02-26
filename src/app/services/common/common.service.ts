import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Geolocation } from '@capacitor/geolocation';
import { catchError, map, Observable, ObservableInput, of } from 'rxjs';
import { AppConfig } from 'src/app/app.config';


@Injectable({
  providedIn: 'root',
})
export class CommonService {

  APP_KEY = 'AIzaSyAoYbrW-KNT-M5K4JvCf1JAVWVf49Iu6sQ';
  handleError: ((err: any, caught: Observable<any>) => ObservableInput<any>) | any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient
  ) { }

  /************************ API Integration ********************* */
  /************************** Common API's call ********************************** */
  /* public request(
    method: string,
    url: string,
    options: { body?: any; headers?: any; observe?: any; reportProgress?: boolean }
  ): Observable<any> {
    return this.http.request(method, url, options).pipe(catchError(this.handleError));
  } */
  public request<T>(
    method: string,
    url: string,
    options: {
      body?: any;
      headers?: any;
      responseType?: any;
      observe?: any;
      reportProgress?: boolean;
    } = {},
  ): Observable<T> {
    return this.http.request<T>(method, url, options);
  }
  getRequest(url: any): Observable<any[]> {
    const fullPath = AppConfig.BASE_API + url;
    const headers = new HttpHeaders().set('content-type', 'application/json').set('Accept', 'application/json');
    return this.request<any[]>('GET', `${fullPath}`, { headers: headers, reportProgress: false, observe: 'response' }).pipe(
      catchError((error) => of(error)),
    );
  }

  getArticles() {
    const url = `${AppConfig.ENDPOINTS.PRIVATE.ARTICLE}`;
    return this.getRequest(url);
  }

  getFabricCategory(articleId: any) {
    const url = `${AppConfig.ENDPOINTS.PRIVATE.FABRIC_CATEGORY}/${articleId}/fabric-categories`;
    return this.getRequest(url);
  }

  getAllFabricCategory() {
    const url = `${AppConfig.ENDPOINTS.PRIVATE.ALL_FABRIC_CATEGORIES}`;
    return this.getRequest(url);
  }

  getFabricCategoryByFabricId(fabricId: any) {
    const url = `${AppConfig.ENDPOINTS.PRIVATE.FABRIC_CATEGORY_BY_ID}/${fabricId}`;
    return this.getRequest(url);
  }
  getFabricByFabricId(fabricId: any) {
    const url = `${AppConfig.ENDPOINTS.MASTER.FABRIC_COLOR}/${fabricId}`;
    return this.getRequest(url);
  }
  getFabricColorByFabricId(fabricId: any) {
    const url = `${AppConfig.ENDPOINTS.MASTER.FABRIC_COLOR_BY_FABRIC_ID}/${fabricId}/colors`;
    return this.getRequest(url);
  }
  

  /************************ ************************************** */

  getMasterBrand() {
    return [
      {
        brandId: 201,
        brandName: 'Pure Cotton',
        category: 'Eco-Friendly',
        description: 'Specializes in organic and sustainable cotton fabrics.',
        country: 'India',
        website: 'https://purecotton.com',
        logoUrl: 'assets/images/brands/purecotton.jpg',
      },
      {
        brandId: 202,
        brandName: 'Royalilk',
        category: 'Luxury',
        description:
          'Premium silk fabrics known for their luxurious feel and elegance.',
        country: 'Italy',
        website: 'https://royalsilk.com',
        logoUrl: 'assets/images/brands/royalsilk.jpg',
      },
      {
        brandId: 203,
        brandName: 'Warm Wool',
        category: 'Premium',
        description:
          'High-quality wool fabrics designed for warmth and durability.',
        country: 'United Kingdom',
        website: 'https://warmwool.com',
        logoUrl: 'assets/images/brands/warmwool.jpg',
      },
      {
        brandId: 204,
        brandName: 'Poly Tech',
        category: 'Budget',
        description:
          'Affordable polyester fabrics for everyday wear and durability.',
        country: 'China',
        website: 'https://polytechfabrics.com',
        logoUrl: 'assets/images/brands/polytech.jpg',
      },
      {
        brandId: 205,
        brandName: 'Linen Lux',
        category: 'Eco-Friendly',
        description: 'Specializes in breathable and sustainable linen fabrics.',
        country: 'France',
        website: 'https://linenlux.com',
        logoUrl: 'assets/images/brands/linenlux.jpg',
      },
      {
        brandId: 206,
        brandName: 'Denim Pro',
        category: 'Sportswear',
        description:
          'Durable and stylish denim fabrics used for casual and sportswear.',
        country: 'USA',
        website: 'https://denimpro.com',
        logoUrl: 'assets/images/brands/denimpro.jpg',
      },
      {
        brandId: 207,
        brandName: 'Elegance Chiffon',
        category: 'Luxury',
        description:
          'Delicate chiffon fabrics perfect for evening wear and dresses.',
        country: 'Turkey',
        website: 'https://elegancechiffon.com',
        logoUrl: 'assets/images/brands/elegancechiffon.jpg',
      },
      {
        brandId: 208,
        brandName: 'Royal Velvet',
        category: 'Luxury',
        description:
          'High-end velvet fabrics known for their softness and richness.',
        country: 'Germany',
        website: 'https://royalvelvet.com',
        logoUrl: 'assets/images/brands/royalvelvet.jpg',
      },
    ];
  }
  /** ****************************************************** above code cleanup ******* */


  setCurrentPath() {
    const currentUrl = decodeURIComponent(this.router.url.split('?')[0]);
    console.log('Path:', currentUrl);
    localStorage.setItem('redirectUrl', currentUrl);
    this.route.queryParams.subscribe((params) => {
      if (params['navigatedData']) {
        try {
          const decoded = JSON.parse(params['navigatedData']);
          console.log('Decoded navigatedData:', decoded);
          localStorage.setItem('navigatedData', JSON.stringify(decoded));
        } catch (err) {
          console.error('Invalid navigatedData format', err);
        }
      }
    });
  }


  getColorClassificatioMaster() {
    // atricle Id as list
    return [
      {
        colorId: 1,
        colorName: 'Red',
        hexCode: '#FF0000',
        category: 'Warm',
        description:
          'A bold and energetic color often associated with passion and excitement.',
        fabricIds: [101, 102],
      },
      {
        colorId: 2,
        colorName: 'Blue',
        hexCode: '#0000FF',
        category: 'Cool',
        description:
          'A calming color often associated with trust, stability, and depth.',
        fabricIds: [103, 104],
      },
      {
        colorId: 3,
        colorName: 'Green',
        hexCode: '#008000',
        category: 'Natural',
        description:
          'A refreshing color associated with nature, growth, and harmony.',
        fabricIds: [105, 106],
      },
      {
        colorId: 4,
        colorName: 'Yellow',
        hexCode: '#FFFF00',
        category: 'Warm',
        description:
          'A bright and cheerful color symbolizing happiness and positivity.',
        fabricIds: [107, 108],
      },
      {
        colorId: 5,
        colorName: 'Black',
        hexCode: '#000000',
        category: 'Neutral',
        description:
          'A timeless and sophisticated color associated with power and elegance.',
        fabricIds: [109, 110],
      },
      {
        colorId: 6,
        colorName: 'White',
        hexCode: '#FFFFFF',
        category: 'Neutral',
        description:
          'A pure and clean color representing simplicity and peace.',
        fabricIds: [101, 103],
      },
      {
        colorId: 7,
        colorName: 'Purple',
        hexCode: '#800080',
        category: 'Royal',
        description:
          'A luxurious color often associated with royalty, creativity, and mystery.',
        fabricIds: [102, 104],
      },
      {
        colorId: 8,
        colorName: 'Orange',
        hexCode: '#FFA500',
        category: 'Warm',
        description:
          'A vibrant color representing energy, enthusiasm, and warmth.',
        fabricIds: [105, 107],
      },
      {
        colorId: 9,
        colorName: 'Pink',
        hexCode: '#FFC0CB',
        category: 'Soft',
        description:
          'A gentle color symbolizing love, femininity, and kindness.',
        fabricIds: [106, 108],
      },
      {
        colorId: 10,
        colorName: 'Brown',
        hexCode: '#A52A2A',
        category: 'Earthy',
        description:
          'A warm, natural color associated with reliability, stability, and nature.',
        fabricIds: [109, 110],
      },
      {
        colorId: 11,
        colorName: 'Gray',
        hexCode: '#808080',
        category: 'Neutral',
        description:
          'A balanced color that represents sophistication and formality.',
        fabricIds: [101, 102],
      },
      {
        colorId: 12,
        colorName: 'Beige',
        hexCode: '#F5F5DC',
        category: 'Neutral',
        description:
          'A soft, warm shade often associated with calmness and simplicity.',
        fabricIds: [103, 104],
      },
      {
        colorId: 13,
        colorName: 'Teal',
        hexCode: '#008080',
        category: 'Cool',
        description:
          'A blend of blue and green, symbolizing sophistication and uniqueness.',
        fabricIds: [105, 106],
      },
      {
        colorId: 14,
        colorName: 'Gold',
        hexCode: '#FFD700',
        category: 'Luxury',
        description: 'A rich color representing wealth, success, and prestige.',
        fabricIds: [107, 108],
      },
      {
        colorId: 15,
        colorName: 'Silver',
        hexCode: '#C0C0C0',
        category: 'Luxury',
        description:
          'A sleek color associated with modernity, elegance, and high-tech aesthetics.',
        fabricIds: [109, 110],
      },
      {
        colorId: 16,
        colorName: 'Maroon',
        hexCode: '#800000',
        category: 'Deep',
        description:
          'A deep red shade associated with sophistication and confidence.',
        fabricIds: [101, 103],
      },
      {
        colorId: 17,
        colorName: 'Navy Blue',
        hexCode: '#000080',
        category: 'Cool',
        description:
          'A classic dark blue shade representing authority and elegance.',
        fabricIds: [102, 104],
      },
      {
        colorId: 18,
        colorName: 'Turquoise',
        hexCode: '#40E0D0',
        category: 'Refreshing',
        description:
          'A lively and calming color often associated with tropical oceans.',
        fabricIds: [105, 107],
      },
    ];
  }
  getService() {
    return [
      {
        image: '/assets/images/with_fabric1.jpeg',
        alt: 'With Fabric',
        serviceType: 'With Fabric',
        subUrl: 'with-fabric',
      },
      {
        image: '/assets/images/with_out_fabric1.jpeg',
        alt: 'Without Fabric',
        serviceType: 'Without Fabric',
        subUrl: 'with-out-fabric',
      },
    ];
  }
  getMasterMenu() {
    return [
      {
        articleId: 1,
        articleName: 'Shirt',
        imageUrl: 'assets/images/article/shirt.jpg',
        createDate: '2025-03-11T10:00:00Z',
        modifiedDate: '2025-03-11T10:00:00Z',
        isDelete: false,
        isActive: true,
        hrs: 16,
        fabricIds: [101, 102],
      },
      {
        articleId: 2,
        articleName: 'Pant',
        imageUrl: 'assets/images/article/pant.jpg',
        createDate: '2025-03-11T10:05:00Z',
        modifiedDate: '2025-03-11T10:05:00Z',
        isDelete: false,
        isActive: true,
        hrs: 8,
        fabricIds: [102, 103],
      },
      {
        articleId: 3,
        articleName: 'Kurta',
        imageUrl: 'assets/images/article/kurta.jpg',
        createDate: '2025-03-11T10:10:00Z',
        modifiedDate: '2025-03-11T10:10:00Z',
        isDelete: false,
        isActive: true,
        hrs: 12,
        fabricIds: [103, 104],
      },
      {
        articleId: 4,
        articleName: 'Blouse',
        imageUrl: 'assets/images/article/blouse.jpg',
        createDate: '2025-03-11T10:15:00Z',
        modifiedDate: '2025-03-11T10:15:00Z',
        isDelete: false,
        isActive: true,
        hrs: 5,
        fabricIds: [104, 105],
      },
      {
        articleId: 5,
        articleName: 'Suit',
        imageUrl: 'assets/images/article/suit.jpg',
        createDate: '2025-03-11T10:20:00Z',
        modifiedDate: '2025-03-11T10:20:00Z',
        isDelete: false,
        isActive: true,
        hrs: 24,
        fabricIds: [105, 106],
      },
      {
        articleId: 6,
        articleName: 'Jeans',
        imageUrl: 'assets/images/article/jeans.jpg',
        createDate: '2025-03-11T10:25:00Z',
        modifiedDate: '2025-03-11T10:25:00Z',
        isDelete: false,
        isActive: true,
        hrs: 12,
        fabricIds: [106, 107],
      },
      {
        articleId: 7,
        articleName: 'T-Shirt',
        imageUrl: 'assets/images/article/tshirt.jpg',
        createDate: '2025-03-11T10:30:00Z',
        modifiedDate: '2025-03-11T10:30:00Z',
        isDelete: false,
        isActive: true,
        hrs: 10,
        fabricIds: [107, 108],
      },
      {
        articleId: 9,
        articleName: 'Lehenga',
        imageUrl: 'assets/images/article/lehenga.jpg',
        createDate: '2025-03-11T10:40:00Z',
        modifiedDate: '2025-03-11T10:40:00Z',
        isDelete: false,
        isActive: true,
        hrs: 36,
        fabricIds: [109, 110],
      },
    ];
  }

  getFabricMasterData() {
    return [
      {
        fabricId: 101,
        fabricType: 'Cotton',
        weaveType: 'Plain',
        texture: 'Smooth',
        thickness: '150 GSM',
        stretchability: 'Non-Stretch',
        weight: 'Light',
        washingInstruction: 'Machine Wash',
        ironing: 'Low Heat',
        heatSensitivity: 'Low',
        imageUrl: 'assets/images/fabrics/cotton.jpg',
        articleIds: [1, 2, 3],
        pricePerMeter: 250,
        brandId: 201,
        brandName: 'PureCotton',
        colorId: 1,
        isDelete: false,
        isActive: true,
        isWishList: false,
      },
      {
        fabricId: 102,
        fabricType: 'Silk',
        weaveType: 'Jacquard',
        texture: 'Glossy',
        thickness: '120 GSM',
        stretchability: 'Non-Stretch',
        weight: 'Medium',
        washingInstruction: 'Dry Clean Only',
        ironing: 'Medium Heat',
        heatSensitivity: 'High',
        imageUrl: 'assets/images/fabrics/silk.jpg',
        articleIds: [4, 5, 6],
        pricePerMeter: 1200,
        brandId: 202,
        brandName: 'RoyalSilk',
        colorId: 2,
        isDelete: false,
        isActive: true,
        isWishList: false,
      },
      {
        fabricId: 103,
        fabricType: 'Wool',
        weaveType: 'Twill',
        texture: 'Rough',
        thickness: '300 GSM',
        stretchability: 'Non-Stretch',
        weight: 'Heavy',
        washingInstruction: 'Hand Wash',
        ironing: 'Low Heat',
        heatSensitivity: 'Medium',
        imageUrl: 'assets/images/fabrics/wool.jpg',
        articleIds: [7, 8],
        pricePerMeter: 900,
        brandId: 203,
        brandName: 'WarmWool',
        colorId: 3,
        isDelete: false,
        isActive: true,
        isWishList: false,
      },
      {
        fabricId: 104,
        fabricType: 'Polyester',
        weaveType: 'Stic',
        texture: 'Matte',
        thickness: '200 GSM',
        stretchability: '4-Way Stretch',
        weight: 'Medium',
        washingInstruction: 'Machine Wash',
        ironing: 'Low Heat',
        heatSensitivity: 'Medium',
        imageUrl: 'assets/images/fabrics/polyester.jpg',
        articleIds: [9, 10, 11],
        pricePerMeter: 300,
        brandId: 204,
        brandName: 'PolyTech',
        colorId: 4,
        isDelete: false,
        isActive: true,
        isWishList: false,
      },
      {
        fabricId: 105,
        fabricType: 'Linen',
        weaveType: 'Plain',
        texture: 'Rough',
        thickness: '180 GSM',
        stretchability: 'Non-Stretch',
        weight: 'Light',
        washingInstruction: 'Hand Wash',
        ironing: 'High Heat',
        heatSensitivity: 'Low',
        imageUrl: 'assets/images/fabrics/linen.jpg',
        articleIds: [12, 13],
        pricePerMeter: 600,
        brandId: 205,
        brandName: 'LinenLux',
        colorId: 5,
        isDelete: false,
        isActive: true,
        isWishList: false,
      },
      {
        fabricId: 106,
        fabricType: 'Denim',
        weaveType: 'Twill',
        texture: 'Rough',
        thickness: '350 GSM',
        stretchability: 'Stretch',
        weight: 'Heavy',
        washingInstruction: 'Machine Wash',
        ironing: 'Medium Heat',
        heatSensitivity: 'Low',
        imageUrl: 'assets/images/fabrics/denim.jpg',
        articleIds: [14, 15, 16],
        pricePerMeter: 800,
        brandId: 206,
        brandName: 'DenimPro',
        colorId: 6,
        isDelete: false,
        isActive: true,
        isWishList: false,
      },
      {
        fabricId: 107,
        fabricType: 'Chiffon',
        weaveType: 'Plain',
        texture: 'Glossy',
        thickness: '100 GSM',
        stretchability: 'Non-Stretch',
        weight: 'Light',
        washingInstruction: 'Dry Clean Only',
        ironing: 'Low Heat',
        heatSensitivity: 'High',
        imageUrl: 'assets/images/fabrics/chiffon.jpg',
        articleIds: [17, 18],
        pricePerMeter: 700,
        brandId: 207,
        brandName: 'EleganceChiffon',
        colorId: 7,
        isDelete: false,
        isActive: true,
        isWishList: false,
      },
      {
        fabricId: 108,
        fabricType: 'Velvet',
        weaveType: 'Jacquard',
        texture: 'Matte',
        thickness: '250 GSM',
        stretchability: 'Non-Stretch',
        weight: 'Medium',
        washingInstruction: 'Dry Clean Only',
        ironing: 'Low Heat',
        heatSensitivity: 'High',
        imageUrl: 'assets/images/fabrics/velvet.jpg',
        articleIds: [19, 20, 21],
        pricePerMeter: 1500,
        brandId: 208,
        brandName: 'RoyalVelvet',
        colorId: 8,
        isDelete: false,
        isActive: true,
        isWishList: false,
      },
    ];
  }

  colorClassificationMaster() {
    return [
      {
        colorId: 1,
        colorName: 'Red',
        hexCode: '#FF0000',
        category: 'Warm',
        description:
          'A bold and energetic color often associated with passion and excitement.',
        fabricIds: [101, 102],
        isWishList: false,
      },
      {
        colorId: 2,
        colorName: 'Blue',
        hexCode: '#0000FF',
        category: 'Cool',
        description:
          'A calming color often associated with trust, stability, and depth.',
        fabricIds: [103, 104],
        isWishList: false,
      },
      {
        colorId: 3,
        colorName: 'Green',
        hexCode: '#008000',
        category: 'Natural',
        description:
          'A refreshing color associated with nature, growth, and harmony.',
        fabricIds: [105, 106],
        isWishList: false,
      },
      {
        colorId: 4,
        colorName: 'Yellow',
        hexCode: '#FFFF00',
        category: 'Warm',
        description:
          'A bright and cheerful color symbolizing happiness and positivity.',
        fabricIds: [107, 108],
        isWishList: false,
      },
      // {
      //   "colorId": 5,
      //   "colorName": "White",
      //   "hexCode": "#FFFFFF",
      //   "category": "Neutral",
      //   "description": "A pure and clean color representing simplicity and peace.",
      //   "fabricIds": [101, 103],
      //   "isWishList": false
      // },
      {
        colorId: 6,
        colorName: 'Black',
        hexCode: '#000000',
        category: 'Neutral',
        description:
          'A timeless and sophisticated color associated with power and elegance.',
        fabricIds: [109, 110],
        isWishList: false,
      },
      // {
      //   "colorId": 7,
      //   "colorName": "Purple",
      //   "hexCode": "#800080",
      //   "category": "Royal",
      //   "description": "A luxurious color often associated with royalty, creativity, and mystery.",
      //   "fabricIds": [102, 104],
      //   "isWishList": false
      // },
      // {
      //   "colorId": 8,
      //   "colorName": "Orange",
      //   "hexCode": "#FFA500",
      //   "category": "Warm",
      //   "description": "A vibrant color representing energy, enthusiasm, and warmth.",
      //   "fabricIds": [105, 107],
      //   "isWishList": false
      // },
      // {
      //   "colorId": 9,
      //   "colorName": "Pink",
      //   "hexCode": "#FFC0CB",
      //   "category": "Soft",
      //   "description": "A gentle color symbolizing love, femininity, and kindness.",
      //   "fabricIds": [106, 108],
      //   "isWishList": false
      // },
      // {
      //   "colorId": 10,
      //   "colorName": "Brown",
      //   "hexCode": "#A52A2A",
      //   "category": "Earthy",
      //   "description": "A warm, natural color associated with reliability, stability, and nature.",
      //   "fabricIds": [109, 110],
      //   "isWishList": false
      // },
      // {
      //   "colorId": 11,
      //   "colorName": "Gray",
      //   "hexCode": "#808080",
      //   "category": "Neutral",
      //   "description": "A balanced color that represents sophistication and formality.",
      //   "fabricIds": [101, 102],
      //   "isWishList": false
      // },
      // {
      //   "colorId": 12,
      //   "colorName": "Beige",
      //   "hexCode": "#F5F5DC",
      //   "category": "Neutral",
      //   "description": "A soft, warm shade often associated with calmness and simplicity.",
      //   "fabricIds": [103, 104],
      //   "isWishList": false
      // },
      // {
      //   "colorId": 13,
      //   "colorName": "Teal",
      //   "hexCode": "#008080",
      //   "category": "Cool",
      //   "description": "A blend of blue and green, symbolizing sophistication and uniqueness.",
      //   "fabricIds": [105, 106],
      //   "isWishList": false
      // },
      // {
      //   "colorId": 14,
      //   "colorName": "Gold",
      //   "hexCode": "#FFD700",
      //   "category": "Luxury",
      //   "description": "A rich color representing wealth, success, and prestige.",
      //   "fabricIds": [107, 108],
      //   "isWishList": false
      // },
      {
        colorId: 15,
        colorName: 'Silver',
        hexCode: '#C0C0C0',
        category: 'Luxury',
        description:
          'A sleek color associated with modernity, elegance, and high-tech aesthetics.',
        fabricIds: [109, 110],
        isWishList: true,
      },
      {
        colorId: 16,
        colorName: 'Maroon',
        hexCode: '#800000',
        category: 'Deep',
        description:
          'A deep red shade associated with sophistication and confidence.',
        fabricIds: [101, 103],
        isWishList: false,
      },
      // {
      //   "colorId": 17,
      //   "colorName": "Navy Blue",
      //   "hexCode": "#000080",
      //   "category": "Cool",
      //   "description": "A classic dark blue shade representing authority and elegance.",
      //   "fabricIds": [102, 104],
      //   "isWishList": false
      // },
      // {
      //   "colorId": 18,
      //   "colorName": "Turquoise",
      //   "hexCode": "#40E0D0",
      //   "category": "Refreshing",
      //   "description": "A lively and calming color often associated with tropical oceans.",
      //   "fabricIds": [105, 107],
      //   "isWishList": false
      // }
    ];
  }
  getTopRatedTailor() {
    return [
      {
        tailorId: 100,
        imageUrl: 'assets/images/tailors/tailor1.jpg',
        name: 'Rahul Kumar',
        experience: 8,
        expertise: "Men's Suits, Blazers",
        rating: 4.7,
        distance: 2.5,
        grade: "A",
      },
      {
        tailorId: 101,
        imageUrl: 'assets/images/tailors/tailor2.jpg',
        name: 'Priya Sharma',
        experience: 5,
        expertise: "Women's Ethnic, Bridal",
        rating: 4.8,
        distance: 3.1,
        grade: "A",
      },
      {
        tailorId: 102,
        imageUrl: 'assets/images/tailors/tailor3.jpg',
        name: 'Amit Verma',
        experience: 10,
        expertise: 'Casual & Formal Wear',
        rating: 4.9,
        distance: 1.8,
      },
      {
        tailorId: 103,
        imageUrl: 'assets/images/tailors/tailor1.jpg',
        name: 'Neha Kapoor',
        experience: 7,
        expertise: 'Designer Dresses, Western',
        rating: 4.6,
        distance: 4.2,
        grade: "B",
      },
      {
        tailorId: 104,
        imageUrl: 'assets/images/tailors/tailor2.jpg',
        name: 'Vikram Singh',
        experience: 6,
        expertise: 'Formal Shirts, Trousers',
        rating: 4.5,
        distance: 3.0,
        grade: "A",
      },
      {
        tailorId: 105,
        imageUrl: 'assets/images/tailors/tailor3.jpg',
        name: 'Anjali Mehta',
        experience: 9,
        expertise: 'Saree Blouses, Lehengas',
        rating: 4.9,
        distance: 2.0,
      },
      {
        tailorId: 106,
        imageUrl: 'assets/images/tailors/tailor2.jpg',
        name: 'Sandeep Yadav',
        experience: 12,
        expertise: 'Sherwani, Indo-Western',
        rating: 5.0,
        distance: 1.5,
        grade: "A",
      },
      {
        tailorId: 107,
        imageUrl: 'assets/images/tailors/tailor1.jpg',
        name: 'Pooja Chauhan',
        experience: 4,
        expertise: 'Kids Wear, Party Dresses',
        rating: 4.3,
        distance: 3.7,
        grade: "D",
      },
    ];
  }

  getSubArtcles() {
    return [
      {
        articleId: 1,
        imageUrl: 'assets/images/shirtArticles/shirt1.jpg',
        createDate: '2025-03-11T10:00:00Z',
        modifiedDate: '2025-03-11T10:00:00Z',
        isDelete: false,
        isActive: true,
        subArticleId: 1001,
        subArticleName: 'Shirt1',
      },
      {
        articleId: 1,
        imageUrl: 'assets/images/shirtArticles/shirt2.jpg',
        createDate: '2025-03-11T10:00:00Z',
        modifiedDate: '2025-03-11T10:00:00Z',
        isDelete: false,
        isActive: true,
        subArticleId: 1002,
        subArticleName: 'Shirt2',
      },
      {
        articleId: 1,
        imageUrl: 'assets/images/shirtArticles/shirt3.jpg',
        createDate: '2025-03-11T10:00:00Z',
        modifiedDate: '2025-03-11T10:00:00Z',
        isDelete: false,
        isActive: true,
        subArticleId: 1003,
        subArticleName: 'Shirt3',
      },
      {
        articleId: 1,
        imageUrl: 'assets/images/shirtArticles/shirt4.jpg',
        createDate: '2025-03-11T10:00:00Z',
        modifiedDate: '2025-03-11T10:00:00Z',
        isDelete: false,
        isActive: true,
        subArticleId: 1004,
        subArticleName: 'Shirt4',
      },
      {
        articleId: 1,
        imageUrl: 'assets/images/shirtArticles/shirt5.jpg',
        createDate: '2025-03-11T10:00:00Z',
        modifiedDate: '2025-03-11T10:00:00Z',
        isDelete: false,
        isActive: true,
        subArticleId: 1005,
        subArticleName: 'Shirt5',
      },
    ];
  }

  masterArticle() {
    return [
      {
        articleId: 1,
        articleName: 'Casual Shirt',
        fabric: 'Cotton',
        price: 500,
        hrs: 16,
        imageUrl:
          'assets/images/article/Master/Article1/Article1_Main_image.png',
        subArticles: [
          {
            subArticleId: 11,
            articleName: 'Casual Shirt',
            imageName: 'Article1_Main_image.png',
            imageUrl:
              'assets/images/article/Master/Article1/Article1_Main_image.png',
            price: 100,
            articleColor: [
              {
                articleColorId: 111,
                articleName: 'Casual Shirt',
                imageName: 'Article1_inside_image1_Color1.png',
                imageUrl:
                  'assets/images/article/Master/Article1/Article1_inside_image1_Color1.png',
              },
              {
                articleColorId: 112,
                articleName: 'Casual Shirt',
                imageName: 'Article1_inside_image2_Color1.png',
                imageUrl:
                  'assets/images/article/Master/Article1/Article1_inside_image2_Color1.png',
              },
              {
                articleColorId: 113,
                articleName: 'Casual Shirt',
                imageName: 'Article1_inside_image3_Color1.png',
                imageUrl:
                  'assets/images/article/Master/Article1/Article1_inside_image3_Color1.png',
              },
              {
                articleColorId: 114,
                articleName: 'Casual Shirt',
                imageName: 'Article1_inside_image4_Color1.png',
                imageUrl:
                  'assets/images/article/Master/Article1/Article1_inside_image4_Color1.png',
              },
              {
                articleColorId: 114,
                articleName: 'Casual Shirt',
                imageName: 'Article1_inside_image5_Color1.png',
                imageUrl:
                  'assets/images/article/Master/Article1/Article1_inside_image5_Color1.png',
              },
            ],
          },
          {
            subArticleId: 12,
            articleName: 'Casual Shirt',
            imageName: 'Article1_inside_image1_Color2.png',
            imageUrl:
              'assets/images/article/Master/Article1/Article1_inside_image1_Color2.png',
            price: 100,
            articleColor: [
              {
                articleColorId: 121,
                articleName: 'Casual Shirt',
                imageName: 'Article1_inside_image1_Color2.png',
                imageUrl:
                  'assets/images/article/Master/Article1/Article1_inside_image1_Color2.png',
              },
              {
                articleColorId: 122,
                articleName: 'Casual Shirt',
                imageName: 'Article1_inside_image2_Color2.png',
                imageUrl:
                  'assets/images/article/Master/Article1/Article1_inside_image2_Color2.png',
              },
              {
                articleColorId: 123,
                articleName: 'Casual Shirt',
                imageName: 'Article1_inside_image3_Color2.png',
                imageUrl:
                  'assets/images/article/Master/Article1/Article1_inside_image3_Color2.png',
              },
              {
                articleColorId: 124,
                articleName: 'Casual Shirt',
                imageName: 'Article1_inside_image4_Color2.png',
                imageUrl:
                  'assets/images/article/Master/Article1/Article1_inside_image4_Color2.png',
                price: 100,
              },
              {
                articleColorId: 125,
                articleName: 'Casual Shirt',
                imageName: 'Article1_inside_image5_Color2.png',
                imageUrl:
                  'assets/images/article/Master/Article1/Article1_inside_image5_Color2.png',
              },
            ],
          },
        ],
      },
      {
        articleId: 2,
        articleName: 'Formal Shirt',
        fabric: 'Linen',
        price: 650,
        hrs: 16,
        imageUrl:
          'assets/images/article/Master/Article2/Article2_main_image.png',
        subArticles: [
          {
            subArticleId: 22,
            articleName: 'Formal Shirt',
            imageName: 'Article2_inside_image1_Color1.png',
            imageUrl:
              'assets/images/article/Master/Article2/Article2_inside_image1_Color1.png',
            articleColor: [
              {
                articleColorId: 221,
                articleName: 'Formal Shirt',
                imageName: 'Article2_inside_image1_Color1.png',
                imageUrl:
                  'assets/images/article/Master/Article2/Article2_inside_image1_Color1.png',
              },
              {
                articleColorId: 222,
                articleName: 'Formal Shirt',
                imageName: 'Article2_inside_image2_Color1.png',
                imageUrl:
                  'assets/images/article/Master/Article2/Article2_inside_image2_Color1.png',
              },
              {
                articleColorId: 223,
                articleName: 'Formal Shirt',
                imageName: 'Article2_inside_image3_Color1.png',
                imageUrl:
                  'assets/images/article/Master/Article2/Article2_inside_image3_Color1.png',
              },
              {
                articleColorId: 224,
                articleName: 'Formal Shirt',
                imageName: 'Article2_inside_image4_Color1.png',
                imageUrl:
                  'assets/images/article/Master/Article2/Article2_inside_image4_Color1.png',
              },
            ],
          },
          {
            subArticleId: 23,
            articleName: 'Formal Shirt',
            imageName: 'Article2_inside_image1_Color2.png',
            imageUrl:
              'assets/images/article/Master/Article2/Article2_inside_image1_Color2.png',
            articleColor: [
              {
                articleColorId: 231,
                articleName: 'Formal Shirt',
                imageName: 'Article2_inside_image1_Color2.png',
                imageUrl:
                  'assets/images/article/Master/Article2/Article2_inside_image1_Color2.png',
              },
              {
                articleColorId: 222,
                articleName: 'Formal Shirt',
                imageName: 'Article2_inside_image2_Color2.png',
                imageUrl:
                  'assets/images/article/Master/Article2/Article2_inside_image2_Color2.png',
              },
              {
                articleColorId: 223,
                articleName: 'Formal Shirt',
                imageName: 'Article2_inside_image3_Color2.png',
                imageUrl:
                  'assets/images/article/Master/Article2/Article2_inside_image3_Color2.png',
              },
              {
                articleColorId: 224,
                articleName: 'Formal Shirt',
                imageName: 'Article2_inside_image4_Color2.png',
                imageUrl:
                  'assets/images/article/Master/Article2/Article2_inside_image4_Color2.png',
              },
            ],
          },
        ],
      },
      {
        articleId: 3,
        articleName: 'Party Shirt',
        fabric: 'Silk',
        price: 850,
        hrs: 20,
        imageUrl:
          'assets/images/article/Master/Article3/Article3_main_image.png',
        subArticles: [
          {
            subArticleId: 31,
            articleName: 'Party Shirt',
            imageName: 'Article3_inside_image1_color1.png',
            imageUrl:
              'assets/images/article/Master/Article3/Article3_inside_image1_color1.png',
            articleColor: [
              {
                articleColorId: 311,
                articleName: 'Party Shirt',
                imageName: 'Article3_inside_image1_color1.png',
                imageUrl:
                  'assets/images/article/Master/Article3/Article3_inside_image1_color1.png',
              },
              {
                articleColorId: 2,
                articleName: 'Party Shirt',
                imageName: 'Article3_inside_image2_color1.png',
                imageUrl:
                  'assets/images/article/Master/Article3/Article3_inside_image2_color1.png',
              },
            ],
          },

          {
            subArticleId: 32,
            articleName: 'Party Shirt',
            imageName: 'Article3_inside_image1_color2.png',
            imageUrl:
              'assets/images/article/Master/Article3/Article3_inside_image1_color2.png',
            articleColor: [
              {
                articleColorId: 321,
                articleName: 'Party Shirt',
                imageName: 'Article3_inside_image1_color2.png',
                imageUrl:
                  'assets/images/article/Master/Article3/Article3_inside_image1_color2.png',
              },
              {
                articleColorId: 322,
                articleName: 'Party Shirt',
                imageName: 'Article3_inside_image2_color2.png',
                imageUrl:
                  'assets/images/article/Master/Article3/Article3_inside_image2_color2.png',
              },
              {
                articleColorId: 323,
                articleName: 'Party Shirt',
                imageName: 'Article3_inside_image3_color2.png',
                imageUrl:
                  'assets/images/article/Master/Article3/Article3_inside_image3_color2.png',
              },
            ],
          },
        ],
      },
      {
        articleId: 4,
        articleName: 'Denim Shirt',
        fabric: 'Denim',
        price: 750,
        hrs: 16,
        imageUrl:
          'assets/images/article/Master/Article4/Article4_main_image.png',
        subArticles: [
          {
            subArticleId: 41,
            articleName: 'Denim Shirt',
            imageName: 'Article4_main_image.png',
            imageUrl:
              'assets/images/article/Master/Article4/Article4_main_image.png',
            articleColor: [
              {
                articleColorId: 411,
                articleName: 'Denim Shirt',
                imageName: 'Article4_inside_image1_color1.png',
                imageUrl:
                  'assets/images/article/Master/Article4/Article4_inside_image1_color1.png',
              },
              {
                articleColorId: 412,
                articleName: 'Denim Shirt',
                imageName: 'Article4_inside_image2_color1.png',
                imageUrl:
                  'assets/images/article/Master/Article4/Article4_inside_image2_color1.png',
              },
            ],
          },
          {
            subArticleId: 42,
            articleName: 'Denim Shirt',
            imageName: 'Article4_inside_image1_color2.png',
            imageUrl:
              'assets/images/article/Master/Article4/Article4_inside_image1_color2.png',
            articleColor: [
              {
                articleColorId: 421,
                articleName: 'Denim Shirt',
                imageName: 'Article4_inside_image1_color2.png',
                imageUrl:
                  'assets/images/article/Master/Article4/Article4_inside_image1_color2.png',
                price: 100,
              },
              {
                articleColorId: 422,
                articleName: 'Denim Shirt',
                imageName: 'Article4_inside_image2_color2.png',
                imageUrl:
                  'assets/images/article/Master/Article4/Article4_inside_image2_color2.png',
              },
            ],
          },
        ],
      },
      {
        articleId: 5,
        articleName: 'Checked Shirt',
        fabric: 'Poly Cotton',
        price: 680,
        hrs: 14,
        imageUrl:
          'assets/images/article/Master/Article5/Article5_main_image.png',
        subArticles: [
          {
            subArticleId: 51,
            articleName: 'Checked Shirt',
            imageName: 'Article5_inside_image1_Color1.png',
            imageUrl:
              'assets/images/article/Master/Article5/Article5_inside_image1_Color1.png',
            articleColor: [
              {
                articleColorId: 511,
                articleName: 'Checked Shirt',
                imageName: 'Article5_inside_image1_Color1.png',
                imageUrl:
                  'assets/images/article/Master/Article5/Article5_inside_image1_Color1.png',
              },
              {
                articleColorId: 512,
                articleName: 'Checked Shirt',
                imageName: 'Article5_inside_image2_Color1.png',
                imageUrl:
                  'assets/images/article/Master/Article5/Article5_inside_image2_Color1.png',
              },
              {
                articleColorId: 513,
                articleName: 'Checked Shirt',
                imageName: 'Article5_inside_image3_Color1.png',
                imageUrl:
                  'assets/images/article/Master/Article5/Article5_inside_image3_Color1.png',
              },
            ],
          },
          {
            subArticleId: 52,
            articleName: 'Checked Shirt',
            imageName: 'Article5_inside_image1_Color2.png',
            imageUrl:
              'assets/images/article/Master/Article5/Article5_inside_image1_Color2.png',
            articleColor: [
              {
                articleColorId: 521,
                articleName: 'Checked Shirt',
                imageName: 'Article5_inside_image1_Color2.png',
                imageUrl:
                  'assets/images/article/Master/Article5/Article5_inside_image1_Color2.png',
              },
              {
                articleColorId: 522,
                articleName: 'Checked Shirt',
                imageName: 'Article5_inside_image2_Color2.png',
                imageUrl:
                  'assets/images/article/Master/Article5/Article5_inside_image2_Color2.png',
              },
              {
                articleColorId: 523,
                articleName: 'Checked Shirt',
                imageName: 'Article5_inside_image3_Color2.png',
                imageUrl:
                  'assets/images/article/Master/Article5/Article5_inside_image3_Color2.png',
              },
            ],
          },
        ],
      },
      {
        articleId: 6,
        articleName: 'Casual Checked Shirt',
        fabric: 'Polister Cotton',
        price: 680,
        hrs: 16,
        imageUrl:
          'assets/images/article/Master/Article6/Article6_main_image.png',
        subArticles: [
          {
            subArticleId: 61,
            articleName: 'Casual Checked Shirt',
            imageName: 'Article6_inside_image1_color1.png',
            imageUrl:
              'assets/images/article/Master/Article6/Article6_inside_image1_color1.png',
            articleColor: [
              {
                articleColorId: 611,
                articleName: 'Casual Checked Shirt',
                imageName: 'Article6_inside_image1_color1.png',
                imageUrl:
                  'assets/images/article/Master/Article6/Article6_inside_image1_color1.png',
              },
              {
                articleColorId: 612,
                articleName: 'Casual Checked Shirt',
                imageName: 'Article6_inside_image2_color1.png',
                imageUrl:
                  'assets/images/article/Master/Article6/Article6_inside_image2_color1.png',
              },
              {
                articleColorId: 613,
                articleName: 'Casual Checked Shirt',
                imageName: 'Article6_inside_image3_color1.png',
                imageUrl:
                  'assets/images/article/Master/Article6/Article6_inside_image3_color1.png',
              },
            ],
          },
          {
            subArticleId: 62,
            articleName: 'Casual Checked Shirt',
            imageName: 'Article6_inside_image1_color2.png',
            imageUrl:
              'assets/images/article/Master/Article6/Article6_inside_image1_color2.png',
            articleColor: [
              {
                articleColorId: 621,
                articleName: 'Casual Checked Shirt',
                imageName: 'Article6_inside_image1_color2.png',
                imageUrl:
                  'assets/images/article/Master/Article6/Article6_inside_image1_color2.png',
              },
              {
                articleColorId: 622,
                articleName: 'Casual Checked Shirt',
                imageName: 'Article6_inside_image2_color2.png',
                imageUrl:
                  'assets/images/article/Master/Article6/Article6_inside_image2_color2.png',
              },
              {
                articleColorId: 623,
                articleName: 'Casual Checked Shirt',
                imageName: 'Article6_inside_image3_color2.png',
                imageUrl:
                  'assets/images/article/Master/Article6/Article6_inside_image3_color2.png',
              },
            ],
          },
        ],
      },
    ];
  }


  async getCurrentCoordinates() {
    const coordinates = await Geolocation.getCurrentPosition();
    console.log('Current position:', coordinates.coords);
    const latitude = coordinates.coords.latitude;
    const longitude = coordinates.coords.longitude;
    this.getCurrentLocation(latitude, longitude);
  }
  async getCurrentLocation(lat: any, lon: any) {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`,
    );
    const currentLocation = await response.json();
    return currentLocation;
  }

  getAddress(lat: number, lng: number) {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=28.7055796,77.3287977&key=AIzaSyAoYbrW-KNT-M5K4JvCf1JAVWVf49Iu6sQ`;
    return this.http.get<any>(url);
  }
}
