import { Component, OnInit, Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { HttpClient, HttpUrlEncodingCodec } from '@angular/common/http';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AuthGuard } from '../services/auth-guard.service';
import * as moment from 'moment';

// my comment on Monday morning
@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.css'],
  providers: []
})

@Injectable()
export class TopNavComponent implements OnInit {
  title = 'PKENERGY';
  countdown = '';
  isLoggedIn = true;
  ttposition = 'below';
  username = '';


  constructor(private http: Http, private httpClient: HttpClient, private authService: AuthService
    , private router: Router, private route: ActivatedRoute, private authGuard: AuthGuard) {
    this.http = http;
    this.authService = authService;
  }




  ngOnInit(): void {
    console.log('initializing app..');

    moment.locale('el');
    this.isLoggedIn = JSON.parse(localStorage.isLoggedIn);
    if (this.isLoggedIn === true) {
      this.username = localStorage.username;
    }

    // setInterval(this.countdownToLogout(), 30); // every 5 minutes (300000)
    setInterval(() => this.countdownToLogout(), 1 * 1000);
    // setInterval(() => this.pingHeroku(this.http), 5 * 1000);

  }

    pingHeroku = function(http) {
      console.log('pinging.. pingHeroku');
      // http.get('https://kallisto-backend.herokuapp.com/');
    };

    logout = function(){
      this.authService.logout();
    };

    login() {
      this.route.paramMap.subscribe((params: ParamMap) => console.log(params.get('id')));

      console.log('current path: ' + location.pathname);
      console.log('current path: ' + encodeURIComponent(location.pathname));
      // if (location.pathname.endsWith('edit') || location.pathname.endsWith('new')) { this.isEdit = true; }

      this.router.navigate(['/login', { then: location.pathname }]);
    }

    refresh = function(){
      this.authGuard.get('/api/authenticate/refresh');
      // .then(function(resp: any) {
      //   const response = resp;
      //   console.log('response : ' + JSON.stringify(response) );
      // });
    };

  countdownToLogout = function(){

      // var datePattern = "YYYY-MM-DD HH:mm:ss Z";
      this.isLoggedIn = JSON.parse(localStorage.isLoggedIn);
      if (this.isLoggedIn === true) {
        const authExpiration = moment(localStorage.apikey_expires);
        const previousPollTime = moment();

        const pollInnterval = 5;

        const b = moment();
        const diffSec = authExpiration.diff(b, 'seconds');
        const diffMin = authExpiration.diff(b, 'minutes');
        const diffSec2 = diffSec - diffMin * 60;

        if (diffSec > 0) {
            let divider = ':', frontDiv = '';
            if (diffSec2 < 10) {frontDiv = '0' + frontDiv; }
            if (diffSec2 < 10) {divider = divider + '0'; }
            this.countdown = diffMin + divider + diffSec2;
            localStorage.isLoggedIn = true;
        }else {
          this.countdown = '';
          localStorage.isLoggedIn = false;
            // $scope.logout();
        }
        this.isLoggedIn = JSON.parse(localStorage.isLoggedIn);
      }
    };
}



