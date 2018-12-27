import { Component, OnInit } from '@angular/core';
import { Company } from '../../Common/Company';
import { SharedCompanyDataService } from '../../services/shared-company-data.service';
import swal from 'sweetalert2';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-create-company',
  templateUrl: './create-company.component.html',
  styleUrls: ['./create-company.component.css']
})
export class CreateCompanyComponent implements OnInit {

  companyAdd : Company = new Company(0, "", "", "");
  companyAdded : Company = new Company(0, "", "", "");
  showTable = false;
  myForm: FormGroup;
  
  //in the constructor we provide SharedCompanyDataService for service and FormBuilder for form validation
  constructor(private _sharedDataService:SharedCompanyDataService, private _formBuilder:FormBuilder) {  }

  //initialize form validation
  ngOnInit() {
    this.formValidation();
  }

  //form validation conditions
  formValidation(){
    this.myForm = this._formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(8)]]
    });
  }

  //add company to DB
  addCompany(){
    this._sharedDataService.addCompany(this.companyAdd).
    subscribe(
      (resp) =>
      {
        this.companyAdded=resp.json();
        this.showTable = true;
        this.companyAdd = new Company(0, "", "", "");
        swal({
          type: 'success',
          title: 'Company created',
          showConfirmButton: false,
          timer: 1500
        })
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

}
