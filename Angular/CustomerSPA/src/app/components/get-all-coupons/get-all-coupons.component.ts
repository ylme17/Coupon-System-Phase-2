import { Component, OnInit } from '@angular/core';
import { SharedDataService } from '../../services/shared-data.service';
import { Coupon } from '../../common/Coupon';
import { Customer } from '../../common/Customer';
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
  public allCoupons : Coupon[]
  public purchasedCoupons : Coupon[]
  public couponsGet : Coupon = new Coupon(null, "", null, null, null, "", "", null, "", null);
  public couponOpen : Coupon = new Coupon(null, "", null, null, null, "", "", null, "", null);
  public customerGet : Customer = new Customer(0, "", "");
  types : string[] = ["CAMPING", "ELECTRICITY", "FOOD", "HEALTH", "RESTURANTS", "SPORTS", "TRAVELLING"];

  //provide SharedDataService for service and Router for routing to another components
  constructor(private _sharedDataService:SharedDataService, private _router:Router) {
  }

  //load the coupons and customer info from DB
  ngOnInit() {
    this.getCoupons();
    this.getInfo();
  }

  //get all coupons
  getCoupons(){
    this._sharedDataService.getAllCoupons().
    subscribe(
      (resp)=>
      {
        this.allCoupons = resp.json();
        this.getPurchasedCoupons();
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

  //get customer info
  getInfo(){
    this._sharedDataService.getInfo().
    subscribe(
      (resp)=>
      {
        this.customerGet = resp.json();
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

  //get purchased coupons
  getPurchasedCoupons(){
    this._sharedDataService.getPurchasedCoupons().
    subscribe(
      (resp)=>
      {
        this.purchasedCoupons = resp.json();
        this.compareCoupons();
      }
    )
  }

  //compare between allCoupons array and purchasedCoupon array and check if coupon already purchased
  compareCoupons(){
    if(this.allCoupons.length > 0){
      this.allCoupons.forEach(
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
            this.getCoupons();
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

  //route to getAllCouponsByTypeComponent by choosing type and pass it value inside URL
  getCouponsByType(){
    this._router.navigate(['getallbytype', this.couponsGet.type])
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
