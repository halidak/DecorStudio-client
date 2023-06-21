import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddAppDialogComponent } from 'src/app/forms/add-app-dialog/add-app-dialog.component';
import { AppointmentsService } from 'src/app/services/appointments.service';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {
  displayedColumns: string[] = ['vreme', 'datum'];
  appointments: any[] = [];
  user: any = [];

  constructor(private appService: AppointmentsService, private dialog: MatDialog) {}

  ngOnInit(): void {
    const userJSON = localStorage.getItem('user');
    if (userJSON) {
      this.user = JSON.parse(userJSON);
    }
    this.loadAppointments();
  }

  loadAppointments(): void {
    this.appService.getAppointments(this.user.id).subscribe((data: any) => {
      this.appointments = data;
      console.log("Appointments", this.appointments);
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddAppDialogComponent, {
      width: '250px',
    });
    
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.appService.addAppointment(result).subscribe((data: any) => {
          this.loadAppointments(); // Osvežavanje termina nakon dodavanja
        });
      }
    });
  }
}
