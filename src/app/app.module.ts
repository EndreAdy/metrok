import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LinesComponent } from './lines/lines.component';
import { AboutComponent } from './about/about.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes, } from '@angular/router';
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import {provideAuth, getAuth} from '@angular/fire/auth';
import { SignupComponent } from './signup/signup.component';
import { FirebaseAppModule } from '@angular/fire/app';
import { Environments } from '../environments/environments';
import { PasswordRecoveryComponent } from './password-recovery/password-recovery.component';
import { AuthGuard } from '@angular/fire/auth-guard';
import { AngularFireModule, FIREBASE_OPTIONS } from '@angular/fire/compat';

const appRoutes: Routes =[
{ path: '', component: HomeComponent, canActivate: [AuthGuard] },
{ path: 'lines', component: LinesComponent},
{ path: 'dashboard', component: DashboardComponent},
{ path: 'about', component: AboutComponent},
{ path: 'login', component: LoginComponent},
{ path: 'signup', component: SignupComponent},
{ path: 'password-recovery', component: PasswordRecoveryComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LinesComponent,
    AboutComponent,
    DashboardComponent,
    LoginComponent,
    SignupComponent,
    PasswordRecoveryComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    FirebaseAppModule,
    AngularFireModule.initializeApp(Environments.firebaseConfig),
    provideFirebaseApp(() => initializeApp(Environments.firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    
  ],
  providers: [AuthGuard, { provide: FIREBASE_OPTIONS, useValue: Environments.firebaseConfig }],
  bootstrap: [AppComponent]
  
})
export class AppModule { }
