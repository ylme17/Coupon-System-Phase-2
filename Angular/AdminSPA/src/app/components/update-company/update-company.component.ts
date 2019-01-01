import { Component, OnInit } from '@angular/core';
import { SharedCompanyDataService } from '../../services/shared-company-data.service';
import { Company } from '../../Common/Company';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-update-company',
  templateUrl: './update-company.component.html',
  styleUrls: ['./update-company.component.css']
})
export class UpdateCompanyComponent implements OnInit {

  public companyUpdate : Company = new Company(0, "", "", "");
  myForm: FormGroup;

  //in the constructor we provide SharedCompanyDataService for service and Router for routing to another components
  //ActivatedRoute to contain the company id that sent from allCompaniesComponent and FormBuilder for form validation
  constructor(private _sharedDataService:SharedCompanyDataService,
    private _router:Router, private _route:ActivatedRoute, private _formBuilder:FormBuilder) { 
  }

  //load the company by id from DB and inject it to the form
  //load form validation
  ngOnInit() {
    this.getCompanyByIdParam();
    this.formValidation();
  }

  //get the company by id that gets in URL
  getCompanyByIdParam(){
    this._route.params.
    subscribe(params=>{
      this._sharedDataService.getCompany(params["id"]).
      subscribe(
        (resp)=>{
          this.companyUpdate = resp.json();
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
    })
  }

  //form validation conditions
  formValidation(){
    this.myForm = this._formBuilder.group({
      id: [],
      name: [],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(8)]]
    });
  }

  //route back to all companies component
  backToCompanies(){
    this._router.navigate(['getallcompanies'])
  }

  //send the update request and route back to all companies
  updateCompany(){
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
        this._sharedDataService.updateCompany(this.companyUpdate).
        subscribe(
          (resp) =>
          {
            swal({
              title: 'Updated!',
              type: 'success',
              showConfirmButton: false,
              timer: 1500
            })
            this.companyUpdate = new Company(0, "", "", "");
            this._router.navigate(['getallcompanies'])
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

}
