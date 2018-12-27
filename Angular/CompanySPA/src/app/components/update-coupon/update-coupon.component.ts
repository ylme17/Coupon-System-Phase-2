import { Component, OnInit } from '@angular/core';
import { SharedDataService } from '../../services/shared-data.service';
import { Coupon } from '../../Common/Coupon';
import swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-update-coupon',
  templateUrl: './update-coupon.component.html',
  styleUrls: ['./update-coupon.component.css']
})
export class UpdateCouponComponent implements OnInit {

  public couponUpdate : Coupon = new Coupon(null, "", null, null, null, "", "", null, "");
  myForm: FormGroup;

  //provide SharedDataService for service and Router for routing to another components
  //ActivatedRoute to contain the coupon id that sent from another components and FormBuilder for form validation
  constructor(private _sharedDataService:SharedDataService, 
    private _router:Router, private _route: ActivatedRoute, private _formBuilder:FormBuilder) {
  }

  //load the coupon by id from DB and inject it to the form
  //load form validation
  ngOnInit() {
    this.getCouponByIdParam();
    this.formValidation();    
  }

  //get the coupon by id that gets in URL
  getCouponByIdParam(){
    this._route.params.
    subscribe(params=>{
      this._sharedDataService.getCoupon(params["id"]).
      subscribe(
        (resp)=>
        {
          this.couponUpdate = resp.json();
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
    })
  }

  //form validation conditions
  formValidation(){
    this.myForm = this._formBuilder.group({
      id: [],
      title: [],
      startDate: [],
      endDate: ['', Validators.required],
      amount: [],
      type: [],
      message: [],
      price: ['', [Validators.required, Validators.min(1)]],
      image: []
    });
  }

  //route back to all coupons component
  backToCoupons(){
    this._router.navigate(['getallcoupons'])
  }

  //send the update request and route back to all coupons
  updateCoupon(){
    swal({
      title: 'Are you sure you want to update?',
      type: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this._sharedDataService.updateCoupon(this.couponUpdate).
        subscribe(
          (resp) =>
          {
            swal({
              title: 'Updated!',
              type: 'success',
              showConfirmButton: false,
              timer: 1500

            })
            this.couponUpdate = new Coupon(null, "", null, null, null, "", "", null, "");
            this._router.navigate(['getallcoupons'])
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
