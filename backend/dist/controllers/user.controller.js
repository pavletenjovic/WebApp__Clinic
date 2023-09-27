"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_1 = __importDefault(require("../models/user"));
const pendingUser_1 = __importDefault(require("../models/pendingUser"));
const deniedUser_1 = __importDefault(require("../models/deniedUser"));
const specialization_1 = __importDefault(require("../models/specialization"));
const appointment_1 = __importDefault(require("../models/appointment"));
const pendingAppointment_1 = __importDefault(require("../models/pendingAppointment"));
const pregled_1 = __importDefault(require("../models/pregled"));
const report_1 = __importDefault(require("../models/report"));
class UserController {
    constructor() {
        this.login = (req, res) => {
            let username = req.body.username;
            let password = req.body.password;
            user_1.default.findOne({ 'username': username, 'password': password }, (err, user) => {
                if (err)
                    console.log("nema korisnika");
                else
                    res.json(user);
            });
        };
        this.getAllUsers = (req, res) => {
            user_1.default.find({}, (err, user) => {
                if (err)
                    console.log('prazna lista');
                else
                    res.json(user);
            });
        };
        this.getAllDeniedUsers = (req, res) => {
            deniedUser_1.default.find({}, (err, user) => {
                if (err)
                    console.log('prazna lista');
                else
                    res.json(user);
            });
        };
        this.register = (req, res) => {
            let user = new pendingUser_1.default({
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
            user.save((err, res) => {
                if (err) {
                    console.log(err);
                }
            });
        };
        this.registerDoctor = (req, res) => {
            let user = new user_1.default({
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
            user.save((err, res) => {
                if (err) {
                    console.log(err);
                }
            });
        };
        this.getAllDoctors = (req, res) => {
            user_1.default.find({ 'type': 'doctor' }, (err, doctors) => {
                if (err)
                    console.log('nema doktora');
                else
                    res.json(doctors);
            });
        };
        this.deleteUser = (req, res) => {
            let username = req.body.username;
            user_1.default.findOneAndDelete({ 'username': username }, (err, res) => {
                if (err)
                    console.log('nije uspeo da obrise');
                else
                    res.status(200).json({ "message": "ok" });
            });
        };
        this.getAllPendingUsers = (req, res) => {
            pendingUser_1.default.find({}, (err, users) => {
                if (err)
                    console.log(err);
                else
                    res.json(users);
            });
        };
        this.acceptUser = (req, res) => {
            let user = new user_1.default({
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
            pendingUser_1.default.findOneAndDelete({ 'username': username }, (err, res) => {
                if (err)
                    console.log('nije uspeo da obrise');
            });
            user.save((err, res) => {
                if (err) {
                    console.log(err);
                }
            });
        };
        this.denyUser = (req, res) => {
            let user = new deniedUser_1.default({
                username: req.body.username,
                email: req.body.email
            });
            let username = req.body.username;
            pendingUser_1.default.findOneAndDelete({ 'username': username }, (err, res) => {
                if (err)
                    console.log('nije uspeo da obrise');
            });
            user.save((err, res) => {
                if (err) {
                    console.log(err);
                }
            });
        };
        this.getAllSpecializations = (req, res) => {
            specialization_1.default.find({}, (err, spec) => {
                if (err)
                    console.log(err);
                else
                    res.json(spec);
            });
        };
        this.getAppointmentsBySpecialization = (req, res) => {
            let spec = req.body.specialization;
            appointment_1.default.find({ 'specialization': spec }, (err, spec) => {
                if (err)
                    console.log(err);
                else
                    res.json(spec);
            });
        };
        this.getAppointmentsByName = (req, res) => {
            let name = req.body.name;
            let username = req.body.username;
            user_1.default.collection.updateOne({ 'username': username }, { $set: { 'appointments': name } });
        };
        this.getUserByUsername = (req, res) => {
            let username = req.body.username;
            user_1.default.findOne({ 'username': username }, (err, user) => {
                if (err)
                    console.log('nema korisnika');
                else
                    res.json(user);
            });
        };
        this.updateInfo = (req, res) => {
            let firstname = req.body.firstname;
            let lastname = req.body.lastname;
            let username = req.body.username;
            let password = req.body.password;
            let email = req.body.email;
            let telephone = req.body.telephone;
            let adress = req.body.adress;
            let url = req.body.url;
            if (firstname != '') {
                user_1.default.collection.updateOne({ 'username': username }, { $set: { 'firstname': firstname } });
            }
            if (lastname != '') {
                user_1.default.collection.updateOne({ 'username': username }, { $set: { 'lastname': lastname } });
            }
            if (password != '') {
                user_1.default.collection.updateOne({ 'username': username }, { $set: { 'password': password } });
            }
            if (email != '') {
                user_1.default.collection.updateOne({ 'username': username }, { $set: { 'email': email } });
            }
            if (telephone != '') {
                user_1.default.collection.updateOne({ 'username': username }, { $set: { 'telephone': telephone } });
            }
            if (adress != '') {
                user_1.default.collection.updateOne({ 'username': username }, { $set: { 'adress': adress } });
            }
            if (url != null) {
                user_1.default.collection.updateOne({ 'username': username }, { $set: { 'url': url } });
            }
        };
        this.updateInfo2 = (req, res) => {
            let firstname = req.body.firstname;
            let lastname = req.body.lastname;
            let username = req.body.username;
            let password = req.body.password;
            let email = req.body.email;
            let telephone = req.body.telephone;
            let adress = req.body.adress;
            let url = req.body.url;
            let licence = req.body.licence;
            let specialization = req.body.specialization;
            if (firstname != '') {
                user_1.default.collection.updateOne({ 'username': username }, { $set: { 'firstname': firstname } });
            }
            if (lastname != '') {
                user_1.default.collection.updateOne({ 'username': username }, { $set: { 'lastname': lastname } });
            }
            if (password != '') {
                user_1.default.collection.updateOne({ 'username': username }, { $set: { 'password': password } });
            }
            if (email != '') {
                user_1.default.collection.updateOne({ 'username': username }, { $set: { 'email': email } });
            }
            if (telephone != '') {
                user_1.default.collection.updateOne({ 'username': username }, { $set: { 'telephone': telephone } });
            }
            if (adress != '') {
                user_1.default.collection.updateOne({ 'username': username }, { $set: { 'adress': adress } });
            }
            if (url != null) {
                user_1.default.collection.updateOne({ 'username': username }, { $set: { 'url': url } });
            }
            if (licence != 0) {
                user_1.default.collection.updateOne({ 'username': username }, { $set: { 'licence': licence } });
            }
            if (specialization != '') {
                user_1.default.collection.updateOne({ 'username': username }, { $set: { 'specialization': specialization } });
            }
        };
        this.addRequest = (req, res) => {
            console.log("1");
            let name = req.body.name;
            let spec = req.body.spec;
            let price = req.body.price;
            let time = req.body.time;
            let re = new pendingAppointment_1.default({
                name: name,
                specialization: spec,
                cena: price,
                trajanje: time
            });
            re.save((err, res) => {
                if (err) {
                    console.log(err);
                }
            });
        };
        this.addSpecialization = (req, res) => {
            let spec = req.body.spec;
            let spec2 = new specialization_1.default({
                name: spec
            });
            spec2.save((err, res) => {
                if (err) {
                    console.log(err);
                }
            });
        };
        this.getAllPendingAppointments = (req, res) => {
            pendingAppointment_1.default.find({}, (err, spec) => {
                if (err)
                    console.log(err);
                else
                    res.json(spec);
            });
        };
        this.getAllAppointments = (req, res) => {
            appointment_1.default.find({}, (err, spec) => {
                if (err)
                    console.log(err);
                else
                    res.json(spec);
            });
        };
        this.acceptPA = (req, res) => {
            let spec = req.body.spec;
            let name = req.body.name;
            let price = req.body.cena;
            let time = req.body.trajanje;
            pendingAppointment_1.default.findOneAndDelete({ 'specialization': spec, 'name': name, 'cena': price, 'trajanje': time }, (err, res) => {
                if (err)
                    console.log('nije uspeo da obrise');
            });
            let app = new appointment_1.default({
                specialization: spec,
                name: name,
                cena: price,
                trajanje: time
            });
            app.save((err, res) => {
                if (err) {
                    console.log(err);
                }
            });
        };
        this.declinePA = (req, res) => {
            let spec = req.body.spec;
            let name = req.body.name;
            let price = req.body.cena;
            let time = req.body.trajanje;
            pendingAppointment_1.default.findOneAndDelete({ 'specialization': spec, 'name': name, 'cena': price, 'trajanje': time }, (err, res) => {
                if (err)
                    console.log('nije uspeo da obrise');
            });
        };
        this.updatePA = (req, res) => {
            let spec = req.body.spec;
            let name = req.body.name;
            let price = req.body.cena;
            let time = req.body.trajanje;
            appointment_1.default.collection.updateOne({ 'specialization': spec, 'name': name }, { $set: { 'cena': price, 'trajanje': time } });
        };
        this.deletePA = (req, res) => {
            let spec = req.body.spec;
            let name = req.body.name;
            appointment_1.default.collection.deleteOne({ 'specialization': spec, 'name': name }, (err, res) => {
                if (err)
                    console.log(err);
            });
        };
        this.addPregled = (req, res) => {
            let pacient = req.body.pacient;
            let doctor = req.body.doctor;
            let cena = req.body.cena;
            let trajanje = req.body.trajanje;
            let datum = req.body.datum;
            let branch = req.body.branch;
            let name = req.body.name;
            let newPregled = new pregled_1.default({
                pacient: pacient,
                doctor: doctor,
                cena: cena,
                trajanje: trajanje,
                datum: datum,
                branch: branch,
                name: name,
                report: false
            });
            newPregled.save((err, res) => {
                if (err) {
                    console.log(err);
                }
            });
        };
        this.getAllPregledi = (req, res) => {
            pregled_1.default.find({}, (err, spec) => {
                if (err)
                    console.log(err);
                else
                    res.json(spec);
            });
        };
        this.getAllPreglediPacient = (req, res) => {
            let username = req.body.username;
            pregled_1.default.find({ 'pacient': username }, (err, spec) => {
                if (err)
                    console.log(err);
                else
                    res.json(spec);
            });
        };
        this.getAllPreglediDoctor = (req, res) => {
            let username = req.body.username;
            pregled_1.default.find({ 'doctor': username }, (err, spec) => {
                if (err)
                    console.log(err);
                else
                    res.json(spec);
            });
        };
        this.cancelPregled = (req, res) => {
            let pacient = req.body.pacient;
            let doctor = req.body.doctor;
            let datum = req.body.datum;
            let name = req.body.name;
            pregled_1.default.findOneAndDelete({ 'pacient': pacient, 'doctor': doctor, 'datum': datum, 'name': name }, (err, res) => {
                if (err)
                    console.log('nije uspeo da obrise');
            });
        };
        this.getReportPacient = (req, res) => {
            let username = req.body.username;
            report_1.default.find({ 'pacient': username }, (err, spec) => {
                if (err)
                    console.log(err);
                else
                    res.json(spec);
            });
        };
        this.addReport = (req, res) => __awaiter(this, void 0, void 0, function* () {
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
            let bool = true;
            console.log(pacient);
            console.log(doctor);
            console.log(name);
            console.log(datum);
            console.log(bool);
            try {
                const updatedPregled = yield pregled_1.default.findOneAndUpdate({
                    'pacient': pacient,
                    'doctor': doctor,
                    'datum': datum,
                    'name': name
                }, {
                    $set: { 'report': bool }
                });
                if (updatedPregled) {
                    console.log('Document updated successfully.');
                }
                else {
                    console.log('No matching document found.');
                }
            }
            catch (error) {
                console.error('Error updating document:', error);
            }
            let report1 = new report_1.default({
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
            report1.save((err, res) => {
                if (err) {
                    console.log(err);
                }
            });
        });
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map