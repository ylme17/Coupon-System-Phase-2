import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CreateCompanyComponent } from './components/create-company/create-company.component';
import { HttpModule } from '@angular/http';
import { GetAllCompaniesComponent } from './components/get-all-companies/get-all-companies.component';
import { CreateCustomerComponent } from './components/create-customer/create-customer.component';
import { GetAllCustomersComponent } from './components/get-all-customers/get-all-customers.component';
import { HomeComponent } from './components/home/home.component';
import { SharedCompanyDataService } from './services/shared-company-data.service';
import { SharedCustomerDataService } from './services/shared-customer-data.service';
import { UpdateCompanyComponent } from './components/update-company/update-company.component';
import { UpdateCustomerComponent } from './components/update-customer/update-customer.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { FilterPipe } from './pipes/filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    CreateCompanyComponent,
    GetAllCompaniesComponent,
    CreateCustomerComponent,
    GetAllCustomersComponent,
    HomeComponent,
    UpdateCompanyComponent,
    UpdateCustomerComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    HttpModule
  ],
  providers: [SharedCompanyDataService, 
      SharedCustomerDataService, {provide: LocationStrategy, useClass:HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
