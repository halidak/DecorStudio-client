import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { StoresComponent } from './pages/stores/stores.component';
import { StoreDetailsComponent } from './pages/store-details/store-details.component';
import { CatalogComponent } from './pages/catalog/catalog.component';
import { LoginComponent } from './forms/login/login.component';
import { RegisterComponent } from './forms/register/register.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
   { path: '', component: HomeComponent },
   { path: 'stores', component: StoresComponent},
   { path: 'store/:id', component:StoreDetailsComponent }, // canActivate: [AuthGuard] ako hocemo da zastitimo rutu
   { path: 'catalog/:id', component: CatalogComponent },
   { path: 'login', component: LoginComponent },
   { path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
