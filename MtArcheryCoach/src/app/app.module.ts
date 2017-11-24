import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdNativeDateModule, MdButtonModule, MdCardModule, MdMenuModule, MdToolbarModule, MdIconModule, MaterialModule } from '@angular/material';
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import {FlexLayoutModule} from "@angular/flex-layout";
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { UserService } from "./user.service";
import { LoggedInGuard } from "./loggedIn.guard";


import { EquipmentModule } from "./equipment/equipment.module";
import { PracticingModule } from "./practicing/practicing.module";
import { ScoringModule } from "./scoring/scoring.module";
import { RestDataService } from './core/restData.service';
import { NotFoundComponent } from './error/notFound.component';
import { IntencityModule } from './intencity/intencity.module';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'error/notFound', component: NotFoundComponent },
  { path: '',   redirectTo: '/home', pathMatch: 'full' }
];

// Must export the config
export const firebaseConfig = {
    apiKey: "AIzaSyA4UDCqMKJWPorZXQ7lh59ZawOPhqSl63U",
    authDomain: "mtarcherycoach.firebaseapp.com",
    databaseURL: "https://mtarcherycoach.firebaseio.com",
    projectId: "mtarcherycoach",
    storageBucket: "mtarcherycoach.appspot.com",
    messagingSenderId: "337400391771"
};

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes),
    MdNativeDateModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MdButtonModule,
    MdMenuModule,
    MdCardModule,
    MdToolbarModule,
    MdIconModule,
    FlexLayoutModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,

    EquipmentModule,
    PracticingModule,
    ScoringModule,
    IntencityModule
  ],
  declarations: [ AppComponent, HomeComponent, LoginComponent, NotFoundComponent ],
  bootstrap: [ AppComponent ],
  providers: [ UserService, LoggedInGuard, RestDataService ],
  exports: [
    MdNativeDateModule,
    MdButtonModule,
    MdMenuModule,
    MdCardModule,
    MdToolbarModule,
    MdIconModule,
    FormsModule,
    FlexLayoutModule
  ]
})
export class AppModule {}