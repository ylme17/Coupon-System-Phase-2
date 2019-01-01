import { Component, OnInit } from '@angular/core';
import { SharedDataService } from '../../services/shared-data.service';
import { Coupon } from '../../Common/Coupon';
import swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-get-coupons-by-date',
  templateUrl: './get-coupons-by-date.component.html',
  styleUrls: ['./get-coupons-by-date.component.css']
})
export class GetCouponsByDateComponent implements OnInit {

  public coupon:Coupon;
  public searchString:string;
  public couponsByDate : Coupon[]
  public couponsGet : Coupon = new Coupon(null, "", null, null, null, "", "", null, "");
  showCouponsByDate = false;
  tempStartDate : Date

  //in the constructor we provide SharedDataService for service and Router for routing to another components
  constructor(private _sharedDataService:SharedDataService, private _router:Router) {  }

  ngOnInit() {
  }

  //method get coupons by start date
  getCouponsByDate(){
    this._sharedDataService.getCouponsByDate(this.couponsGet.startDate).
    subscribe(
      (resp)=>
      {
        this.tempStartDate = this.couponsGet.startDate;
        this.couponsByDate = resp.json();
        this.couponsGet = new Coupon(null, "", null, null, null, "", "", null, "");
        this.showCouponsByDate = true;
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

  //delete coupon by id and load the coupons list again by temporary member
  deleteCoupon(id : number){
    swal({
      title: 'Are you sure you want to delete coupon?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this._sharedDataService.deleteCoupon(id).
        subscribe(
          (resp) =>
          {
            swal({
              title: 'Deleted!',
              text: 'Coupon has been deleted.',
              type: 'success',
              showConfirmButton: false,
              timer: 1500
            })
            this._sharedDataService.getCouponsByDate(this.tempStartDate).
            subscribe(
              (resp)=>
              {
                this.couponsByDate = resp.json();
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
    })
  }

  //route to updateCouponComponent by click on coupon in the table and pass its id in URL
  routeToUpdate(id : number){
    this._router.navigate(['updatecoupon', id])
  }

  //route to getAllCouponsComponent
  routeToCoupons(){
    this._router.navigate(['getallcoupons'])
  }

  //route to getCouponsByPriceComponent
  routeToByPrice(){
    this._router.navigate(['getcouponsbyprice'])
  }

  //route to getCouponsByTypeComponent
  routeToByType(){
    this._router.navigate(['getcouponsbytype'])
  }

}
