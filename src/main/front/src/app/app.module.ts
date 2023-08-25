import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { DetailPageComponent } from './components/detail-page/detail-page.component';
import { AdminTableComponent } from './components/admin-table/admin-table.component';
import { AddMealComponent } from './components/add-meal/add-meal.component';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MainPageComponent,
    DetailPageComponent,
    AdminTableComponent,
    AddMealComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
