import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GetPurchasedCouponsComponent } from './components/get-purchased-coupons/get-purchased-coupons.component';
import { GetCouponsByTypeComponent } from './components/get-coupons-by-type/get-coupons-by-type.component';
import { GetCouponsByPriceComponent } from './components/get-coupons-by-price/get-coupons-by-price.component';
import { GetInfoComponent } from './components/get-info/get-info.component';
import { GetAllCouponsComponent } from './components/get-all-coupons/get-all-coupons.component';
import { GetAllCouponsByTypeComponent } from './components/get-all-coupons-by-type/get-all-coupons-by-type.component';

const routes: Routes = [
  {
    path: '',
    component: GetAllCouponsComponent
  },
  {
    path: 'getpurchasedcoupons',
    component: GetPurchasedCouponsComponent
  },
  {
    path: 'getcouponsbytype',
    component: GetCouponsByTypeComponent
  },
  {
    path: 'getcouponsbyprice',
    component: GetCouponsByPriceComponent
  },
  {
    path: 'getinfo',
    component: GetInfoComponent
  },
  {
    path: 'getallbytype/:type',
    component: GetAllCouponsByTypeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
