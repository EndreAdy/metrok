import { Injectable, inject } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, map } from 'rxjs';
import { Megallok } from './megallok.model';

@Injectable({ providedIn: 'root' })
export class FirebaseService {
  constructor(private firestore: AngularFirestore) { }


  getDestinationsForLine(line: string): Observable<any[]> {
    return this.firestore
      .collection('megallok', ref => ref.where('line', '==', line))
      .valueChanges({ idField: 'id' });
  }
  getDirectionsForLine(line: string): Observable<string[]> {
    return this.firestore
      .collection<Megallok>('megallok', ref => ref.where('line', '==', line))
      .valueChanges()
      .pipe(
        map(stops => {
          const directionsSet = new Set<string>();
          stops.forEach(stop => {
            directionsSet.add(stop.irany);
          });
          return Array.from(directionsSet);
        })
      );
  }
  getStopsForDirection(direction: string): Observable<string[]> {
    return this.firestore
      .collection<Megallok>('megallok', ref => ref.where('irany', '==', direction))
      .valueChanges()
      .pipe(
        map(stops => stops.map(stop => stop.nev))
      );
  }
  
}
