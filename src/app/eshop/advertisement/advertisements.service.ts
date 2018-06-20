import { Injectable } from '@angular/core';

import { Headers, Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';

import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';

import 'rxjs/add/operator/toPromise';
import {Observable} from 'rxjs/Observable';
import { environment } from '../../../environments/environment';

@Injectable()
export class AdsService {

    private baseUrl = environment.apiurl  + '/api/skroutz';  // URL to web api
    url: string;
    constructor(private http: Http, private httpClient: HttpClient, private afs: AngularFirestore) {
    }

    search_word(keyword) {
      console.log('in search word..');
      return this.http.get(this.baseUrl + '/search/' + keyword)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
        // return this.http.get(this.baseUrl + '/search/' + term).map(res => {
        //     return res.json().map(item => {
        //         return item;
        //     });
        // });
    }

    search_firestore(keyword) {
      console.log('in search_firestore..');

      // const query = this.afs.firestore
      // .collection('advertisements')
      // .orderBy('email', 'desc')
      // .limit(50);

      // query.onSnapshot(function (snapshot) {
      //   if (!snapshot.size) {
      //     return render();
      //   }
      //   snapshot.docChanges().forEach(function(change) {
      //     if (change.type === 'added') {
      //       render(change.doc);
      //     }
      //   });
      // });


      return this.afs.firestore.collection('advertisements').get().then(querySnapshot => querySnapshot.docs
        // ({
          // querySnapshot.forEach((doc) => {
          //     console.log(`${doc.id} => ${doc.data()}`);
          // });
      );

      // return this.http.get(this.baseUrl + '/search/' + keyword)
      //       .toPromise()
      //       .then(response => response.json())
      //       .catch(this.handleError);
    }


   private handleError(error: any): Promise<any> {
     console.error('An error occurred', error); // for demo purposes only
     return Promise.reject(error.message || error);
   }
}
