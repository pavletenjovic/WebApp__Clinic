import * as express from 'express'
import User from '../models/user'
import pendingUser from '../models/pendingUser';
import deniedUser from '../models/deniedUser';
import specialization from '../models/specialization';
import appointment from '../models/appointment';
import pendingAppointment from '../models/pendingAppointment';
import pregled from '../models/pregled';
import report from '../models/report';
import { ExecOptions } from 'child_process';

export class UserController{
    

    login = (req: express.Request, res: express.Response)=>{
        let username= req.body.username;
        let password = req.body.password;
        User.findOne({'username': username, 'password': password}, (err, user)=>{
            if(err) console.log("nema korisnika");
            else res.json(user)
        })
    }

    getAllUsers = (req: express.Request, res: express.Response)=>{
        User.find({}, (err,user)=>{
            if(err) console.log('prazna lista');
            else res.json(user)
        })
    }

    getAllDeniedUsers = (req: express.Request, res: express.Response)=>{
        deniedUser.find({}, (err,user)=>{
            if(err) console.log('prazna lista');
            else res.json(user)
        })
    }

    register = (req: express.Request, res: express.Response)=>{
        let user = new pendingUser({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            telephone: req.body.telephone,
            adress: req.body.adress,
            type: "pacient",
            url: req.body.url
        });
        user.save((err, res)=>{
            if(err) {
                console.log(err);
            }
        });
    }

    registerDoctor = (req: express.Request, res: express.Response)=>{
        let user = new User({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            telephone: req.body.telephone,
            adress: req.body.adress,
            type: "doctor",
            url: req.body.url,
            specialization: req.body.spec,
            branch: req.body.branch,
            licence: req.body.licence
        });
        user.save((err, res)=>{
            if(err) {
                console.log(err);
            }
        });
    }

    getAllDoctors = (req: express.Request, res: express.Response)=>{
        User.find({'type': 'doctor'}, (err,doctors)=>{
            if(err) console.log('nema doktora');
            else res.json(doctors);
        })
    }

