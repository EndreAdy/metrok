import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  users$: Observable<any[]>;
  editingStop: any;
  stops$: Observable<any[]>;
  newStop: any = {
    name: '',
    doorInfo: ''
  };
  directionIds = ['Mexikói út', 'Vörösmarty tér'];
  directionStops$: Observable<any>[][] = [];

  constructor(private firestore: AngularFirestore, private authService: AuthService) {
   this.stops$ = this.firestore.collection('stopsData').doc('direction_id').collection('stops').valueChanges({ idField: 'id' });
    this.directionIds.forEach(directionId => {
      const stops$ = this.firestore.collection('stopsData').doc(directionId).collection('stops').valueChanges({ idField: 'id' });
      this.directionStops$.push([stops$]);
    });
  }
  async signUp(email: string, password: string, name: string) {
    try {
      await this.authService.signUpWithEmailAndPassword(email, password, name);
      
    } catch (error) {
      console.error('Hiba a regisztráció során:', error);

    }
  }

  addStop() {
    this.firestore.collection('stopsData').doc('Mexikói út').collection('stops').add(this.newStop)
      .then((docRef) => {
        console.log('Megálló hozzáadva ezzel az id-vel: ', docRef.id);
      })
      .catch((error) => {
        console.error('Hiba megálló hozzáadásakor: ', error);
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
      console.log('Megálló szerkesztve');
      this.editingStop = null;
    }).catch((error) => {
      console.error('Hiba a megálló szerkesztése közben:', error);
    });
  }

  deleteStop(stopId: string) {
    console.log('Megálló törölve:', stopId);
    this.firestore.collection('stopsData').doc('Mexikói út').collection('stops').doc(stopId).delete();
  }

  

  private resetForm() {
    this.newStop = {
      name: '',
      email: ''
    };
  }

  
}
