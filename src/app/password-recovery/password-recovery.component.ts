import { Component } from '@angular/core';
import { Auth, getAuth, sendPasswordResetEmail } from "firebase/auth";

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.css'],
})
export class PasswordRecoveryComponent {
  constructor() {}

  resetPassword() {
    const auth = getAuth();
    const email = ""
    
    sendPasswordResetEmail(auth, email)
      .then(() => {
        console.log('Jelszóvisszaállítási link elküldve');
      })
      .catch((error) => {
        console.error("Hiba a jelszó visszaállítása közben: " + error.message);
      });
  }
}
