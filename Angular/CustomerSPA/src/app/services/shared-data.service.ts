import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Coupon } from '../common/Coupon';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  coupons : Coupon[]

  //provide SharedDataService for service
  constructor(private _http:Http) { }

  buyCoupon(coupon : Coupon){
    return this._http.post("http://localhost:8080/customer/coupon", coupon);
  }

  getPurchasedCoupons(){
    return this._http.get("http://localhost:8080/customer/coupon/purchased");
  }

  getPurchasedByType(type : string){
    return this._http.get("http://localhost:8080/customer/coupon/purchased/type="+type);
  }

  getPurchasedByPrice(price : number){
    return this._http.get("http://localhost:8080/customer/coupon/purchased/price="+price);
  }

  getInfo(){
    return this._http.get("http://localhost:8080/customer/info");
  }

  getAllCoupons(){
    return this._http.get("http://localhost:8080/customer/coupon/all");
  }

  getAllByType(type : string){
    return this._http.get("http://localhost:8080/customer/coupon/all/type="+type);
  }

  getCoupon(id : number){
    return this._http.get("http://localhost:8080/customer/coupon/"+id);
  }

  logOut(request, response){
    return this._http.post("http://localhost:8080/logout", request, response);
  }

}
