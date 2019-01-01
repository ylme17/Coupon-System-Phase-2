import { Component, OnInit } from '@angular/core';
import { Company } from '../../Common/Company';
import { SharedCompanyDataService } from '../../services/shared-company-data.service';
import swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-get-all-companies',
  templateUrl: './get-all-companies.component.html',
  styleUrls: ['./get-all-companies.component.css']
})
export class GetAllCompaniesComponent implements OnInit {

  public company : Company;
  public searchString : string;
  public companies : Company[]

  //in the constructor we provide SharedCompanyDataService for service and Router for routing to another components
  constructor(private _sharedDataService:SharedCompanyDataService, private _router:Router) {  }

  //load the companies list
  ngOnInit() {
    this.getCompanies();
  }

  //get companies
  getCompanies(){
    this._sharedDataService.getAllCompanies().
    subscribe(
      (resp) =>
      {
        this.companies = resp.json();
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

  //method for delete company by id
  deleteCompany(id : number){
    swal({
      title: 'Are you sure you want to delete company?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this._sharedDataService.deleteCompany(id).
        subscribe(
          (resp) =>
          {
            swal({
              title: 'Deleted!',
              text: 'Company has been deleted.',
              type: 'success',
              showConfirmButton: false,
              timer: 1500
            })
            this.getCompanies();
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

  //this method routing to updateCompanyComponent by click on company in the table and pass its id in URL
  routeToUpdate(id : number){
    this._router.navigate(['updatecompany', id])
  }

}
