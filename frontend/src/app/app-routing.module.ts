import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { RegisterComponent } from './register/register.component';
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

const routes: Routes = [
  {path:'', component:HomepageComponent},
  {path:'pacient', component: PacientComponent},
  {path:'doctor', component: DoctorComponent},
  {path:'manager', component: ManagerComponent},
  {path:'register', component: RegisterComponent},
  {path: 'welcome', component: WelcomeComponent},
  {path: 'requests', component: RequestsComponent},
  {path: 'addadoctor', component: AddadoctorComponent},
  {path: 'alldoctors', component: AlldoctorsComponent},
  {path: 'chosendoctor', component: ChosendoctorComponent},
  {path: 'other', component: OtherComponent},
  {path: 'dbupdate', component: DbupdateComponent},
  {path: 'pacientappointment', component: PacientappointmentComponent},
  {path: 'doctorappointment', component: DoctorappointmentComponent},
  {path: 'karton', component:KartonComponent},
  {path: 'managerlogin', component: ManagerloginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
