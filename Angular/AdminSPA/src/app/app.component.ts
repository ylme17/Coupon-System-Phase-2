import { Component } from '@angular/core';
import { SharedCompanyDataService } from './services/shared-company-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CouponSystem';

  request : Request
  response : Response

  //provide SharedCompanyDataService for service
  constructor(private _sharedCompanyDataService:SharedCompanyDataService) {  }

  ngOnInit(){
  }

  //log out method, send the client to login page
  logOut(){
    this._sharedCompanyDataService.logOut(this.request, this.response).
    subscribe(
      (resp)=>
      {
        window.location.href = 'http://localhost:8080/login.html';
      }
    )
  }

}
