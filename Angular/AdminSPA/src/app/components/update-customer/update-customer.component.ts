import { Component, OnInit } from '@angular/core';
import { SharedCustomerDataService } from '../../services/shared-customer-data.service';
import { Customer } from '../../Common/Customer';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-update-customer',
  templateUrl: './update-customer.component.html',
  styleUrls: ['./update-customer.component.css']
})
export class UpdateCustomerComponent implements OnInit {

  public customerUpdate : Customer = new Customer(0, "", "");
  myForm: FormGroup;

  //in the constructor we provide SharedCustomerDataService for service and Router for routing to another components
  //ActivatedRoute to contain the customer id that sent from allCustomersComponent and FormBuilder for form validation
  constructor(private _sharedDataService:SharedCustomerDataService,
    private _router:Router, private _route:ActivatedRoute, private _formBuilder:FormBuilder) {
  }

  //load the customer by id from DB and inject it to the form
  //load form validation
  ngOnInit() {
    this.getCustomerByIdParam();
    this.formValidation();
  }

  //get the customer by id that gets in URL
  getCustomerByIdParam(){
    this._route.params.
    subscribe(params=>{
      this._sharedDataService.getCustomer(params["id"]).
      subscribe(
        (resp)=>
        {
          this.customerUpdate = resp.json();
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
      name: [],
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(8)]]
    });
  }

  //route back to all customers component
  backToCustomers(){
    this._router.navigate(['getallcustomers'])
  }

  //send the update request and route back to all customers
  updateCustomer(){
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
        this._sharedDataService.updateCustomer(this.customerUpdate).
        subscribe(
          (resp) =>
          {
            swal({
              title: 'Updated!',
              type: 'success',
              showConfirmButton: false,
              timer: 1500
            })
            this.customerUpdate = new Customer(0, "", "");
            this._router.navigate(['getallcustomers'])
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
