import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Coupon } from '../Common/Coupon';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  companyURL = "http://localhost:8080/company";
  loginPageURL = "http://localhost:8080/login.html"

  //provide Http for server requests
  constructor(private _http:Http) { }

  addCoupon(coupon : Coupon){
    return this._http.post(this.companyURL+"/coupon", coupon);
  }

  deleteCoupon(id : number){
    return this._http.delete(this.companyURL+"/coupon/"+id);
  }

  getAllCoupons(){
    return this._http.get(this.companyURL+"/coupon");
  }

  updateCoupon(coupon : Coupon){
    return this._http.put(this.companyURL+"/coupon/"+coupon.id, coupon);
  }

  getCoupon(id : number){
    return this._http.get(this.companyURL+"/coupon/"+id);
  }

  getCouponsByType(type : string){
    return this._http.get(this.companyURL+"/coupon/search/type="+type);
  }

  getCouponsByPrice(price : number){
    return this._http.get(this.companyURL+"/coupon/search/price="+price);
  }

  getCouponsByDate(date : Date){
    return this._http.get(this.companyURL+"/coupon/search/date="+date);
  }

  getInfo(){
    return this._http.get(this.companyURL+"/info");
  }

  logOut(request, response){
    return this._http.post("http://localhost:8080/logout", request, response);
  }

}
