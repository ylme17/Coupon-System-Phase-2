import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Company } from '../Common/Company';

@Injectable({
  providedIn: 'root'
})
export class SharedCompanyDataService {

  //provide Http for server requests
  constructor(private _http:Http) { }

  addCompany(company : Company){
    return this._http.post("http://localhost:8080/admin/company", company);
  }

  getAllCompanies(){
    return this._http.get("http://localhost:8080/admin/company");
  }

  deleteCompany(id : number){
    return this._http.delete("http://localhost:8080/admin/company/"+id);
  }

  updateCompany(company : Company){
    return this._http.put("http://localhost:8080/admin/company/" + company.id, company);
  }

  getCompany(id : number){
    return this._http.get("http://localhost:8080/admin/company/"+id);
  }

  logOut(request, response){
    return this._http.post("http://localhost:8080/logout", request, response)
  }

}
