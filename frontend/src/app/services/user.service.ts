import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  login(username, password){
    const data={
      username: username,
      password: password
    }
    return this.http.post('http://localhost:4000/users/login', data);
  }

  getAllUsers(){
    return this.http.get('http://localhost:4000/users/getAllUsers');
  }

  register(username, password, firstname, lastname, email, adress, telephone, url){
    const data = {
      username: username,
      password: password,
      firstname: firstname,
      lastname: lastname,
      email: email,
      adress: adress,
      telephone: telephone,
      url: url
    }
    return this.http.post('http://localhost:4000/users/register', data);
  }

  registerDoctor(username, password, firstname, lastname, email, adress, telephone, url, licence, spec, branch){
    const data = {
      username: username,
      password: password,
      firstname: firstname,
      lastname: lastname,
      email: email,
      adress: adress,
      telephone: telephone,
      url: url,
      licence: licence,
      spec: spec, 
      branch: branch
    }
    return this.http.post('http://localhost:4000/users/registerDoctor', data);
  }

  getAllDoctors(){
    return this.http.get('http://localhost:4000/users/getAllDoctors');
  }

  deleteUser(username){
    const data = {
      username: username
    }
    return this.http.post('http://localhost:4000/users/deleteUser', data);
  }

  getAllPendingUsers(){
    return this.http.get('http://localhost:4000/users/getAllPendingUsers');
  }

  getAllDeniedUsers(){
    return this.http.get('http://localhost:4000/users/getAllDeniedUsers');
  }

  acceptUser(username, password, firstname, lastname, email, telephone, adress, url){
    const data= {
      username: username, 
      password: password, 
      firstname: firstname, 
      lastname: lastname, 
      email: email, 
      telephone: telephone, 
      adress: adress, 
      url: url
    }
    return this.http.post('http://localhost:4000/users/acceptUser', data);
  }

  denyUser(username, email){
    const data={
      username: username,
      email: email
    }
    return this.http.post('http://localhost:4000/users/denyUser', data);
  }

  getAllSpecializations(){
    return this.http.get('http://localhost:4000/users/getAllSpecializations');
  }
  
  getUserByUsername(username){
    const data={
      username: username
    }
    return this.http.post('http://localhost:4000/users/getUserByUsername', data);
  }

  updateInfo(username, password, firstname, lastname, email, telephone, adress, url){
    const data={
      username: username,
      password: password,
      firstname: firstname,
      lastname: lastname,
      email: email,
      telephone: telephone,
      adress: adress,
      url: url
    }
    return this.http.post('http://localhost:4000/users/updateInfo', data);
  }
  updateInfo2(username, password, firstname, lastname, email, telephone, adress, url, licence, specialization){
    const data={
      username: username,
      password: password,
      firstname: firstname,
      lastname: lastname,
      email: email,
      telephone: telephone,
      adress: adress,
      url: url,
      licence: licence,
      specialization: specialization
    }
    return this.http.post('http://localhost:4000/users/updateInfo2', data);
  }
  getAppointmentsBySpecialization(specialization){
    const data={
      specialization: specialization
    }
    return this.http.post('http://localhost:4000/users/getAppointmentsBySpecialization', data);
  }
  
  getAppointmentsByName(specialization, name, username){
    const data={
      specialization: specialization,
      name: name,
      username: username
    }
    return this.http.post('http://localhost:4000/users/getAppointmentsByName', data);
  }

  addRequest(specialization, name, price, time){
    const data={
      spec: specialization,
      name: name,
      price: price,
      time: time
    }
    return this.http.post('http://localhost:4000/users/addRequest', data);
  }

  addSpecialization(spec){
    const data={
      spec: spec
    }
    return this.http.post('http://localhost:4000/users/addSpecialization', data);
  
  }
  getAllPendingAppointments(){
    return this.http.get('http://localhost:4000/users/getAllPendingAppointments');
  }
  
  getAllAppointments(){
    return this.http.get('http://localhost:4000/users/getAllAppointments');
  }
  getAllPregledi(){
    return this.http.get('http://localhost:4000/users/getAllPregledi');
  }

  declinePA(spec, name, cena, trajanje){
    const data={
      spec: spec,
      name: name,
      cena: cena,
      trajanje: trajanje
    }
    return this.http.post('http://localhost:4000/users/declinePA', data);
  }
  acceptPA(spec, name, cena, trajanje){
    const data={
      spec: spec,
      name: name,
      cena: cena,
      trajanje: trajanje
    }
    return this.http.post('http://localhost:4000/users/acceptPA', data);
  }
  updatePA(spec, name, cena, trajanje){
    const data={
      spec: spec,
      name: name,
      cena: cena,
      trajanje: trajanje
    }
    return this.http.post('http://localhost:4000/users/updatePA', data);
  }
  deletePA(spec, name){
    const data={
      spec: spec,
      name: name
    }
    return this.http.post('http://localhost:4000/users/deletePA', data);
  }

  addPregled(pacient, doctor,name, cena, trajanje, datum, branch){
    const data={
      pacient: pacient,
      doctor: doctor,
      cena: cena,
      name: name,
      trajanje: trajanje,
      datum: datum,
      branch: branch
    }
    return this.http.post('http://localhost:4000/users/addPregled', data);
  }

  getAllPreglediPacient(username){
    const data={
      username: username
    }
    return this.http.post('http://localhost:4000/users/getAllPreglediPacient', data);
  }
  getAllPreglediDoctor(username){
    const data={
      username: username
    }
    return this.http.post('http://localhost:4000/users/getAllPreglediDoctor', data);
  }
  cancelPregled(pacient, doctor, datum, name){
    const data={
      pacient: pacient,
      doctor: doctor,
      datum: datum,
      name:name
    }
    return this.http.post('http://localhost:4000/users/cancelPregled', data);
  }
  getReportPacient(username){
    const data={
      username: username
    }
    return this.http.post('http://localhost:4000/users/getReportPacient', data);
  }
  addReport(pacient, doctor, specialization, datumKontrole,datum, branch ,razlog,dijagnoza ,terapija , name){
    const data={
      pacient: pacient,
      doctor: doctor,
      specialization: specialization,
      datumKontrole: datumKontrole,
      datum: datum,
      branch: branch,
      razlog: razlog,
      dijagnoza: dijagnoza,
      terapija: terapija,
      name: name
    }
    return this.http.post('http://localhost:4000/users/addReport', data);
  }
}
