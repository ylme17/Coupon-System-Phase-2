import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateCompanyComponent } from './components/create-company/create-company.component';
import { GetAllCompaniesComponent } from './components/get-all-companies/get-all-companies.component';
import { CreateCustomerComponent } from './components/create-customer/create-customer.component';
import { GetAllCustomersComponent } from './components/get-all-customers/get-all-customers.component';
import { HomeComponent } from './components/home/home.component';
import { UpdateCompanyComponent } from './components/update-company/update-company.component';
import { UpdateCustomerComponent } from './components/update-customer/update-customer.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'createcompany',
    component: CreateCompanyComponent
  },
  {
    path: 'getallcompanies',
    component: GetAllCompaniesComponent
  },
  {
    path: 'updatecompany/:id',
    component: UpdateCompanyComponent
  },
  {
    path: 'createcustomer',
    component: CreateCustomerComponent
  },
  {
    path: 'getallcustomers',
    component: GetAllCustomersComponent
  },
  {
    path: 'updatecustomer/:id',
    component: UpdateCustomerComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
