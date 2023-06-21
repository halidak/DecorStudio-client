import { Component, OnInit } from '@angular/core';
import { AppointmentsService } from 'src/app/services/appointments.service';
import { DecorService } from 'src/app/services/decor.service';
import { ReservationService, makeReservation } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-reservation-page',
  templateUrl: './reservation-page.component.html',
  styleUrls: ['./reservation-page.component.css']
})
export class ReservationPageComponent implements OnInit {
  cartItems: any[] = [];
  appointments: any[] = [];
  user: any = [];
  success = false;
  error = false;

  constructor(public decorService: DecorService, private appService: AppointmentsService, private reservationService: ReservationService) { }

  ngOnInit(): void {
    const userJSON = localStorage.getItem('user');
    if (userJSON) {
      this.user = JSON.parse(userJSON);
    }
    this.cartItems = this.decorService.getCart();
    console.log(this.cartItems);

    this.appService.getApp().subscribe((appointments: any) => {
      this.appointments = appointments;
      console.log(this.appointments);
    })
  }

  rezervisi(){
    let dateValue = +(document.getElementById('date') as HTMLInputElement).value;
    const date = new Date(dateValue);
    const cartItems = this.decorService.getCart(); // Dobijanje svih stavki iz korpe
    const decorIds = cartItems.map(item => item.id);
    console.log(decorIds);
    console.log(dateValue)
    var res: makeReservation = {
      userId: this.user.id,
      reservationDate: dateValue,
      decorIds: decorIds
    }

    this.reservationService.makeReservation(res).subscribe((res: any) => {
      console.log(res);
      localStorage.removeItem('cartItems');
      this.success = true;
    },
    (err: any) => {
      console.log(err);
      this.error = true;
    }
    )
  }
}