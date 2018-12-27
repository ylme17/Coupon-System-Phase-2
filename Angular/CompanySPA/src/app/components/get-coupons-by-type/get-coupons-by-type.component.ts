import { Component, OnInit } from '@angular/core';
import { SharedDataService } from '../../services/shared-data.service';
import { Coupon } from '../../Common/Coupon';
import swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-get-coupons-by-type',
  templateUrl: './get-coupons-by-type.component.html',
  styleUrls: ['./get-coupons-by-type.component.css']
})
export class GetCouponsByTypeComponent implements OnInit {
  
  types : string[] = ["CAMPING", "ELECTRICITY", "FOOD", "HEALTH", "RESTURANTS", "SPORTS", "TRAVELLING"];
  public coupon:Coupon;
  public searchString:string;
  public couponsByType : Coupon[]
  public couponsGet : Coupon = new Coupon(null, "", null, null, null, "", "", null, "");
  showCouponsByType = false;
  tempType : string

  //in the constructor we provide SharedDataService for service and Router for routing to another components
  constructor(private _sharedDataService:SharedDataService, private _router:Router) {
  }

  ngOnInit() {
  }

  //method get coupons by type
  getCouponsByType(){
    this._sharedDataService.getCouponsByType(this.couponsGet.type).
    subscribe(
      (resp) =>
      {
        this.tempType = this.couponsGet.type;
        this.couponsByType = resp.json();
        this.couponsGet = new Coupon(null, "", null, null, null, "", "", null, "");
        this.showCouponsByType = true;
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
            this._sharedDataService.getCouponsByType(this.tempType).
            subscribe(
              (resp)=>
              {
                this.couponsByType = resp.json();
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

  //route to getCouponsByDateComponent
  routeToByDate(){
    this._router.navigate(['getcouponsbydate'])
  }

  //route to getCouponsByPriceComponent
  routeToByPrice(){
    this._router.navigate(['getcouponsbyprice'])
  }

}
