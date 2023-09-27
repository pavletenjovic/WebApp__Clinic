
import express from "express";
import { UserController } from "../controllers/user.controller";

const userRouter = express.Router();

userRouter.route('/login').post(
    (req, res) => new UserController().login(req, res)
)

userRouter.route('/getAllUsers').get(
    (req,res) => new UserController().getAllUsers(req, res)
)

userRouter.route('/register').post(
    (req,res) => new UserController().register(req, res)
)
userRouter.route('/registerDoctor').post(
    (req,res) => new UserController().registerDoctor(req, res)
)

userRouter.route('/getAllDoctors').get(
    (req,res) => new UserController().getAllDoctors(req, res)
)

userRouter.route('/deleteUser').post(
    (req,res) => new UserController().deleteUser(req,res)
)

userRouter.route('/getAllPendingUsers').get(
    (req, res) => new UserController().getAllPendingUsers(req, res)
)
userRouter.route('/getAllDeniedUsers').get(
    (req, res) => new UserController().getAllDeniedUsers(req, res)
)
userRouter.route('/getAllSpecializations').get(
    (req, res) => new UserController().getAllSpecializations(req, res)
)

userRouter.route('/acceptUser').post(
    (req,res) => new UserController().acceptUser(req, res)
)

userRouter.route('/denyUser').post(
    (req, res) => new UserController().denyUser(req, res)
)

userRouter.route('/getUserByUsername').post(
    (req, res) => new UserController().getUserByUsername(req, res)
)

userRouter.route('/updateInfo').post(
    (req, res) => new UserController().updateInfo(req, res)
)

userRouter.route('/updateInfo2').post(
    (req, res) => new UserController().updateInfo2(req, res)
)

userRouter.route('/getAppointmentsBySpecialization').post(
    (req, res) => new UserController().getAppointmentsBySpecialization(req, res)
)

userRouter.route('/getAppointmentsByName').post(
    (req, res) => new UserController().getAppointmentsByName(req, res)
)

userRouter.route('/addRequest').post(
    (req, res) => new UserController().addRequest(req, res)
)

userRouter.route('/addSpecialization').post(
    (req, res) => new UserController().addSpecialization(req, res)
)

userRouter.route('/getAllPendingAppointments').get(
    (req, res) => new UserController().getAllPendingAppointments(req, res)
)

userRouter.route('/getAllAppointments').get(
    (req, res) => new UserController().getAllAppointments(req, res)
)

userRouter.route('/getAllPregledi').get(
    (req, res) => new UserController().getAllPregledi(req, res)
)

userRouter.route('/acceptPA').post(
    (req, res) => new UserController().acceptPA(req, res)
)
userRouter.route('/declinePA').post(
    (req, res) => new UserController().declinePA(req, res)
)

userRouter.route('/updatePA').post(
    (req, res) => new UserController().updatePA(req, res)
)

userRouter.route('/addPregled').post(
    (req, res) => new UserController().addPregled(req, res)
)
userRouter.route('/deletePA').post(
    (req, res) => new UserController().deletePA(req, res)
)

userRouter.route('/getAllPreglediPacient').post(
    (req, res) => new UserController().getAllPreglediPacient(req, res)
)
userRouter.route('/getAllPreglediDoctor').post(
    (req, res) => new UserController().getAllPreglediDoctor(req, res)
)

userRouter.route('/cancelPregled').post(
    (req, res) => new UserController().cancelPregled(req, res)
)


userRouter.route('/getReportPacient').post(
    (req, res) => new UserController().getReportPacient(req, res)
)
userRouter.route('/addReport').post(
    (req, res) => new UserController().addReport(req, res)
)

export default userRouter;