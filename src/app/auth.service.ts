import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { getAuth, signInWithEmailAndPassword, Auth, onAuthStateChanged, signOut, GoogleAuthProvider, signInWithPopup, UserCredential, createUserWithEmailAndPassword } from 'firebase/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth: Auth;
  public user: any;
  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();

  constructor(private router: Router, private firestore: AngularFirestore) {
    this.auth = getAuth();

    onAuthStateChanged(this.auth, (user) => {
      this.user = user;
      this.isLoggedInSubject.next(!!user);
    
    });
  }
  login(email: string, password: string) {
    if (!this.auth) {
      console.error('Firebase Auth nincs inicializálva');
      return;
    }
    
    signInWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('Felhasználó bejelentkezve:', user);
        this.router.navigate(['/']);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Hiba bejelentkezés során:', errorCode, errorMessage);
      }); 
  }

  async loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(this.auth, provider);
      console.log('Felhasználó bejelentkezett Google segítségével:', result.user);
      this.router.navigate(['/']);
    } catch (error) {
      console.error('A Google bejelentkezés során hiba lépett fel:', error);
    }
  }
  async signUpWithEmailAndPassword(email: string, password: string, name: string): Promise<void> {
    try {
      const userCredential: UserCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      console.log('Felhasználó regisztrálva:', userCredential.user);
    } catch (error) {
      console.error('Hiba a regisztráció során:', error);
    }
  }

  logout() {
    signOut(this.auth).then(() => {
      console.log('Felhasználó kijelentkezve');
      this.router.navigate(['/login']);
    }).catch((error) => {
      console.error('Hiba a kijelentkezés során:', error);
    });
  }
}
