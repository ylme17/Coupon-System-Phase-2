import { Component, OnInit } from '@angular/core';
import { SharedDataService } from '../../services/shared-data.service';
import { Coupon } from '../../common/Coupon';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-get-coupons-by-type',
  templateUrl: './get-coupons-by-type.component.html',
  styleUrls: ['./get-coupons-by-type.component.css']
})
export class GetCouponsByTypeComponent implements OnInit {

  public coupon:Coupon;
  public searchString:string;
  public couponsGet : Coupon = new Coupon(null, "", null, null, null, "", "", null, "", null);
  public couponOpen : Coupon = new Coupon(null, "", null, null, null, "", "", null, "", null);
  public couponsByType : Coupon[]
  showSearch = false;
  types : string[] = ["CAMPING", "ELECTRICITY", "FOOD", "HEALTH", "RESTURANTS", "SPORTS", "TRAVELLING"];

  //provide SharedDataService for service and Router for routing to another components
  constructor(private _sharedDataService:SharedDataService, private _router:Router) { }

  ngOnInit() {
  }

  //get the coupons by type
  getCoupons(){
    this._sharedDataService.getPurchasedByType(this.couponsGet.type).
    subscribe(
      (resp)=>
      {
        this.couponsByType = resp.json();
        this.showSearch = true;
        this.couponsGet = new Coupon(null, "", null, null, null, "", "", null, "", null);
      },
      (err) =>
      {
        swal({
          type: 'error',
          title: 'Oops...',
          text: err._body
        })
      }
    )
  }

  //route to all coupons component
  routeToAllCoupons(){
    this._router.navigate(['getpurchasedcoupons'])
  }

  //route to coupons by price component
  routeToByPrice(){
    this._router.navigate(['getcouponsbyprice'])
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
        swal({
          type: 'error',
          title: 'Oops...',
          text: err._body
        })
      }
    )
  }

}
