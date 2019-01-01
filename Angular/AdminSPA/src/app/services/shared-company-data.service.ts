import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Company } from '../Common/Company';

@Injectable({
  providedIn: 'root'
})
export class SharedCompanyDataService {

  adminURL = "http://localhost:8080/admin/company";
  loginPageURL = "http://localhost:8080/login.html";

  //provide Http for server requests
  constructor(private _http:Http) { }

  addCompany(company : Company){
    return this._http.post(this.adminURL, company);
  }

  getAllCompanies(){
    return this._http.get(this.adminURL);
  }

  deleteCompany(id : number){
    return this._http.delete(this.adminURL+"/"+id);
  }

  updateCompany(company : Company){
    return this._http.put(this.adminURL+"/" + company.id, company);
  }

  getCompany(id : number){
    return this._http.get(this.adminURL+"/"+id);
  }

  logOut(request, response){
    return this._http.post("http://localhost:8080/logout", request, response)
  }

}
