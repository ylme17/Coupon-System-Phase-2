import { Component, OnInit } from '@angular/core';
import { SharedDataService } from '../../services/shared-data.service';
import { Coupon } from '../../common/Coupon';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-get-purchased-coupons',
  templateUrl: './get-purchased-coupons.component.html',
  styleUrls: ['./get-purchased-coupons.component.css']
})
export class GetPurchasedCouponsComponent implements OnInit {
  
  public coupon:Coupon;
  public searchString:string;
  public couponOpen : Coupon = new Coupon(null, "", null, null, null, "", "", null, "", null);
  public purchasedCoupons : Coupon[]

  //provide SharedDataService for service and Router for routing to another components
  constructor(private _sharedDataService:SharedDataService, private _router:Router) { 
  }

  //load purchased coupons
  ngOnInit() {
    this.getPurchasedCoupons();
  }

  //get purchased coupons
  getPurchasedCoupons(){
    this._sharedDataService.getPurchasedCoupons().
    subscribe(
      (resp)=>
      {
        this.purchasedCoupons = resp.json();
      },
      (err) =>
      {
        if(err.status == 403) {
          window.location.href = this._sharedDataService.loginPageURL;
        }else{
          swal({
            type: 'error',
            title: 'Oops...',
            text: err._body
          })
        }
      }
    )
  }

  //route to coupons by price component
  routeToByPrice(){
    this._router.navigate(['getcouponsbyprice'])
  }

  //route to coupons by type component
  routeToByType(){
    this._router.navigate(['getcouponsbytype'])
  }

  //get the coupon info when popup window open
  openCoupon(id : number){
    this._sharedDataService.getCoupon(id).
    subscribe(
      (resp)=>
      {
        this.couponOpen = resp.json();
      },
      (err) =>
      {
        if(err.status == 403) {
          window.location.href = this._sharedDataService.loginPageURL;
        }else{
          swal({
            type: 'error',
            title: 'Oops...',
            text: err._body
          })
        }
      }
    )
  }

}
