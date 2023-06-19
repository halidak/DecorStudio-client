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

const routes: Routes = [
   { path: '', component: HomeComponent },
   { path: 'stores', component: StoresComponent},
   { path: 'store/:id', component:StoreDetailsComponent }, // canActivate: [AuthGuard] ako hocemo da zastitimo rutu
   { path: 'catalog/:id', component: CatalogComponent },
   { path: 'login', component: LoginComponent },
   { path: 'register', component: RegisterComponent },
   { path: 'edit/:id', component: EditProfileComponent, canActivate: [AuthGuard]},
   { path: 'warehouses', component:WarehouseComponent, canActivate: [RoleGuard], data: {allowedRole: 1}},
   { path: 'warehouse/:id', component:WarehouseDetailsComponent, canActivate: [RoleGuard], data: {allowedRole: 1}},
   { path: 'decor/:id', component:DecorDetailsComponent },
   { path: 'add-decor', component:AddDecorComponent, canActivate: [RoleGuard], data: {allowedRole: 1} },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
