import { Component } from '@angular/core';
import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'app-lines',
  templateUrl: './lines.component.html',
  styleUrls: ['./lines.component.css'],
})
export class LinesComponent {
  destinationPictures: { [key: string]: string[] } = {
    'Deák Ferenc tér (kijárat)':['deak_kijarat.jpg',],
    'deak_ferenc_ter': ['deak.png', 'deak2.jpg', 'deak3.jpg'],
  };

  metroLines: string[] = ['M1', 'M2', 'M3', 'M4'];
  selectedLine: string = '';
  destinations: any[] = [];
  selectedDestination: string = '';
  selectedPictures: string[] = [];

  constructor(private firebaseService: FirebaseService) {}

  onSelectLine(line: string) {
    this.selectedLine = line;
    this.firebaseService.getDestinationsForLine(line).subscribe(destinations => {
      console.log("Destinations for", line, ":", destinations);
      this.destinations = destinations;
    });
  }

  onSelectDestination(destination: any) {
    console.log("kiválasztott: " + destination.doorInfo);
    this.selectedDestination = destination.nev;
    this.selectedPictures = this.destinationPictures[this.selectedDestination] || [];
  }
}
