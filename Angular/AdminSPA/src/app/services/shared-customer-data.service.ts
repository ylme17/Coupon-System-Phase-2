import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Customer } from '../Common/Customer';

@Injectable({
  providedIn: 'root'
})
export class SharedCustomerDataService {
  
  adminURL = "http://localhost:8080/admin/customer";
  loginPageURL = "http://localhost:8080/login.html";

  //provide Http for server requests
  constructor(private _http:Http) { }

  addCustomer(customer : Customer){
    return this._http.post(this.adminURL, customer);
  }

  deleteCustomer(id : number){
    return this._http.delete(this.adminURL+"/"+id);
  }

  getAllCustomers(){
    return this._http.get(this.adminURL);
  }

  updateCustomer(customer : Customer){
    return this._http.put(this.adminURL+"/"+customer.id, customer)
  }

  getCustomer(id : number){
    return this._http.get(this.adminURL+"/"+id);
  }

}
