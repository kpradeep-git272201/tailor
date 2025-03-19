import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbCarousel } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'src/app/sharedmodule/sharedmodule.module';


@Component({
  selector: 'app-article',
  templateUrl: './article.page.html',
  styleUrls: ['./article.page.scss'],
  standalone: true,
   imports: [SharedModule]
})
export class ArticlePage implements OnInit {
  article: any;
  @ViewChild('carousel', { static: true }) carousel: NgbCarousel | any;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {

    this.route.queryParams.subscribe(params=>{
      if(params['article']){
        this.article=JSON.parse(params['article']);
      }
    });
  }

}
