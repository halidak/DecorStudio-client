import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { StoresComponent } from './pages/stores/stores.component';
import { StoreDetailsComponent } from './pages/store-details/store-details.component';
import { CatalogComponent } from './pages/catalog/catalog.component';

const routes: Routes = [
   { path: '', component: HomeComponent },
   { path: 'stores', component: StoresComponent},
   { path: 'store/:id', component:StoreDetailsComponent },
   { path: 'catalog/:id', component: CatalogComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
