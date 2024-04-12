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
  editingStop: any;
  stops$: Observable<any[]>;
  newStop: any = {
    name: '',
    doorInfo: ''
  };
  directionIds = ['Mexikói út', 'Vörösmarty tér'];
  directionStops$: Observable<any>[][] = [];

  constructor(private firestore: AngularFirestore) {
    this.users$ = this.firestore.collection('users').valueChanges({ idField: 'id' });
    this.stops$ = this.firestore.collection('stopsData').doc('direction_id').collection('stops').valueChanges({ idField: 'id' });
    this.directionIds.forEach(directionId => {
      const stops$ = this.firestore.collection('stopsData').doc(directionId).collection('stops').valueChanges({ idField: 'id' });
      this.directionStops$.push([stops$]); // Pushing an array containing stops$ for each direction
    });
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

  addStop() {
    this.firestore.collection('stopsData').doc('Mexikói út').collection('stops').add(this.newStop)
      .then((docRef) => {
        console.log('Stop added with ID: ', docRef.id);
      })
      .catch((error) => {
        console.error('Error adding stop: ', error);
      });
    this.resetForm();
  }

  editStop(stop: any) {
    if (this.editingStop && this.editingStop.id === stop.id) {
      this.editingStop = null;
    } else {
      this.editingStop = { ...stop };
    }
  }

  updateStop() {
    this.firestore.collection('stopsData').doc('Mexikói út').collection('stops').doc(this.editingStop.id).update({
      name: this.editingStop.name,
      doorInfo: this.editingStop.doorInfo
    }).then(() => {
      console.log('Stop data updated');
      this.editingStop = null;
    }).catch((error) => {
      console.error('Error updating stop data:', error);
    });
  }

  deleteStop(stopId: string) {
    console.log('Deleted stop:', stopId);
    this.firestore.collection('stopsData').doc('Mexikói út').collection('stops').doc(stopId).delete();
  }

  private resetForm() {
    this.newUser = {
      name: '',
      email: ''
    };
  }

  
}
