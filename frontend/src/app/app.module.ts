import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { PacientComponent } from './pacient/pacient.component';
import { DoctorComponent } from './doctor/doctor.component';
import { ManagerComponent } from './manager/manager.component';
import { HomepageComponent } from './homepage/homepage.component';
import { RequestsComponent } from './requests/requests.component';
import { AddadoctorComponent } from './addadoctor/addadoctor.component';
import { AlldoctorsComponent } from './alldoctors/alldoctors.component';
import { ChosendoctorComponent } from './chosendoctor/chosendoctor.component';
import { OtherComponent } from './other/other.component';
import { DbupdateComponent } from './dbupdate/dbupdate.component';
import { PacientappointmentComponent } from './pacientappointment/pacientappointment.component';
import { DoctorappointmentComponent } from './doctorappointment/doctorappointment.component';
import { KartonComponent } from './karton/karton.component';
import { ManagerloginComponent } from './managerlogin/managerlogin.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    RegisterComponent,
    PacientComponent,
    DoctorComponent,
    ManagerComponent,
    HomepageComponent,
    RequestsComponent,
    AddadoctorComponent,
    AlldoctorsComponent,
    ChosendoctorComponent,
    OtherComponent,
    DbupdateComponent,
    PacientappointmentComponent,
    DoctorappointmentComponent,
    KartonComponent,
    ManagerloginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
