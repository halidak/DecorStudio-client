import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env } from '../env';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {

  url = env.url;
  constructor(private http: HttpClient) { }

  getAppointments(id: string){
    return this.http.get(`${this.url}/Appointment/get-by-user/${id}`);
  }

  addAppointment(app: addApp){
    return this.http.post(`${this.url}/Appointment/add-app`, app);
  }

  getApp(id: number){
    return this.http.get(`${this.url}/Appointment/get-all-distinct?number=${id}`);
  }
}

export interface addApp{
  dateTime: Date;
  userId: string;
}
