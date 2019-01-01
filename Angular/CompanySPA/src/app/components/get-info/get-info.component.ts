import { Component, OnInit } from '@angular/core';
import { SharedDataService } from '../../services/shared-data.service';
import { Company } from '../../Common/Company';
import swal from 'sweetalert2';

@Component({
  selector: 'app-get-info',
  templateUrl: './get-info.component.html',
  styleUrls: ['./get-info.component.css']
})
export class GetInfoComponent implements OnInit {

  companyGet : Company = new Company(0, "", "", "");

  //provide SharedDataService for service
  constructor(private _sharedDataService:SharedDataService) {
  }

  //load company info
  ngOnInit() {
    this.getCompany();
  }

  //get company details
  getCompany(){
    this._sharedDataService.getInfo().
    subscribe(
      (resp)=>
      {
        this.companyGet = resp.json();
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

}
