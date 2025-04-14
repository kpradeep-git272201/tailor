import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor( private router: Router,
    private route: ActivatedRoute,) { 
  }

  setCurrentPath(){
    const currentUrl = decodeURIComponent(this.router.url.split('?')[0]);
        console.log('Path:', currentUrl);
        localStorage.setItem('redirectUrl', currentUrl);
        this.route.queryParams.subscribe(params => {
          if (params['navigatedData']) {
            try {
              const decoded = JSON.parse(params['navigatedData']);
              console.log('Decoded navigatedData:', decoded);
              localStorage.setItem('navigatedData', JSON.stringify(decoded))
            } catch (err) {
              console.error('Invalid navigatedData format', err);
            }
          }
        });
  }
  getMasterBrand(){
    return [
      {
        "brandId": 201,
        "brandName": "Pure Cotton",
        "category": "Eco-Friendly",
        "description": "Specializes in organic and sustainable cotton fabrics.",
        "country": "India",
        "website": "https://purecotton.com",
        "logoUrl": "assets/images/brands/purecotton.jpg"
      },
      {
        "brandId": 202,
        "brandName": "Royalilk",
        "category": "Luxury",
        "description": "Premium silk fabrics known for their luxurious feel and elegance.",
        "country": "Italy",
        "website": "https://royalsilk.com",
        "logoUrl": "assets/images/brands/royalsilk.jpg"
      },
      {
        "brandId": 203,
        "brandName": "Warm Wool",
        "category": "Premium",
        "description": "High-quality wool fabrics designed for warmth and durability.",
        "country": "United Kingdom",
        "website": "https://warmwool.com",
        "logoUrl": "assets/images/brands/warmwool.jpg"
      },
      {
        "brandId": 204,
        "brandName": "Poly Tech",
        "category": "Budget",
        "description": "Affordable polyester fabrics for everyday wear and durability.",
        "country": "China",
        "website": "https://polytechfabrics.com",
        "logoUrl": "assets/images/brands/polytech.jpg"
      },
      {
        "brandId": 205,
        "brandName": "Linen Lux",
        "category": "Eco-Friendly",
        "description": "Specializes in breathable and sustainable linen fabrics.",
        "country": "France",
        "website": "https://linenlux.com",
        "logoUrl": "assets/images/brands/linenlux.jpg"
      },
      {
        "brandId": 206,
        "brandName": "Denim Pro",
        "category": "Sportswear",
        "description": "Durable and stylish denim fabrics used for casual and sportswear.",
        "country": "USA",
        "website": "https://denimpro.com",
        "logoUrl": "assets/images/brands/denimpro.jpg"
      },
      {
        "brandId": 207,
        "brandName": "Elegance Chiffon",
        "category": "Luxury",
        "description": "Delicate chiffon fabrics perfect for evening wear and dresses.",
        "country": "Turkey",
        "website": "https://elegancechiffon.com",
        "logoUrl": "assets/images/brands/elegancechiffon.jpg"
      },
      {
        "brandId": 208,
        "brandName": "Royal Velvet",
        "category": "Luxury",
        "description": "High-end velvet fabrics known for their softness and richness.",
        "country": "Germany",
        "website": "https://royalvelvet.com",
        "logoUrl": "assets/images/brands/royalvelvet.jpg"
      }
    ]    
  }


  getColorClassificatioMaster(){
    // atricle Id as list
    return [
      {
        "colorId": 1,
        "colorName": "Red",
        "hexCode": "#FF0000",
        "category": "Warm",
        "description": "A bold and energetic color often associated with passion and excitement.",
        "fabricIds": [101, 102]
      },
      {
        "colorId": 2,
        "colorName": "Blue",
        "hexCode": "#0000FF",
        "category": "Cool",
        "description": "A calming color often associated with trust, stability, and depth.",
        "fabricIds": [103, 104]
      },
      {
        "colorId": 3,
        "colorName": "Green",
        "hexCode": "#008000",
        "category": "Natural",
        "description": "A refreshing color associated with nature, growth, and harmony.",
        "fabricIds": [105, 106]
      },
      {
        "colorId": 4,
        "colorName": "Yellow",
        "hexCode": "#FFFF00",
        "category": "Warm",
        "description": "A bright and cheerful color symbolizing happiness and positivity.",
        "fabricIds": [107, 108]
      },
      {
        "colorId": 5,
        "colorName": "Black",
        "hexCode": "#000000",
        "category": "Neutral",
        "description": "A timeless and sophisticated color associated with power and elegance.",
        "fabricIds": [109, 110]
      },
      {
        "colorId": 6,
        "colorName": "White",
        "hexCode": "#FFFFFF",
        "category": "Neutral",
        "description": "A pure and clean color representing simplicity and peace.",
        "fabricIds": [101, 103]
      },
      {
        "colorId": 7,
        "colorName": "Purple",
        "hexCode": "#800080",
        "category": "Royal",
        "description": "A luxurious color often associated with royalty, creativity, and mystery.",
        "fabricIds": [102, 104]
      },
      {
        "colorId": 8,
        "colorName": "Orange",
        "hexCode": "#FFA500",
        "category": "Warm",
        "description": "A vibrant color representing energy, enthusiasm, and warmth.",
        "fabricIds": [105, 107]
      },
      {
        "colorId": 9,
        "colorName": "Pink",
        "hexCode": "#FFC0CB",
        "category": "Soft",
        "description": "A gentle color symbolizing love, femininity, and kindness.",
        "fabricIds": [106, 108]
      },
      {
        "colorId": 10,
        "colorName": "Brown",
        "hexCode": "#A52A2A",
        "category": "Earthy",
        "description": "A warm, natural color associated with reliability, stability, and nature.",
        "fabricIds": [109, 110]
      },
      {
        "colorId": 11,
        "colorName": "Gray",
        "hexCode": "#808080",
        "category": "Neutral",
        "description": "A balanced color that represents sophistication and formality.",
        "fabricIds": [101, 102]
      },
      {
        "colorId": 12,
        "colorName": "Beige",
        "hexCode": "#F5F5DC",
        "category": "Neutral",
        "description": "A soft, warm shade often associated with calmness and simplicity.",
        "fabricIds": [103, 104]
      },
      {
        "colorId": 13,
        "colorName": "Teal",
        "hexCode": "#008080",
        "category": "Cool",
        "description": "A blend of blue and green, symbolizing sophistication and uniqueness.",
        "fabricIds": [105, 106]
      },
      {
        "colorId": 14,
        "colorName": "Gold",
        "hexCode": "#FFD700",
        "category": "Luxury",
        "description": "A rich color representing wealth, success, and prestige.",
        "fabricIds": [107, 108]
      },
      {
        "colorId": 15,
        "colorName": "Silver",
        "hexCode": "#C0C0C0",
        "category": "Luxury",
        "description": "A sleek color associated with modernity, elegance, and high-tech aesthetics.",
        "fabricIds": [109, 110]
      },
      {
        "colorId": 16,
        "colorName": "Maroon",
        "hexCode": "#800000",
        "category": "Deep",
        "description": "A deep red shade associated with sophistication and confidence.",
        "fabricIds": [101, 103]
      },
      {
        "colorId": 17,
        "colorName": "Navy Blue",
        "hexCode": "#000080",
        "category": "Cool",
        "description": "A classic dark blue shade representing authority and elegance.",
        "fabricIds": [102, 104]
      },
      {
        "colorId": 18,
        "colorName": "Turquoise",
        "hexCode": "#40E0D0",
        "category": "Refreshing",
        "description": "A lively and calming color often associated with tropical oceans.",
        "fabricIds": [105, 107]
      }
    ];
  }
  
}
