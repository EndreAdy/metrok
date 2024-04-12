import { Injectable, inject } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { DocumentData, Firestore, collection, collectionData, collectionGroup } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FirebaseService {
  constructor(private firestore: AngularFirestore) { }
 
  addStop(location: string, stopData: any) {
    return this.firestore.collection('stopsData').doc(location).collection('stops').add(stopData);
  }

  editStop(location: string, stopId: string, newData: any) {
    return this.firestore.collection('stopsData').doc(location).collection('stops').doc(stopId).update(newData);
  }

  deleteStop(location: string, stopId: string) {
    return this.firestore.collection('stopsData').doc(location).collection('stops').doc(stopId).delete();
  }

  getAllStops(location: string) {
    return this.firestore.collection('stopsData').doc(location).collection('stops').valueChanges({ idField: 'id' });
  }
}
