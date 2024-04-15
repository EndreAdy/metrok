import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  @ViewChild('signInForm') signInForm!: NgForm;
  
  email: string = '';
  password: string = '';
  name: string = '';
  isFormValid: boolean = false;
  constructor(private router:Router, private authService: AuthService) {}

  ngOnInit() {}

  validateEmail(): void {
    const emailPattern: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    this.isEmailValid(this.email);
  }

  isEmailValid(email: string): boolean {
    const emailPattern: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }
  signUp() {
    if (this.isEmailValid(this.email)){
    this.authService.signUpWithEmailAndPassword(this.email, this.password, this.name)
      .then(() => {
        console.log('Sikeres regisztráció');
        this.router.navigate(['/']);
      })
      .catch((error) => {
        console.error('Hiba regisztráció során:', error);
      });
  }
}
onFormChange() {
  this.isFormValid = this.signInForm.valid;
}
}

