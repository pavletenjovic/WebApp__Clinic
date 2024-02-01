import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { DeniedUser } from '../models/deniedUser';
import { Specialization } from '../models/specialization';

@Component({
  selector: 'app-addadoctor',
  templateUrl: './addadoctor.component.html',
  styleUrls: ['./addadoctor.component.css']
})
export class AddadoctorComponent implements OnInit {

  constructor(private service: UserService, private router: Router) { }

  ngOnInit(): void {
    this.badUsername = '';
    this.badEmail = '';
    this.badPassword = '';
    this.badPassword2 = '';
    this.badTelephone = '';
    this.service.getAllUsers().subscribe((data: User[]) => {
      for (let d of data) {
        this.allUsername.push(d.username);
        this.allEmails.push(d.email);
      }
      this.service.getAllDeniedUsers().subscribe((users: DeniedUser[]) => {
        for (let u of users) {
          this.allUsername.push(u.username);
          this.allEmails.push(u.email);
        }
      })
    })
    this.service.getAllSpecializations().subscribe((specs: Specialization[]) => {
      for(let s of specs){
        this.allSpecializations.push(s.name);
      }
    })
    this.tipKorisnika=localStorage.getItem('type');
  }

  tipKorisnika: string;


  allUsername = [];
  allEmails = [];
  allSpecializations = [];

  firstname: string;
  specs: string;
  branch: string;
  licence: number;
  lastname: string;
  username: string;
  password: string;
  password2: string;
  telephone: string;
  adress: string;
  email: string;
  badUsername: string;
  badPassword: string;
  badPassword2: string;
  badEmail: string;
  badTelephone: string;
  cantRegister = '';
  url: string | null | ArrayBuffer = null;

  onFileSelected(files: FileList | null) {
    if (files) {
      var reader = new FileReader()
      reader.readAsDataURL(files[0])
      //reader.readAsBinaryString(files[0])
      reader.onload = (event: Event) => {
        let fileReader = event.target as FileReader
        this.url = fileReader.result;
      }
    }
  }

  register() {
    this.cantRegister = '';
    if (this.username && this.password && this.password2 && this.firstname && this.lastname && this.telephone && this.adress && this.email && this.licence && this.specs && this.branch) {
      if (this.badEmail == '' && this.badPassword == '' && this.badPassword2 == '' && this.badTelephone == '' && this.badUsername == '') {
        this.service.registerDoctor(this.username, this.password, this.firstname, this.lastname, this.email, this.telephone, this.adress, this.url, this.licence, this.specs, this.branch).subscribe(res => {
          alert(res['message']);
        });
        this.router.navigate(['manager']);
      }
    }
    else {
      this.cantRegister = 'Popunite sva polja i proverite da li su u dobrom formatu';
    }
  }

  testUsername() {
    if (this.username) {
      this.badUsername = '';
      for (let user of this.allUsername) {
        if (user == this.username) {
          this.badUsername = 'Korisnik vec u upotrebi';
        }
      }

    }
    else {
      this.badUsername = '';
    }
  }

  testEmail() {
    if (this.email) {
      this.badEmail = '';
      for (let user of this.allEmails) {
        if (user == this.email) {
          this.badEmail = 'Korisnik vec u upotrebi';
        }
      }
      if (!(/^[a-zA-Z]\w*@[a-z]+\.[a-z]{2,3}$/).test(this.email)) {
        this.badEmail = 'Email u pogresnom formatu';
      }

    }
    else {
      this.badEmail = '';
    }
  }

  testTelephone() {
    if (this.telephone) {
      if (!(/^(\+381|0)[0-9]{9,12}$/).test(this.telephone)) {
        this.badTelephone = "Invalid format";
      } else {
        this.badTelephone = '';
      }
    }
    else {
      this.badTelephone = '';
    }
  }

  testPassword() {
    // min 8, max - 16 karaktera,
    // bar jedan broj,
    // bar jedno veliko slovo,
    // bar jedan specijalni karakter(@$!%*?&_)
    if (this.password) {
      if (!(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_])[A-Za-z][A-Za-z\d@$!%*?&_]{7,13}$/).test(this.password)) {
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
    if (this.password != this.password2) {
      this.badPassword2 = "Passwords does not match";
    }
  }
}