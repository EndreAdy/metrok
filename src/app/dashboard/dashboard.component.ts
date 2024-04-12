import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  editingUser: any;
  users$: Observable<any[]>;
  newUser: any = {
    name: '',
    email: ''
  };

  constructor(private firestore: AngularFirestore) {
    this.users$ = this.firestore.collection('users').valueChanges({ idField: 'id' });
  }

  addUser() {
    this.firestore.collection('users').add(this.newUser)
      .then((docRef) => {
        console.log('User added with ID: ', docRef.id);
      })
      .catch((error) => {
        console.error('Error adding user: ', error);
      });
    this.resetForm();
}

editUser(user: any) {
  if (this.editingUser && this.editingUser.id === user.id) {

    this.editingUser = null;
  } else {

    this.editingUser = { ...user };
  }
}

updateUser() {
  this.firestore.collection('users').doc(this.editingUser.id).update({
    name: this.editingUser.name,
    email: this.editingUser.email
  }).then(() => {
    console.log('Felhasználó adatai szerkesztve');
    this.editingUser = null;
  }).catch((error) => {
    console.error('Hiba az adatok szerkesztése közben:', error);
  });
}

  deleteUser(userId: string) {
    console.log('Törölve ez a felhasználó:', userId);
    this.firestore.collection('users').doc(userId).delete();
  }

  private resetForm() {
    this.newUser = {
      name: '',
      email: ''
    };
  }
}
