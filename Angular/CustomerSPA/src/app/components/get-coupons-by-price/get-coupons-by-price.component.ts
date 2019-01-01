import { Component, OnInit } from '@angular/core';
import { SharedDataService } from '../../services/shared-data.service';
import { Coupon } from '../../common/Coupon';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-get-coupons-by-price',
  templateUrl: './get-coupons-by-price.component.html',
  styleUrls: ['./get-coupons-by-price.component.css']
})
export class GetCouponsByPriceComponent implements OnInit {

  public coupon:Coupon;
  public searchString:string;
  public couponsGet : Coupon = new Coupon(null, "", null, null, null, "", "", null, "", null);
  public couponOpen : Coupon = new Coupon(null, "", null, null, null, "", "", null, "", null);
  public couponsByPrice : Coupon[]
  showSearch = false;
  myForm: FormGroup;

  //provide SharedDataService for service and Router for routing to another components
  //and FormBuilder for form validation
  constructor(private _sharedDataService:SharedDataService, private _router:Router, private _formBuilder:FormBuilder) { }

  //load form validation
  ngOnInit() {
    this.formValidation();
  }

  //form validation conditions
  formValidation(){
    this.myForm = this._formBuilder.group({
      price: ['', [Validators.required, Validators.min(1)]]
    });
  }

  //get the coupons by price
  getCoupons(){
    if(this.myForm.invalid){
      return;
    }
    this._sharedDataService.getPurchasedByPrice(this.couponsGet.price).
    subscribe(
      (resp)=>
      {
        this.couponsByPrice = resp.json();
        this.showSearch = true;
        this.couponsGet = new Coupon(null, "", null, null, null, "", "", null, "", null);
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

  //route to all coupons component
  routeToAllCoupons(){
    this._router.navigate(['getpurchasedcoupons'])
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
