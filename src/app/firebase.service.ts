import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData, collectionGroup } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FirebaseService {
  firestore = inject(Firestore)
  

  constructor() { }
}
/* getStops(): Observable<Stops[]>{
    const metroCollection = collectionGroup(this.firestore, 'stops');
    return collectionData<Stops>(metroCollection);
  }
}
export interface Stops {
  name: string;
  info: string;
}

  getDirections(metroLineId: string): Observable<any[]> {
    return this.firestore.collection(`metroStops/${metroLineId}/directions`).valueChanges();
  }

  getStops(metroLineId: string, direction: string): Observable<any[]> {
    return this.firestore.collection(`metroStops/${metroLineId}/directions/${direction}/stops`).valueChanges();
  }
}
*/