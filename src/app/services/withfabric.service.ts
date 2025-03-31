import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WithfabricService {

  constructor() { }

  getService(){
    return [
      {
        image: "/assets/images/with_fabric1.jpeg",
        alt: "With Fabric",
        serviceType: "With Fabric",
        subUrl:"with-fabric"
      },
      {
        image: "/assets/images/with_out_fabric1.jpeg",
        alt: "With Out Fabric",
        serviceType: "With Out Fabric",
        subUrl:"with-out-fabric"
      }
    ]
  }
  getSubArtcles(){
    return [
      {
        "articleId": 1,
        "imageUrl": "assets/images/shirtArticles/shirt1.jpg",
        "createDate": "2025-03-11T10:00:00Z",
        "modifiedDate": "2025-03-11T10:00:00Z",
        "isDelete": false,
        "isActive": true,
        "subArticleId": 1001,
        "subArticleName": "Shirt1"
      },
      {
        "articleId": 1,
        "imageUrl": "assets/images/shirtArticles/shirt2.jpg",
        "createDate": "2025-03-11T10:00:00Z",
        "modifiedDate": "2025-03-11T10:00:00Z",
        "isDelete": false,
        "isActive": true,
        "subArticleId": 1002,
        "subArticleName": "Shirt2"
      },
      {
        "articleId": 1,
        "imageUrl": "assets/images/shirtArticles/shirt3.jpg",
        "createDate": "2025-03-11T10:00:00Z",
        "modifiedDate": "2025-03-11T10:00:00Z",
        "isDelete": false,
        "isActive": true,
        "subArticleId": 1003,
        "subArticleName": "Shirt3"
      },
      {
        "articleId": 1,
        "imageUrl": "assets/images/shirtArticles/shirt4.jpg",
        "createDate": "2025-03-11T10:00:00Z",
        "modifiedDate": "2025-03-11T10:00:00Z",
        "isDelete": false,
        "isActive": true,
        "subArticleId": 1004,
        "subArticleName": "Shirt4"
      },
      {
        "articleId": 1,
        "imageUrl": "assets/images/shirtArticles/shirt5.jpg",
        "createDate": "2025-03-11T10:00:00Z",
        "modifiedDate": "2025-03-11T10:00:00Z",
        "isDelete": false,
        "isActive": true,
        "subArticleId": 1005,
        "subArticleName": "Shirt5"
      }
    ]
  }
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

  getFabricMasterData(){
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

  colorClassificationMaster(){
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
