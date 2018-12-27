import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateCouponComponent } from './components/create-coupon/create-coupon.component';
import { GetAllCouponsComponent } from './components/get-all-coupons/get-all-coupons.component';
import { GetInfoComponent } from './components/get-info/get-info.component';
import { UpdateCouponComponent } from './components/update-coupon/update-coupon.component';
import { GetCouponsByDateComponent } from './components/get-coupons-by-date/get-coupons-by-date.component';
import { GetCouponsByPriceComponent } from './components/get-coupons-by-price/get-coupons-by-price.component';
import { GetCouponsByTypeComponent } from './components/get-coupons-by-type/get-coupons-by-type.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'createcoupon',
    component: CreateCouponComponent
  },
  {
    path: 'getallcoupons',
    component: GetAllCouponsComponent
  },
  {
    path: 'getinfo',
    component: GetInfoComponent
  },
  {
    path: 'updatecoupon/:id',
    component: UpdateCouponComponent
  },
  {
    path: 'getcouponsbydate',
    component: GetCouponsByDateComponent
  },
  {
    path: 'getcouponsbyprice',
    component: GetCouponsByPriceComponent
  },
  {
    path: 'getcouponsbytype',
    component: GetCouponsByTypeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
