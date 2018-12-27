import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Coupon } from '../Common/Coupon';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  //provide Http for server requests
  constructor(private _http:Http) { }

  addCoupon(coupon : Coupon){
    return this._http.post("http://localhost:8080/company/coupon", coupon);
  }

  deleteCoupon(id : number){
    return this._http.delete("http://localhost:8080/company/coupon/"+id);
  }

  getAllCoupons(){
    return this._http.get("http://localhost:8080/company/coupon");
  }

  updateCoupon(coupon : Coupon){
    return this._http.put("http://localhost:8080/company/coupon/"+coupon.id, coupon);
  }

  getCoupon(id : number){
    return this._http.get("http://localhost:8080/company/coupon/"+id);
  }

  getCouponsByType(type : string){
    return this._http.get("http://localhost:8080/company/coupon/search/type="+type);
  }

  getCouponsByPrice(price : number){
    return this._http.get("http://localhost:8080/company/coupon/search/price="+price);
  }

  getCouponsByDate(date : Date){
    return this._http.get("http://localhost:8080/company/coupon/search/date="+date);
  }

  getInfo(){
    return this._http.get("http://localhost:8080/company/info");
  }

  logOut(request, response){
    return this._http.post("http://localhost:8080/logout", request, response);
  }

}
