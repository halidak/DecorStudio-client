import { Injectable } from '@angular/core';
import { env } from '../env';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  url = env.url;
  constructor(private http: HttpClient) { }

  makeReservation(dto: makeReservation){
    return this.http.post(`${this.url}/Reservation/make-reservation`, dto);
  }

  getReservations(id: string){
    return this.http.get(`${this.url}/Reservation/user-reservation/${id}`);
  }

  cancelReservation(id: number){
    return this.http.delete(`${this.url}/Reservation/cancel-reservation/${id}`);
  }
}

export interface makeReservation{
  userId: string;
  reservationDate: number;
  decorIds: number[]
}
