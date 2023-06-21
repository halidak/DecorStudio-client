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
}

export interface makeReservation{
  userId: string;
  reservationDate: number;
  decorIds: number[]
}
