import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  email: string = '';
  password: string = '';
  name: string = '';
  constructor(private router:Router, private authService: AuthService) {}

  ngOnInit() {}

  signUp() {
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
