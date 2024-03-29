import { Component, OnInit } from '@angular/core';
import { DecorService } from 'src/app/services/decor.service';
import { ReservationService } from 'src/app/services/reservation.service';
import { UserService } from 'src/app/services/user.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-list-of-reservations',
  templateUrl: './list-of-reservations.component.html',
  styleUrls: ['./list-of-reservations.component.css']
})
export class ListOfReservationsComponent implements OnInit{

  displayedColumns: string[] = ['naziv', 'cena', 'tip', 'slika'];
  user: any = [];
  decors: any[] = [];
  appointments: any;
  
  displayedColumns2: string[] = ['naziv', 'cena', 'tip', 'slika', 'termin'];

  displayedColumns3: string[] = ['naziv', 'cena', 'tip', 'slika', 'termin', 'dugme'];

  constructor(private decorService: DecorService, public userService: UserService, private reservationService: ReservationService) {}
  ngOnInit(): void {
    const userJSON = localStorage.getItem('user');
    if (userJSON) {
      this.user = JSON.parse(userJSON);
    }
    if (this.userService.isCustomer()) {
      this.reservationService.getReservations(this.user.id).subscribe((res: any) => {
        this.decors = res.flatMap((reservation: any) => {
          return reservation.decor_Reservations.map((decorReservation: any) => {
            return {
              decor: decorReservation.decor,
              appointments: reservation.appointments,
              res: decorReservation
            };
          });
        });
        console.log(this.decors);
      },
      err => {
        console.log(err);
      });
    }
    
    else if(this.userService.isEmployee()){
      this.decorService.getReservationOfEmployee(this.user.id).subscribe((res: any) => {
        this.decors = res;
        console.log(this.decors)
      },
      err => {
        console.log(err)
      })
    }
    else if(this.userService.isManager()){
      this.decorService.getReservationsFromStore(this.user.storeId).subscribe((res: any) => {
        this.decors = res;
        console.log(this.decors)
        for (const decor of this.decors) {
          // Pristupite svim rezervacijama u okviru trenutne dekoracije
          const reservations = decor.decor.decor_Reservations;
          
          // Iterirajte kroz sve rezervacije
          for (const reservation of reservations) {
            // Pristupite terminima sastanaka u okviru trenutne rezervacije
             this.appointments = reservation.reservation.appointments;
            // Ovdje možete koristiti "appointments" za dalju obradu ili prikaz u tabeli
            console.log(this.appointments);
          }
        }
      },
      err => {
        console.log(err)
      })
    }
  }

  handleButtonClick(id: number) {
    this.reservationService.cancelReservation(id).subscribe(data => {
      console.log(data);
      this.ngOnInit();
    })
  }
}
