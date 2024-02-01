import { Component } from '@angular/core';
import { DeniedUser } from '../models/deniedUser';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { Specialization } from '../models/specialization';
import { Appointment } from '../models/appointment';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent {

  constructor(private service: UserService, private router: Router){}

  ngOnInit(): void {
    let tip = localStorage.getItem('type');
    if(tip=='doctor'){
      this.meLogged = true;
      this.username = localStorage.getItem('user');
    }
    else{
      this.meLogged = false;
      this.username = localStorage.getItem('profilUsera');
    }
    this.service.getUserByUsername(this.username).subscribe((data: User)=>{
      this.firstname = data.firstname;
      this.lastname = data.lastname;
      this.password = data.password;
      this.email = data.email;
      this.adress = data.adress; 
      this.telephone = data.telephone;
      this.url = data.url;
      this.licence = data.licence;
      this.specialization = data.specialization; 
      this.branch = data.branch;
      this.myAppComplete = data.appointments;
      this.service.getAppointmentsBySpecialization(this.specialization).subscribe((data: Appointment[])=>{
        this.allAppointments = data;
        for(let a of this.allAppointments){
        }
      })
    })
    this.service.getAllUsers().subscribe((data: User[])=>{
      for(let d of data){
        this.allEmails.push(d.email);
      }
      this.service.getAllDeniedUsers().subscribe((users: DeniedUser[])=>{
        for(let u of users){
          this.allEmails.push(u.email);
        }
      })
    })
    this.service.getAllSpecializations().subscribe((data1: Specialization[])=>{
      this.allSpecializations = data1;
    })
    
    this.fnBool = false;
    this.lnBool = false;
    this.emailBool = false;
    this.passBool = false;
    this.adrBool = false;
    this.urlBool = false;
    this.telBool = false;
    this.licenceBool = false;
    this.specializationBool = false;
    this.tipKorisnika=localStorage.getItem('type');
  }

  tipKorisnika: string;

  meLogged: boolean;
  allSpecializations = [];
  allAppointments :Array<Appointment> = [];
  myAppointments = [];
  myAppComplete :Array<Appointment> = [];
  username: string;
  firstname: string;
  lastname: string;
  password: string;
  email: string;
  adress: string;
  telephone: string;
  url: string;
  licence: number;
  specialization: string;
  branch: string;
  fnBool: boolean;
  lnBool: boolean;
  passBool: boolean;
  emailBool: boolean;
  adrBool: boolean;
  urlBool: boolean;
  telBool: boolean;
  licenceBool: boolean;
  specializationBool: boolean
  firstnameChange: string;
  lastnameChange: string;
  adressChange: string;
  urlChange: string|null|ArrayBuffer = null;
  telephoneChange: string;
  emailChange: string;
  licenceChange: number;
  specializationChange: string;
  badEmail: string;
  badTelephone: string;
  allEmails= [];
  badPassword: string;
  badPassword2: string;
  badOldPassword: string;
  pass: string;
  pass2: string;
  oldpass: string;

  onFileSelected(files: FileList | null) {
    if (files) {
        var reader = new FileReader()
        reader.readAsDataURL(files[0])
        //reader.readAsBinaryString(files[0])
        reader.onload = (event:Event) => {
          let fileReader = event.target as FileReader
          this.urlChange = fileReader.result;
        }
    }
  }

  toggleSelection(item) {
    if (this.myAppointments.includes(item)) {
      // Item is already selected, remove it
      this.myAppointments = this.myAppointments.filter(selectedItem => selectedItem !== item);
    } else {
      // Item is not selected, add it
      this.myAppointments.push(item);

    }
  }
  addAppointments(){
    
    this.service.getAppointmentsByName(this.specialization, this.myAppointments, this.username).subscribe();
    window.location.reload();
  }

  firstnameVisible(){
    if(!this.fnBool)
      this.fnBool = true
    else
      this.fnBool = false;
  }
  lastnameVisible(){
    if(!this.lnBool)
      this.lnBool = true
    else
      this.lnBool = false;
  }
  adressVisible(){
    if(!this.adrBool)
      this.adrBool = true
    else
      this.adrBool = false;
  }
  telephoneVisible(){
    if(!this.telBool)
      this.telBool = true
    else
      this.telBool = false;
  }
  emailVisible(){
    if(!this.emailBool)
      this.emailBool = true
    else
      this.emailBool = false;
  }
  passwordVisible(){
    if(!this.passBool)
      this.passBool = true
    else
      this.passBool = false;
  }
  urlVisible(){
   if(!this.urlBool)
      this.urlBool = true
    else
      this.urlBool = false;
  }
  licenceVisible(){
    if(!this.licenceBool)
      this.licenceBool = true
    else
      this.licenceBool = false;
  }
  specializationVisible(){
    if(!this.specializationBool)
      this.specializationBool = true
    else
      this.specializationBool = false;
  }


  testTelephone(){
    if (this.telephoneChange) {
      if (!(/^(\+381|0)[0-9]{9,12}$/).test(this.telephoneChange)) {
        this.badTelephone = "Invalid format" ;
      } else {
        this.badTelephone = '';
      }
     }
    else {
      this.badTelephone = '';
    }
  }

  testPassword(){
    // min 8, max - 16 karaktera,
    // bar jedan broj,
    // bar jedno veliko slovo,
    // bar jedan specijalni karakter(@$!%*?&_)
    if (this.pass) {
      if (!(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_])[A-Za-z][A-Za-z\d@$!%*?&_]{7,13}$/).test(this.pass)){
        this.badPassword = "Invalid format";
      } else {
        this.badPassword = '';
      }
    }
    else {
      this.badPassword = '';
    }
  }

  testPassword2(){
    this.badPassword2='';
    if (this.pass != this.pass2) {
      this.badPassword2 = "Passwords does not match";
    }
  }

  testOldPassword(){
    this.badOldPassword='';
    if(this.oldpass != this.password){
      this.badOldPassword = "Netacna stara lozinka";
    }
  }

  updateInfo2(){
    let newPassword ='', newAdress ='', newTelephone ='', newEmail ='' , newFirstname ='',  newLastname ='', newLicence=0, newSpecialization='';
    let newUrl: string|null|ArrayBuffer = null;
    if(this.fnBool){
      newFirstname = this.firstnameChange;
    }
    if(this.lnBool){
      newLastname = this.lastnameChange;
    }
    if(this.emailBool && this.badEmail==''){
      newEmail = this.emailChange;
    }
    if(this.passBool && this.badPassword=='' && this.badPassword2==''){
      newPassword = this.pass;
    }
    if(this.adrBool){
      newAdress = this.adressChange;
    }
    if(this.telBool && this.badTelephone==''){
      newTelephone = this.telephoneChange;
    }
    if(this.urlBool){
      newUrl = this.urlChange;
    }
    if(this.licenceBool){
      newLicence = this.licenceChange;
    }
    if(this.specializationBool){
      newSpecialization = this.specializationChange;
    }
    this.service.updateInfo2(this.username, newPassword, newFirstname, newLastname, newEmail, newTelephone, newAdress, newUrl, newLicence, newSpecialization).subscribe();
    if(newPassword){
      this.router.navigate(['/welcome']);
    }
    else{
      window.location.reload();
    }
  }
}
