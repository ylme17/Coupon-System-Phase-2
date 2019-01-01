import { Component, OnInit } from '@angular/core';
import { Customer } from '../../Common/Customer';
import { SharedCustomerDataService } from '../../services/shared-customer-data.service';
import swal from 'sweetalert2';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css']
})
export class CreateCustomerComponent implements OnInit {

  customerAdd : Customer = new Customer(0, "", "");
  customerAdded : Customer = new Customer(0, "", "");
  showTable = false;
  myForm: FormGroup;

  //in the constructor we provide SharedCustomerDataService for service and FormBuilder for form validation
  constructor(private _sharedDataService:SharedCustomerDataService, private _formBuilder:FormBuilder) {  }

  //initialize form validation
  ngOnInit() {
    this.formValidation();
  }

  //form validation conditions
  formValidation(){
    this.myForm = this._formBuilder.group({
      name: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(8)]]
    });
  }

  //add customer to DB
  addCustomer(){
    this._sharedDataService.addCustomer(this.customerAdd).
    subscribe(
      (resp) =>
      {
        swal({
          type: 'success',
          title: 'Customer created',
          showConfirmButton: false,
          timer: 1500
        })
        this.customerAdded = resp.json();
        this.showTable = true;
        this.customerAdd = new Customer(0, "", "");
      },
      (err)=>
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
