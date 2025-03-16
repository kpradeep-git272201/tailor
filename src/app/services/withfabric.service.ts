import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WithfabricService {

  constructor() { }

  getMasterMenu(){
    return [
      {
        "articleId": 1,
        "articleName": "Shirt",
        "imageUrl": "assets/images/article/shirt.jpg",
        "createDate": "2025-03-11T10:00:00Z",
        "modifiedDate": "2025-03-11T10:00:00Z",
        "isDelete": false,
        "isActive": true,
        "fabricIds": [101, 102]
      },
      {
        "articleId": 2,
        "articleName": "Pant",
        "imageUrl": "assets/images/article/pant.jpg",
        "createDate": "2025-03-11T10:05:00Z",
        "modifiedDate": "2025-03-11T10:05:00Z",
        "isDelete": false,
        "isActive": true,
        "fabricIds": [102, 103]
      },
      {
        "articleId": 3,
        "articleName": "Kurta",
        "imageUrl": "assets/images/article/kurta.jpg",
        "createDate": "2025-03-11T10:10:00Z",
        "modifiedDate": "2025-03-11T10:10:00Z",
        "isDelete": false,
        "isActive": true,
        "fabricIds": [103, 104]
      },
      {
        "articleId": 4,
        "articleName": "Blouse",
        "imageUrl": "assets/images/article/blouse.jpg",
        "createDate": "2025-03-11T10:15:00Z",
        "modifiedDate": "2025-03-11T10:15:00Z",
        "isDelete": false,
        "isActive": true,
        "fabricIds": [104, 105]
      },
      {
        "articleId": 5,
        "articleName": "Suit",
        "imageUrl": "assets/images/article/suit.jpg",
        "createDate": "2025-03-11T10:20:00Z",
        "modifiedDate": "2025-03-11T10:20:00Z",
        "isDelete": false,
        "isActive": true,
        "fabricIds": [105, 106]
      },
      {
        "articleId": 6,
        "articleName": "Jeans",
        "imageUrl": "assets/images/article/jeans.jpg",
        "createDate": "2025-03-11T10:25:00Z",
        "modifiedDate": "2025-03-11T10:25:00Z",
        "isDelete": false,
        "isActive": true,
        "fabricIds": [106, 107]
      },
      {
        "articleId": 7,
        "articleName": "T-Shirt",
        "imageUrl": "assets/images/article/tshirt.jpg",
        "createDate": "2025-03-11T10:30:00Z",
        "modifiedDate": "2025-03-11T10:30:00Z",
        "isDelete": false,
        "isActive": true,
        "fabricIds": [107, 108]
      },
      {
        "articleId": 8,
        "articleName": "Saree",
        "imageUrl": "assets/images/article/saree.jpg",
        "createDate": "2025-03-11T10:35:00Z",
        "modifiedDate": "2025-03-11T10:35:00Z",
        "isDelete": false,
        "isActive": true,
        "fabricIds": [108, 109]
      },
      {
        "articleId": 9,
        "articleName": "Lehenga",
        "imageUrl": "assets/images/article/lehenga.jpg",
        "createDate": "2025-03-11T10:40:00Z",
        "modifiedDate": "2025-03-11T10:40:00Z",
        "isDelete": false,
        "isActive": true,
        "fabricIds": [109, 110]
      },
      {
        "articleId": 10,
        "articleName": "Shorts",
        "imageUrl": "assets/images/article/shorts.jpg",
        "createDate": "2025-03-11T10:45:00Z",
        "modifiedDate": "2025-03-11T10:45:00Z",
        "isDelete": false,
        "isActive": true,
        "fabricIds": [110, 101]
      }
    ];
  }

  getFabricMasterDate(){
    return [
      {
        "fabricId": 101,
        "fabricType": "Cotton",
        "weaveType": "Plain",
        "texture": "Smooth",
        "thickness": "150 GSM",
        "stretchability": "Non-Stretch",
        "weight": "Light",
        "washingInstruction": "Machine Wash",
        "ironing": "Low Heat",
        "heatSensitivity": "Low",
        "imageUrl": "assets/images/fabrics/cotton.jpg",
        "articleIds": [1, 2, 3],
        "pricePerMeter": 250,
        "brandId": 201,
        "brandName": "PureCotton",
        "colorId": 1,
        "isDelete": false,
        "isActive": true
      },
      {
        "fabricId": 102,
        "fabricType": "Silk",
        "weaveType": "Jacquard",
        "texture": "Glossy",
        "thickness": "120 GSM",
        "stretchability": "Non-Stretch",
        "weight": "Medium",
        "washingInstruction": "Dry Clean Only",
        "ironing": "Medium Heat",
        "heatSensitivity": "High",
        "imageUrl": "assets/images/fabrics/silk.jpg",
        "articleIds": [4, 5, 6],
        "pricePerMeter": 1200,
        "brandId": 202,
        "brandName": "RoyalSilk",
        "colorId": 2,
        "isDelete": false,
        "isActive": true
      },
      {
        "fabricId": 103,
        "fabricType": "Wool",
        "weaveType": "Twill",
        "texture": "Rough",
        "thickness": "300 GSM",
        "stretchability": "Non-Stretch",
        "weight": "Heavy",
        "washingInstruction": "Hand Wash",
        "ironing": "Low Heat",
        "heatSensitivity": "Medium",
        "imageUrl": "assets/images/fabrics/wool.jpg",
        "articleIds": [7, 8],
        "pricePerMeter": 900,
        "brandId": 203,
        "brandName": "WarmWool",
        "colorId": 3,
        "isDelete": false,
        "isActive": true
      },
      {
        "fabricId": 104,
        "fabricType": "Polyester",
        "weaveType": "Stic",
        "texture": "Matte",
        "thickness": "200 GSM",
        "stretchability": "4-Way Stretch",
        "weight": "Medium",
        "washingInstruction": "Machine Wash",
        "ironing": "Low Heat",
        "heatSensitivity": "Medium",
        "imageUrl": "assets/images/fabrics/polyester.jpg",
        "articleIds": [9, 10, 11],
        "pricePerMeter": 300,
        "brandId": 204,
        "brandName": "PolyTech",
        "colorId": 4,
        "isDelete": false,
        "isActive": true
      },
      {
        "fabricId": 105,
        "fabricType": "Linen",
        "weaveType": "Plain",
        "texture": "Rough",
        "thickness": "180 GSM",
        "stretchability": "Non-Stretch",
        "weight": "Light",
        "washingInstruction": "Hand Wash",
        "ironing": "High Heat",
        "heatSensitivity": "Low",
        "imageUrl": "assets/images/fabrics/linen.jpg",
        "articleIds": [12, 13],
        "pricePerMeter": 600,
        "brandId": 205,
        "brandName": "LinenLux",
        "colorId": 5,
        "isDelete": false,
        "isActive": true
      },
      {
        "fabricId": 106,
        "fabricType": "Denim",
        "weaveType": "Twill",
        "texture": "Rough",
        "thickness": "350 GSM",
        "stretchability": "Stretch",
        "weight": "Heavy",
        "washingInstruction": "Machine Wash",
        "ironing": "Medium Heat",
        "heatSensitivity": "Low",
        "imageUrl": "assets/images/fabrics/denim.jpg",
        "articleIds": [14, 15, 16],
        "pricePerMeter": 800,
        "brandId": 206,
        "brandName": "DenimPro",
        "colorId": 6,
        "isDelete": false,
        "isActive": true
      },
      {
        "fabricId": 107,
        "fabricType": "Chiffon",
        "weaveType": "Plain",
        "texture": "Glossy",
        "thickness": "100 GSM",
        "stretchability": "Non-Stretch",
        "weight": "Light",
        "washingInstruction": "Dry Clean Only",
        "ironing": "Low Heat",
        "heatSensitivity": "High",
        "imageUrl": "assets/images/fabrics/chiffon.jpg",
        "articleIds": [17, 18],
        "pricePerMeter": 700,
        "brandId": 207,
        "brandName": "EleganceChiffon",
        "colorId": 7,
        "isDelete": false,
        "isActive": true
      },
      {
        "fabricId": 108,
        "fabricType": "Velvet",
        "weaveType": "Jacquard",
        "texture": "Matte",
        "thickness": "250 GSM",
        "stretchability": "Non-Stretch",
        "weight": "Medium",
        "washingInstruction": "Dry Clean Only",
        "ironing": "Low Heat",
        "heatSensitivity": "High",
        "imageUrl": "assets/images/fabrics/velvet.jpg",
        "articleIds": [19, 20, 21],
        "pricePerMeter": 1500,
        "brandId": 208,
        "brandName": "RoyalVelvet",
        "colorId": 8,
        "isDelete": false,
        "isActive": true
      }
    ];
  }
}
