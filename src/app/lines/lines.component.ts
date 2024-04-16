import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FirebaseService} from '../firebase.service';

@Component({
  selector: 'app-lines',
  templateUrl: './lines.component.html',
  styleUrl : './lines.component.css',
})
export class LinesComponent {
  selectedImage: string = '';
  showMessage: boolean = false;
  selectedDestination: string = '';

  constructor(private firebaseService: FirebaseService) {}
  ngOnInit(){}

 

}