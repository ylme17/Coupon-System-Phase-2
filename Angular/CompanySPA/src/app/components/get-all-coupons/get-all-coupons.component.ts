import { Component, OnInit } from '@angular/core';
import { SharedDataService } from '../../services/shared-data.service';
import { Coupon } from '../../Common/Coupon';
import swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-get-all-coupons',
  templateUrl: './get-all-coupons.component.html',
  styleUrls: ['./get-all-coupons.component.css']
})
export class GetAllCouponsComponent implements OnInit {

  public coupon : Coupon;
  public searchString : string;
  public coupons : Coupon[]

  //provide SharedDataService for service and Router for routing to another components
  constructor(private _sharedDataService:SharedDataService, private _router:Router) {  }

  //load the coupons list
  ngOnInit() {
    this.getAllCoupons();
  }

  //get all coupons
  getAllCoupons(){
    this._sharedDataService.getAllCoupons().
    subscribe(
      (resp) =>
      {
        this.coupons = resp.json()
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

  //method for delete coupon by id
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
            this.getAllCoupons();
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

  //route to getCouponsByDateComponent
  routeToByDate(){
    this._router.navigate(['getcouponsbydate'])
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
