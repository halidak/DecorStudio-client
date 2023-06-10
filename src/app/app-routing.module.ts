import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { StoresComponent } from './pages/stores/stores.component';

const routes: Routes = [
   { path: '', component: HomeComponent },
   { path: 'stores', component: StoresComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
