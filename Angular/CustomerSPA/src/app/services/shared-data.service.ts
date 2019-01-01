import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Coupon } from '../common/Coupon';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  customerURL = "http://localhost:8080/customer";
  loginPageURL = "http://localhost:8080/login.html";

  //provide SharedDataService for service
  constructor(private _http:Http) { }

  buyCoupon(coupon : Coupon){
    return this._http.post(this.customerURL+"/coupon", coupon);
  }

  getPurchasedCoupons(){
    return this._http.get(this.customerURL+"/coupon/purchased");
  }

  getPurchasedByType(type : string){
    return this._http.get(this.customerURL+"/coupon/purchased/type="+type);
  }

  getPurchasedByPrice(price : number){
    return this._http.get(this.customerURL+"/coupon/purchased/price="+price);
  }

  getInfo(){
    return this._http.get(this.customerURL+"/info");
  }

  getAllCoupons(){
    return this._http.get(this.customerURL+"/coupon/all");
  }

  getAllByType(type : string){
    return this._http.get(this.customerURL+"/coupon/all/type="+type);
  }

  getCoupon(id : number){
    return this._http.get(this.customerURL+"/coupon/"+id);
  }

  logOut(request, response){
    return this._http.post("http://localhost:8080/logout", request, response);
  }

}
