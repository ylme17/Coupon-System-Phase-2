import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Customer } from '../Common/Customer';

@Injectable({
  providedIn: 'root'
})
export class SharedCustomerDataService {

  //provide Http for server requests
  constructor(private _http:Http) { }

  addCustomer(customer : Customer){
    return this._http.post("http://localhost:8080/admin/customer", customer);
  }

  deleteCustomer(id : number){
    return this._http.delete("http://localhost:8080/admin/customer/"+id);
  }

  getAllCustomers(){
    return this._http.get("http://localhost:8080/admin/customer");
  }

  updateCustomer(customer : Customer){
    return this._http.put("http://localhost:8080/admin/customer/"+customer.id, customer)
  }

  getCustomer(id : number){
    return this._http.get("http://localhost:8080/admin/customer/"+id);
  }

}
