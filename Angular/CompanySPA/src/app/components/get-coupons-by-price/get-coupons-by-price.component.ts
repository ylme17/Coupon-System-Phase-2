import { Component, OnInit } from '@angular/core';
import { SharedDataService } from '../../services/shared-data.service';
import { Coupon } from '../../Common/Coupon';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-get-coupons-by-price',
  templateUrl: './get-coupons-by-price.component.html',
  styleUrls: ['./get-coupons-by-price.component.css']
})
export class GetCouponsByPriceComponent implements OnInit {

  public coupon:Coupon;
  public searchString:string;
  public couponsByPrice : Coupon[]
  public couponsGet : Coupon = new Coupon(null, "", null, null, null, "", "", null, "");
  showCouponsByPrice = false;
  myForm: FormGroup;
  tempPrice : number;

  //in the constructor we provide SharedDataService for service and Router for routing to another components
  //and FormBuilder for form validation
  constructor(private _sharedDataService:SharedDataService, private _router:Router, private _formBuilder:FormBuilder) {
  }

  //initialize form validation
  ngOnInit() {
    this.formValidation();
  }

  //form validation condition
  formValidation(){
    this.myForm = this._formBuilder.group({
      price: ['', [Validators.required, Validators.min(1)]]
    });
  }

  //method to get coupons by price, the method won't work if form is invalid
  getCouponsByPrice(){
    if(this.myForm.invalid){
      return;
    }
    this._sharedDataService.getCouponsByPrice(this.couponsGet.price).
    subscribe(
      (resp)=>
      {
        this.tempPrice = this.couponsGet.price;
        this.couponsByPrice = resp.json();
        this.couponsGet = new Coupon(null, "", null, null, null, "", "", null, "");
        this.showCouponsByPrice = true;
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
            this._sharedDataService.getCouponsByPrice(this.tempPrice).
            subscribe(
              (resp)=>
              {
                this.couponsByPrice = resp.json();
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

  //route to getCouponsByDateComponent
  routeToByDate(){
    this._router.navigate(['getcouponsbydate'])
  }

  //route to getCouponsByTypeComponent
  routeToByType(){
    this._router.navigate(['getcouponsbytype'])
  }

}
