import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TailorService {

  constructor() { }

  getTopRatedTailor() {
    return [
      {
        tailorId: 100,
        imageUrl: "assets/images/tailors/tailor1.jpg",
        name: "Rahul Kumar",
        experience: 8,
        expertise: "Men's Suits, Blazers",
        rating: 4.7,
        distance: 2.5
      },
      {
        tailorId: 101,
        imageUrl: "assets/images/tailors/tailor2.jpg",
        name: "Priya Sharma",
        experience: 5,
        expertise: "Women's Ethnic, Bridal",
        rating: 4.8,
        distance: 3.1
      },
      {
        tailorId: 102,
        imageUrl: "assets/images/tailors/tailor3.jpg",
        name: "Amit Verma",
        experience: 10,
        expertise: "Casual & Formal Wear",
        rating: 4.9,
        distance: 1.8
      },
      {
        tailorId: 103,
        imageUrl: "assets/images/tailors/tailor1.jpg",
        name: "Neha Kapoor",
        experience: 7,
        expertise: "Designer Dresses, Western",
        rating: 4.6,
        distance: 4.2
      },
      {
        tailorId: 104,
        imageUrl: "assets/images/tailors/tailor2.jpg",
        name: "Vikram Singh",
        experience: 6,
        expertise: "Formal Shirts, Trousers",
        rating: 4.5,
        distance: 3.0
      },
      {
        tailorId: 105,
        imageUrl: "assets/images/tailors/tailor3.jpg",
        name: "Anjali Mehta",
        experience: 9,
        expertise: "Saree Blouses, Lehengas",
        rating: 4.9,
        distance: 2.0
      },
      {
        tailorId: 106,
        imageUrl: "assets/images/tailors/tailor2.jpg",
        name: "Sandeep Yadav",
        experience: 12,
        expertise: "Sherwani, Indo-Western",
        rating: 5.0,
        distance: 1.5
      },
      {
        tailorId: 107,
        imageUrl: "assets/images/tailors/tailor1.jpg",
        name: "Pooja Chauhan",
        experience: 4,
        expertise: "Kids Wear, Party Dresses",
        rating: 4.3,
        distance: 3.7
      }
    ];
  }

  
}
