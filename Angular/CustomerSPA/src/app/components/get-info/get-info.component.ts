import { Component, OnInit } from '@angular/core';
import { SharedDataService } from '../../services/shared-data.service';
import { Customer } from '../../common/Customer';
import swal from 'sweetalert2';

@Component({
  selector: 'app-get-info',
  templateUrl: './get-info.component.html',
  styleUrls: ['./get-info.component.css']
})
export class GetInfoComponent implements OnInit {

  public customerGet : Customer = new Customer(0, "", "");

  //provide SharedDataService for service
  constructor(private _sharedData:SharedDataService) {
  }

  //load customer info
  ngOnInit() {
    this.getCustomerInfo();
  }

  //get customer info
  getCustomerInfo(){
    this._sharedData.getInfo().
    subscribe(
      (resp)=>
      {
          this.customerGet = resp.json()
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
