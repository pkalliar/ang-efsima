import { Component, OnInit } from '@angular/core';

// import {NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';
// import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormControl} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AdsService } from '../advertisements.service';
import { AdDetailComponent} from '../ad-detail.component';
import { Advertisement } from '../advertisement';



// my comment on Monday morning
@Component({
  selector: 'app-ads',
  templateUrl: './advertisements.component.html',
  styleUrls: ['./advertisements.component.css'],
  providers: [AdsService]
})
export class AdsComponent implements OnInit {
  title = 'PKENERGY';
  intViewportWidth = document.documentElement.clientWidth;
  searchResult = [];
  categories = [];
  ads: Array<Advertisement> = [];

  searchTerm: FormControl = new FormControl();

  constructor(
    private router: Router,
    private service: AdsService,
    private route: ActivatedRoute) { }

  searchContact(toSearch: String): void {
    console.log('searching for ' + toSearch);
  }

  handleKeyPress(e) {
    const key = e.keyCode || e.which;
      if (key === 13 ) {
      console.log(' enter pressed ' + this.searchTerm.value);


      }
  }

  filter() {
    // console.log('filtering with parameters: ' + JSON.stringify(this.fromTime) + JSON.stringify(this.toTime));

    // this.router.navigate(['/eshop/aggelies'], {queryParams: q});

    this.service.search_firestore(this.searchTerm.value).then(response => {
      response.forEach((doc) => {
        const ad = new Advertisement();

        ad.id = doc.id;
        ad.body = doc.get('body');
        ad.category = doc.get('category');
        ad.phone = doc.get('phone');
        ad.user_uid = doc.get('user_uid');

        this.ads.push(ad);

        console.log(doc.get('body'));
            console.log(`${doc.id} => ${JSON.stringify(doc.data)} `);
      });
      this.searchResult = response;

  });

  }

  ngOnInit(): void {
    console.log('initializing app..');

    this.filter();
  }


}


