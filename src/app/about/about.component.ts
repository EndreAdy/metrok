import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
//ezen a komponensen tesztelem az adatbázist 
export class AboutComponent implements OnInit {
  stops: any[];

  constructor(private firebaseService: FirebaseService) { }

  ngOnInit(): void {
    
  }
}
