import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { StoresComponent } from './pages/stores/stores.component';
import { StoreDetailsComponent } from './pages/store-details/store-details.component';
import { CatalogComponent } from './pages/catalog/catalog.component';
import { LoginComponent } from './forms/login/login.component';
import { RegisterComponent } from './forms/register/register.component';
import { AuthGuard } from './auth.guard';
import { EditProfileComponent } from './forms/edit-profile/edit-profile.component';
import { WarehouseComponent } from './pages/warehouse/warehouse.component';
import { RoleGuard } from './role.guard';
import { WarehouseDetailsComponent } from './pages/warehouse-details/warehouse-details.component';
import { DecorDetailsComponent } from './pages/decor-details/decor-details.component';
import { AddDecorComponent } from './forms/add-decor/add-decor.component';
import { EditDecorComponent } from './forms/edit-decor/edit-decor.component';
import { ChangePasswordComponent } from './forms/change-password/change-password.component';
import { AppointmentsComponent } from './pages/appointments/appointments.component';
import { ReservationPageComponent } from './pages/reservation-page/reservation-page.component';
import { ListOfReservationsComponent } from './pages/list-of-reservations/list-of-reservations.component';
import { VerifyComponent } from './pages/verify/verify.component';
import { ResetPEmailComponent } from './forms/reset-p-email/reset-p-email.component';
import { NewPasswordComponent } from './forms/new-password/new-password.component';

const routes: Routes = [
   { path: '', component: HomeComponent },
   { path: 'stores', component: StoresComponent},
   { path: 'store/:id', component:StoreDetailsComponent }, // canActivate: [AuthGuard] ako hocemo da zastitimo rutu
   { path: 'catalog/:storeId/:id', component: CatalogComponent },
   { path: 'login', component: LoginComponent },
   { path: 'register', component: RegisterComponent },
   { path: 'edit/:id', component: EditProfileComponent, canActivate: [AuthGuard]},
   { path: 'warehouses', component:WarehouseComponent, canActivate: [RoleGuard], data: {allowedRole: 1}},
   { path: 'warehouse/:id', component:WarehouseDetailsComponent, canActivate: [RoleGuard], data: {allowedRole: 1}},
   { path: 'decor/:id/:warehouseId', component:DecorDetailsComponent },
   { path: 'add-decor/:id', component:AddDecorComponent, canActivate: [RoleGuard], data: {allowedRole: 1} },
   { path: 'decor/:id', component: DecorDetailsComponent },
   { path: 'edit-decor/:id', component:EditDecorComponent, canActivate: [RoleGuard], data: {allowedRole: 1} },
   { path: 'change-password', component: ChangePasswordComponent, canActivate: [AuthGuard]},
   { path: 'appointments', component: AppointmentsComponent, canActivate: [RoleGuard], data: {allowedRole: 2}},
   { path: 'reservation', component: ReservationPageComponent , canActivate: [RoleGuard], data: {allowedRole: 3}},
   { path: 'reservation-list', component: ListOfReservationsComponent, canActivate: [AuthGuard]},
   { path: 'verify/:email/:token', component: VerifyComponent},
   { path: 'password', component: ResetPEmailComponent},
   { path: 'new-password/:email/:token', component: NewPasswordComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
