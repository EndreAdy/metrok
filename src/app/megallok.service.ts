import { Injectable } from '@angular/core';
import { AngularFirestore} from '@angular/fire/compat/firestore';
import { Megallok } from './megallok.model';

@Injectable({
  providedIn: 'root'
})
export class MegallokService {

  constructor(private angularFirestore: AngularFirestore) { }

  getMegalloDoc(id){
    return this.angularFirestore
    .collection('megallok')
    .doc(id)
    .valueChanges()
  }

  getMegalloList(){
    return this.angularFirestore
    .collection("megallok")
    .snapshotChanges();
  }

  createMegallo(megallok: Megallok){
    return new Promise<any>((resolve, reject) => {
      this.angularFirestore
      .collection("megallok")
      .add(megallok)
      .then(response => {console.log(response)}, error => reject(error));
    });
  }

  deleteMegallo(megallok){
    return this.angularFirestore
    .collection("megallok")
    .doc(megallok.id)
    .delete()
    .then(() => {
      console.log("Megálló sikeresen törölve");
    })
    .catch(error => {
      console.error("Hiba a megálló törlése közben: ", error);
    });
  }

  updateMegallo(megallok: Megallok, id){
    return this.angularFirestore
    .collection("megallok")
    .doc(id)
    .update({
      line: megallok.line,
      irany: megallok.irany,
      nev: megallok.nev,
      doorInfo: megallok.doorInfo,
      kijarat: megallok.kijarat
    });

  }

}
