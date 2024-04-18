import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})

export class AboutComponent implements OnInit {
  stops: any[];

  constructor(private firebaseService: FirebaseService) { }

  ngOnInit(): void {
    
  }
}
