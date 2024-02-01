import { Appointment } from "./appointment";

export class User{
    username: string;
    password: string;
    firstname: string;
    lastname: string;
    type: string;
    email: string;
    adress: string;
    telephone: string;
    licence: number;
    specialization: string;
    branch: string;
    url: string;
    appointments: Array<Appointment>
}