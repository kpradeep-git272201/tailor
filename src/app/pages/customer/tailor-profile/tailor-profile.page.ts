import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedModule } from 'src/app/sharedmodule/sharedmodule.module';

@Component({
  selector: 'app-tailor-profile',
  templateUrl: './tailor-profile.page.html',
  styleUrls: ['./tailor-profile.page.scss'],
  standalone: true,
  imports: [SharedModule]
})
export class TailorProfilePage implements OnInit {
  tailorId: number | undefined;
  tailor: any;

  constructor(private route: ActivatedRoute, private router: Router) { 
    this.tailorId = Number(this.route.snapshot.paramMap.get('id'));
    // this.tailor = this.tailors.find(t => t.id === this.tailorId);
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params=>{
      if(params['tailor']){
        this.tailor=JSON.parse(params['tailor']);
      }
    });

  }

  bookTailor() {
    this.router.navigate(['/tabs/customer/book-tailor'], { 
      queryParams: { id: this.tailorId } 
    });
  }

}
