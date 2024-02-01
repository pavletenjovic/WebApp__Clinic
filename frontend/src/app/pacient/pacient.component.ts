import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { DeniedUser } from '../models/deniedUser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pacient',
  templateUrl: './pacient.component.html',
  styleUrls: ['./pacient.component.css']
})
export class PacientComponent implements OnInit{

  constructor(private service: UserService, private router: Router){}

  ngOnInit(): void {
    let tip = localStorage.getItem('type');
    if(tip=='pacient'){
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
    this.fnBool = false;
    this.lnBool = false;
    this.emailBool = false;
    this.passBool = false;
    this.adrBool = false;
    this.urlBool = false;
    this.telBool = false;
    this.tipKorisnika=localStorage.getItem('type');
  }

  tipKorisnika: string;

  meLogged: boolean;
  username: string;
  firstname: string;
  lastname: string;
  password: string;
  email: string;
  adress: string;
  telephone: string;
  url: string;
  fnBool: boolean;
  lnBool: boolean;
  passBool: boolean;
  emailBool: boolean;
  adrBool: boolean;
  urlBool: boolean;
  telBool: boolean;
  firstnameChange: string;
  lastnameChange: string;
  adressChange: string;
  urlChange: string|null|ArrayBuffer = null;
  telephoneChange: string;
  emailChange: string;
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

  testEmail(){
    if(this.emailChange){
      this.badEmail='';
      for(let user of this.allEmails){
        if(user == this.emailChange){
          this.badEmail='Korisnik vec u upotrebi';
        }
      }
      if(!(/^[a-zA-Z]\w*@[a-z]+\.[a-z]{2,3}$/).test(this.emailChange)){
        this.badEmail='Email u pogresnom formatu';
      }
      
    }
    else{
      this.badEmail='';
    }
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

  updateInfo(){
    let newPassword ='', newAdress ='', newTelephone ='', newEmail ='' , newFirstname ='',  newLastname ='';
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
    this.service.updateInfo(this.username, newPassword, newFirstname, newLastname, newEmail, newTelephone, newAdress, newUrl).subscribe();
    if(newPassword){
      this.router.navigate(['/welcome']);
    }
    else{
      window.location.reload();
    }
  }
}
