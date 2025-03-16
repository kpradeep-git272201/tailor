import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { 


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
}
