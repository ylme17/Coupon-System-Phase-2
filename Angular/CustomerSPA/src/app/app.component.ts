import { Component } from '@angular/core';
import { SharedDataService } from './services/shared-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CouponSystem';

  request : Request
  response : Response

  //provide SharedDataService for service
  constructor(private _sharedDataService:SharedDataService, private _router:Router){ }

  ngOnInit(){
  }

  //log out method, send the client to login page
  logOut(){
    this._sharedDataService.logOut(this.request, this.response).
    subscribe(
      (resp)=>
      {
        window.location.href = this._sharedDataService.loginPageURL;
      }
    )
  }

}
