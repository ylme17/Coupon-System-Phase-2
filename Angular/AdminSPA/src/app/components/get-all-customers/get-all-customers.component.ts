import { Component, OnInit } from '@angular/core';
import { Customer } from '../../Common/Customer';
import { SharedCustomerDataService } from '../../services/shared-customer-data.service';
import swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-get-all-customers',
  templateUrl: './get-all-customers.component.html',
  styleUrls: ['./get-all-customers.component.css']
})
export class GetAllCustomersComponent implements OnInit {

  public customer : Customer;
  public searchString : string;
  public customers : Customer[]

  //in the constructor we provide SharedCustomerDataService for service and Router for routing to another components
  constructor(private _sharedDataService:SharedCustomerDataService, private _router:Router) {  }

  //load the customers list
  ngOnInit() {
    this.getCustomers();
  }

  //get customers
  getCustomers(){
    this._sharedDataService.getAllCustomers().
    subscribe(
      (resp) =>
      {
        this.customers = resp.json()
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

  //method for delete customer by id
  deleteCustomer(id : number){
    swal({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this._sharedDataService.deleteCustomer(id).
        subscribe(
          (resp) =>
          {
            swal({
              title: 'Deleted!',
              text: 'Customer has been deleted.',
              type: 'success',
              showConfirmButton: false,
              timer: 1500
            })
            this.getCustomers();
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

  //this method routing to updateCustomerComponent by click on customer in the table and pass its id in URL
  routeToUpdate(id : number){
    this._router.navigate(['updatecustomer', id])
  }

}