    deleteUser = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        User.findOneAndDelete({'username': username}, (err, res)=>{
            if(err) console.log('nije uspeo da obrise');
            else res.status(200).json({"message": "ok"});
        })
    }

    getAllPendingUsers = (req: express.Request, res: express.Response)=>{
        pendingUser.find({}, (err, users)=>{
            if(err) console.log(err);
            else res.json(users);
        })
    }

    acceptUser = (req: express.Request, res: express.Response)=>{
        let user = new User({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            telephone: req.body.telephone,
            adress: req.body.adress,
            type: "pacient",
            url: req.body.url
        });
        let username = req.body.username;
        pendingUser.findOneAndDelete({'username': username}, (err, res)=>{
            if(err) console.log('nije uspeo da obrise');
        })
        user.save((err, res)=>{
            if(err) {
                console.log(err);
            }
        });
    }

    denyUser = (req: express.Request, res: express.Response)=>{
        let user = new deniedUser({
            username: req.body.username,
            email: req.body.email
        });
        let username = req.body.username;
        pendingUser.findOneAndDelete({'username': username}, (err, res)=>{
            if(err) console.log('nije uspeo da obrise');
        })
        user.save((err, res)=>{
            if(err) {
                console.log(err);
            }
        });
    }

    getAllSpecializations = (req: express.Request, res: express.Response)=>{
        specialization.find({}, (err,spec)=>{
            if(err) console.log(err);
            else res.json(spec);
        })
    }

    getAppointmentsBySpecialization = (req: express.Request, res: express.Response)=>{
        
        let spec = req.body.specialization;
        appointment.find({'specialization': spec}, (err,spec)=>{
            if(err) console.log(err);
            else res.json(spec);
        })
    }
    getAppointmentsByName = (req: express.Request, res: express.Response)=>{
        let name = req.body.name;
        let username = req.body.username;
        User.collection.updateOne({'username': username}, {$set:{'appointments': name}});
    }

    getUserByUsername = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        User.findOne({'username': username}, (err,user)=>{
            if(err) console.log('nema korisnika');
            else res.json(user);

        })
    }

    updateInfo = (req: express.Request, res: express.Response)=>{
        let firstname= req.body.firstname;
        let lastname =req.body.lastname;
        let username = req.body.username;
        let password= req.body.password;
        let email= req.body.email;
        let telephone= req.body.telephone;
        let adress= req.body.adress;
        let url = req.body.url;
        if(firstname!=''){
            User.collection.updateOne({'username': username}, {$set: {'firstname': firstname}})
        }
        if(lastname!=''){
            User.collection.updateOne({'username': username}, {$set: {'lastname': lastname}})
        }
        if(password!=''){
            User.collection.updateOne({'username': username}, {$set: {'password': password}})
        }
        if(email!=''){
            User.collection.updateOne({'username': username}, {$set: {'email': email}})
        }
        if(telephone!=''){
            User.collection.updateOne({'username': username}, {$set: {'telephone': telephone}})
        }
        if(adress!=''){
            User.collection.updateOne({'username': username}, {$set: {'adress': adress}})
        }
        if(url!=null){
            User.collection.updateOne({'username': username}, {$set: {'url': url}})
        }
    }

    updateInfo2 = (req: express.Request, res: express.Response)=>{
        let firstname= req.body.firstname;
        let lastname =req.body.lastname;
        let username = req.body.username;
        let password= req.body.password;
        let email= req.body.email;
        let telephone= req.body.telephone;
        let adress= req.body.adress;
        let url = req.body.url;
        let licence = req.body.licence;
        let specialization = req.body.specialization;
        if(firstname!=''){
            User.collection.updateOne({'username': username}, {$set: {'firstname': firstname}})
        }
        if(lastname!=''){
            User.collection.updateOne({'username': username}, {$set: {'lastname': lastname}})
        }
        if(password!=''){
            User.collection.updateOne({'username': username}, {$set: {'password': password}})
        }
        if(email!=''){
            User.collection.updateOne({'username': username}, {$set: {'email': email}})
        }
        if(telephone!=''){
            User.collection.updateOne({'username': username}, {$set: {'telephone': telephone}})
        }
        if(adress!=''){
            User.collection.updateOne({'username': username}, {$set: {'adress': adress}})
        }
        if(url!=null){
            User.collection.updateOne({'username': username}, {$set: {'url': url}})
        }
        if(licence!=0){
            User.collection.updateOne({'username': username}, {$set: {'licence': licence}})
        }
        if(specialization!=''){
            User.collection.updateOne({'username': username}, {$set: {'specialization': specialization}})
        }
    }

    addRequest = (req: express.Request, res: express.Response)=>{
        console.log("1");
        let name = req.body.name;
        let spec = req.body.spec;
        let price = req.body.price;
        let time = req.body.time;
        let re = new pendingAppointment({
            name: name,
            specialization: spec,
            cena: price,
            trajanje: time
        });
        re.save((err, res)=>{
            if(err) {
                console.log(err);
            }
        });
    }

    addSpecialization = (req: express.Request, res: express.Response)=>{
        let spec = req.body.spec;
        let spec2 = new specialization({
            name: spec
        });
        spec2.save((err, res)=>{
            if(err) {
                console.log(err);
            }
        });
    }

    getAllPendingAppointments = (req: express.Request, res: express.Response)=>{
        pendingAppointment.find({}, (err,spec)=>{
            if(err) console.log(err);
            else res.json(spec);
        })
    }
    getAllAppointments = (req: express.Request, res: express.Response)=>{
        appointment.find({}, (err,spec)=>{
            if(err) console.log(err);
            else res.json(spec);
        })
    }

    acceptPA = (req: express.Request, res: express.Response)=>{
        let spec = req.body.spec;
        let name = req.body.name;
        let price = req.body.cena;
        let time = req.body.trajanje;
        pendingAppointment.findOneAndDelete({'specialization': spec, 'name': name, 'cena': price, 'trajanje': time}, (err, res)=>{
            if(err) console.log('nije uspeo da obrise');
        })
        let app = new appointment({
            specialization: spec,
            name: name,
            cena: price,
            trajanje: time
        });
        app.save((err, res)=>{
            if(err) {
                console.log(err);
            }
        });
    }
    declinePA = (req: express.Request, res: express.Response)=>{
        let spec = req.body.spec;
        let name = req.body.name;
        let price = req.body.cena;
        let time = req.body.trajanje;
        
        pendingAppointment.findOneAndDelete({'specialization': spec, 'name': name, 'cena': price, 'trajanje': time}, (err, res)=>{
            if(err) console.log('nije uspeo da obrise');
        })
    }

    updatePA = (req: express.Request, res: express.Response)=>{
        let spec = req.body.spec;
        let name = req.body.name;
        let price = req.body.cena;
        let time = req.body.trajanje;
        appointment.collection.updateOne({'specialization': spec, 'name': name}, {$set: {'cena': price, 'trajanje': time}});
    }
    deletePA = (req: express.Request, res: express.Response)=>{
        let spec = req.body.spec;
        let name = req.body.name;
        appointment.collection.deleteOne({'specialization': spec, 'name': name}, (err,res)=>{
            if(err) console.log(err);
        })
    }

    addPregled = (req: express.Request, res: express.Response)=>{
        let pacient = req.body.pacient;
        let doctor = req.body.doctor;
        let cena = req.body.cena;
        let trajanje = req.body.trajanje;
        let datum = req.body.datum;
        let branch = req.body.branch;
        let name = req.body.name;

        let newPregled = new pregled({
            pacient: pacient,
            doctor: doctor,
            cena: cena,
            trajanje: trajanje,
            datum: datum,
            branch: branch,
            name: name,
            report: false
        });

        newPregled.save((err, res)=>{
            if(err) {
                console.log(err);
            }
        });
    }

    getAllPregledi = (req: express.Request, res: express.Response)=>{
        pregled.find({}, (err,spec)=>{
            if(err) console.log(err);
            else res.json(spec);
        })
    }

    getAllPreglediPacient= (req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        pregled.find({'pacient': username}, (err,spec)=>{
            if(err) console.log(err);
            else res.json(spec);
        })
    }
    getAllPreglediDoctor= (req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        pregled.find({'doctor': username}, (err,spec)=>{
            if(err) console.log(err);
            else res.json(spec);
        })
    }

    cancelPregled = (req: express.Request, res: express.Response)=>{
        let pacient = req.body.pacient;
        let doctor = req.body.doctor;
        let datum = req.body.datum;
        let name = req.body.name;
        pregled.findOneAndDelete({'pacient': pacient, 'doctor': doctor, 'datum': datum, 'name': name}, (err, res)=>{
            if(err) console.log('nije uspeo da obrise');
        })
    }

    getReportPacient = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;

        report.find({'pacient': username}, (err,spec)=>{
            if(err) console.log(err);
            else res.json(spec);
        })

    }

    addReport = async (req: express.Request, res: express.Response)=>{
        let pacient = req.body.pacient;
        let doctor = req.body.doctor;
        let specialization = req.body.specialization;
        let datumKontrole = req.body.datumKontrole;
        let datum = req.body.datum;
        let branch = req.body.branch;
        let razlog = req.body.razlog;
        let dijagnoza = req.body.dijagnoza;
        let terapija = req.body.terapija;
        let name = req.body.name;
        let bool: boolean = true;
        console.log(pacient);
        console.log(doctor);
        console.log(name);
        console.log(datum);
        console.log(bool);
        
        try {
            const updatedPregled = await pregled.findOneAndUpdate(
              {
                'pacient': pacient,
                'doctor': doctor,
                'datum': datum,
                'name': name
              },
              {
                $set: {'report': bool}
              }
            );
          
            if (updatedPregled) {
              console.log('Document updated successfully.');
            } else {
              console.log('No matching document found.');
            }
          } catch (error) {
            console.error('Error updating document:', error);
          }

        let report1 = new report({
            pacient: pacient,
            doctor: doctor,
            specialization: specialization,
            datumKontrole: datumKontrole,
            datum: datum,
            branch: branch,
            razlog: razlog,
            dijagnoza: dijagnoza,
            terapija: terapija
        });
        report1.save((err, res)=>{
            if(err) {
                console.log(err);
            }
        });
    }

    
}