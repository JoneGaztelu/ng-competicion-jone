import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Import for loading & configuring in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CompeticionItemComponent } from './competicion-item/competicion-item.component';
import { CompeticionDetailComponent } from './competicion-detail/competicion-detail.component';
import { CompeticionService } from './shared/competicion.service';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { CompeticionEditComponent } from './competicion-edit/competicion-edit.component';
import { CompeticionData } from './shared/competicion-data';
import { HttpClientModule } from '@angular/common/http';
import { CompeticionNewComponent } from './competicion-new/competicion-new.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    NavbarComponent,
    CompeticionItemComponent,
    CompeticionDetailComponent,
    CompeticionEditComponent,
    CompeticionNewComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    //InMemoryWebApiModule.forRoot(CompeticionData)
  ],
  providers: [CompeticionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
