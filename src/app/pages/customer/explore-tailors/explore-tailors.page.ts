import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { SharedModule } from 'src/app/sharedmodule/sharedmodule.module';

@Component({
  selector: 'app-explore-tailors',
  templateUrl: './explore-tailors.page.html',
  styleUrls: ['./explore-tailors.page.scss'],
  standalone: true,
  imports: [SharedModule]
})
export class ExploreTailorsPage implements OnInit {

  searchQuery: string = '';
  selectedFilter: string = 'all';
  filteredTailors: any;
  tailors: any;
  
  

  constructor(private router: Router, private apiService: ApiService) {

   }

  ngOnInit() {
    this.tailors = this.apiService.getTailors();
    this.filteredTailors = this.tailors;
  }
  filterTailors() {
    const query = this.searchQuery.toLowerCase();
    this.filteredTailors = this.tailors.filter((tailor:any) =>{
      return tailor.name.toLowerCase().includes(query) || tailor.specialization.toLowerCase().includes(query)
    });
  }
  applyFilter() {
    if (this.selectedFilter === 'all') {
      this.filteredTailors = this.tailors;
    } else if (this.selectedFilter === 'high-rating') {
      this.filteredTailors = this.tailors.filter((tailor:any) => { return tailor.rating >= 4.8});
    } else if (this.selectedFilter === 'experienced') {
      this.filteredTailors = this.tailors.filter((tailor:any) => {return tailor.experience >= 8});
    }
  }

  viewProfile(tailor: any) {
    this.router.navigate(['/tabs/customer/tailor-profile', tailor.id],{
      queryParams: {
        tailor: JSON.stringify(tailor)
      }
    });
  }
}
