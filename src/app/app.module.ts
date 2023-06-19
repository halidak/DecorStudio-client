import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './layouts/header/header.component';
import { CategoryNavbarComponent } from './layouts/category-navbar/category-navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { StoresComponent } from './pages/stores/stores.component';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { StoreDetailsComponent } from './pages/store-details/store-details.component';
import { CatalogComponent } from './pages/catalog/catalog.component';
import { LoginComponent } from './forms/login/login.component';
import { RegisterComponent } from './forms/register/register.component';
import {MatRadioModule} from '@angular/material/radio';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { EditProfileComponent } from './forms/edit-profile/edit-profile.component';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import { ConfirmationDialogComponent } from './forms/confirmation-dialog/confirmation-dialog.component';
import { WarehouseComponent } from './pages/warehouse/warehouse.component';
import { WarehouseDetailsComponent } from './pages/warehouse-details/warehouse-details.component';
import { DecorDetailsComponent } from './pages/decor-details/decor-details.component';
import { AddDecorComponent } from './forms/add-decor/add-decor.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CategoryNavbarComponent,
    FooterComponent,
    HomeComponent,
    StoresComponent,
    StoreDetailsComponent,
    CatalogComponent,
    LoginComponent,
    RegisterComponent,
    EditProfileComponent,
    ConfirmationDialogComponent,
    WarehouseComponent,
    WarehouseDetailsComponent,
    DecorDetailsComponent,
    AddDecorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
    MatCheckboxModule,
    MatRadioModule,
    MatMenuModule,
    MatButtonModule,
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
