import { Component, OnInit } from '@angular/core';
import { Coupon } from '../../Common/Coupon';
import { SharedDataService } from '../../services/shared-data.service';
import swal from 'sweetalert2';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-create-coupon',
  templateUrl: './create-coupon.component.html',
  styleUrls: ['./create-coupon.component.css']
})
export class CreateCouponComponent implements OnInit {

  currentDate = new Date();
  types : string[] = ["CAMPING", "ELECTRICITY", "FOOD", "HEALTH", "RESTURANTS", "SPORTS", "TRAVELLING"];
  couponAdd : Coupon = new Coupon(null, "", null, null, null, "", "", null, "");
  couponAdded : Coupon = new Coupon(null, "", null, null, null, "", "", null, "");
  showTable = false;
  myForm: FormGroup;
  
  //in the constructor we provide SharedDataService for service and FormBuilder for form validation
  constructor(private _sharedDataService:SharedDataService, private _formBuilder:FormBuilder) { 
    //this.currentDate.setSeconds(0);
    //this.currentDate.setHours(0);
    //this.currentDate.setMinutes(0);
    //this.currentDate.setMilliseconds(0);
  }

  //initialize form validation
  ngOnInit() {
    this.formValidation();
  }

  //form validation conditions
  formValidation(){
    this.myForm = this._formBuilder.group({
      title: ['', Validators.required],
      endDate: ['', Validators.required],// this.beforeToday.bind(this)]],
      amount: ['', [Validators.required, Validators.min(1)]],
      type: ['', Validators.required],
      message: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(1)]],
      image: ['', Validators.required]
    });
  }

  /*beforeToday(control: FormControl): {[key: string]: boolean} {
    if (control.value < this.currentDate) {
      console.log(control.value)
      return {"date": true};
    }
    return null;
  }*/

  //add coupon to DB
  addCoupon(){
    this._sharedDataService.addCoupon(this.couponAdd).
    subscribe(
      (resp) =>
      {
        this.couponAdded = resp.json();
        this.showTable = true;
        this.couponAdd = new Coupon(null, "", null, null, null, "", "", null, "");
        swal({
          type: 'success',
          title: 'Coupon created',
          showConfirmButton: false,
          timer: 1500
        })
      },
      (err) =>
      {
        console.log(err)
        swal({
          type: 'error',
          title: 'Oops...',
          text: err._body
        })
      }
    )
  }

}
