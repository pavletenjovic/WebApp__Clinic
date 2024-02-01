import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alldoctors',
  templateUrl: './alldoctors.component.html',
  styleUrls: ['./alldoctors.component.css']
})
export class AlldoctorsComponent implements OnInit{

  constructor(private service: UserService, private router: Router){}

  ngOnInit(): void {
    this.searchName = '';
    this.searchLastname = '';
    this.searchSpecialization = '';
    this.service.getAllDoctors().subscribe((data: User[])=>{
      this.allDoctors = data;
      this.filteredDoctors = this.allDoctors;
      this.search();
    })
    this.tipKorisnika=localStorage.getItem('type');
  }

  tipKorisnika: string;

  allDoctors = [];
  filteredDoctors = [];
  searchName: string;
  searchLastname: string;
  searchSpecialization: string;
  searchBranch: string;
  selectedOption: string;

  
  sortChange(){
    if(this.selectedOption=='na'){
      this.filteredDoctors.sort((a, b) => a.firstname < b.firstname ? -1 : a.firstname > b.firstname ? 1 : 0);
    }
    else if(this.selectedOption=='nd'){
      this.filteredDoctors.sort((a, b) => a.firstname > b.firstname ? -1 : a.firstname < b.firstname ? 1 : 0);
    }
    else if(this.selectedOption=='la'){
      this.filteredDoctors.sort((a, b) => a.lastname < b.lastname ? -1 : a.lastname > b.lastname ? 1 : 0);
    }
    else if(this.selectedOption=='ld'){
      this.filteredDoctors.sort((a, b) => a.lastname > b.lastname ? -1 : a.lastname < b.lastname ? 1 : 0);
    }
    else if(this.selectedOption=='sa'){
      this.filteredDoctors.sort((a, b) => a.specialization < b.specialization ? -1 : a.specialization > b.specialization ? 1 : 0);
    }
    else if(this.selectedOption=='sd'){
      this.filteredDoctors.sort((a, b) => a.specialization > b.specialization ? -1 : a.specialization < b.specialization ? 1 : 0);
    }
    else if(this.selectedOption=='ba'){
      this.filteredDoctors.sort((a, b) => a.branch < b.branch ? -1 : a.branch > b.branch ? 1 : 0);
    }
    else if(this.selectedOption=='bd'){
      this.filteredDoctors.sort((a, b) => a.branch > b.branch ? -1 : a.branch < b.branch ? 1 : 0);
    }
  }
  search() {
    this.filteredDoctors = this.allDoctors.filter(doctor => {
      const nameMatch = this.searchName === '' || doctor.firstname.toLowerCase().includes(this.searchName.toLowerCase());
      const lastnameMatch = this.searchLastname === '' || doctor.lastname.toLowerCase().includes(this.searchLastname.toLowerCase());
      const specializationMatch = this.searchSpecialization === '' || doctor.specialization.toLowerCase().includes(this.searchSpecialization.toLowerCase());
      const branchMatch = this.searchBranch === '' || doctor.branch.toLowerCase().includes(this.searchBranch.toLowerCase());
      return nameMatch && lastnameMatch && specializationMatch && branchMatch;
    });
  }

  profilDoktora(username){
    localStorage.setItem('chosenDoctor', username);
    this.router.navigate(['/chosendoctor']);
  }
}
