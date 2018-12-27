import { Component, OnInit } from '@angular/core';
import { SharedDataService } from '../../services/shared-data.service';
import { Coupon } from '../../common/Coupon';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-get-all-coupons-by-type',
  templateUrl: './get-all-coupons-by-type.component.html',
  styleUrls: ['./get-all-coupons-by-type.component.css']
})
export class GetAllCouponsByTypeComponent implements OnInit {

  public coupon : Coupon;
  public searchString : string;
  public couponsByType : Coupon[]
  public purchasedCoupons : Coupon[]
  public couponsGet : Coupon = new Coupon(null, "", null, null, null, "", "", null, "", null);
  public couponOpen : Coupon = new Coupon(null, "", null, null, null, "", "", null, "", null);
  types : string[] = ["CAMPING", "ELECTRICITY", "FOOD", "HEALTH", "RESTURANTS", "SPORTS", "TRAVELLING"];
  tempType : string;

  //provide SharedDataService for service and Router for routing to another components
  //and ActivatedRoute to get type from URL
  constructor(private _sharedDataService:SharedDataService, private _router:Router, private _route:ActivatedRoute) {
  }

  //load coupons by type
  ngOnInit() {
    this.getCouponsByType();
  }

  //get coupons by type after pull the type from URL
  getCouponsByType(){
    this._route.params.
    subscribe(
      params=>{
        this._sharedDataService.getAllByType(params["type"]).
        subscribe(
          (resp)=>
          {
            this.tempType = params["type"];
            this.couponsByType = resp.json();
            this.getPurchasedCoupons();
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
    )
  }

  //get purchased coupons
  getPurchasedCoupons(){
    this._sharedDataService.getPurchasedCoupons().
    subscribe(
      (resp)=>
      {
        this.purchasedCoupons = resp.json();
        this.compareCoupons();
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

  //compare between allCoupons array and purchasedCoupon array and check if coupon already purchased
  compareCoupons(){
    if(this.couponsByType.length > 0){
      this.couponsByType.forEach(
        (coupon)=>{
          let exist = this.purchasedCoupons.find(
            ({id}) => coupon.id == id
          )
          if(exist){
            coupon.purchased = true;
          } else {
            coupon.purchased = false;
          }
        }
      )
    }
  }

  //route back to all coupons
  routeToAll(){
    this._router.navigate([''])
  }

  //get coupons by type when we choose a type
  getCoupons(){
    this._sharedDataService.getAllByType(this.couponsGet.type).
    subscribe(
      (resp)=>
      {
        this.tempType = this.couponsGet.type;
        this.couponsByType = resp.json();
        this.getPurchasedCoupons();
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

  //get coupon when popup window open
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

  //buy coupon
  buyCoupon(coupon : Coupon){
    swal({
      title: 'Do you want to buy coupon?',
      type: 'question',
      showCancelButton: true,
      confirmButtonColor: 'green',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this._sharedDataService.buyCoupon(coupon).
        subscribe(
          (resp) =>
          {
            swal({
              title: 'Purchased!',
              type: 'success',
              showConfirmButton: false,
              timer: 1500
            })
            this._sharedDataService.getAllByType(this.tempType).
            subscribe(
              (resp)=>
              {
                this.couponsByType = resp.json();
                this.getPurchasedCoupons();
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

}
