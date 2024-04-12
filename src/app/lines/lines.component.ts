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
  selectedStops: { name: string, doorInfo: string, imageSrc?: string,}[] = [];
  selectedStopInfo: { name: string, doorInfo: string, imageSrc?: string,} | null = null;
  
  stopsData = {
    'Mexikói út':  [
      { name: 'Deák Ferenc tér (kijárat)', doorInfo: 'Legkönnyebben úgy juthatsz a kijárathoz, ha leszálláshoz a 3. kocsi 2. ajtaját választod.', imageSrc: "assets/deak_m1_exit.jpg",   },
      { name: 'Deák Ferenc tér (M2/M3)', doorInfo: 'Legkönnyebben úgy szállhatsz át, ha leszálláshoz az 1. kocsi 1. ajtaját választod',  },
      { name: 'Oktogon', doorInfo: '"Legkönnyebben úgy juthatsz a kijárathoz, ha leszálláshoz a 2. kocsi 1. ajtaját választod.',}
    ],
    'Vörösmarty tér': [
      {name:'Széchenyi fürdő', doorInfo:'', },
      {name:'Oktogon', doorInfo:'', },
      {name:'Deák Ferenc tér (M2/M3)', doorInfo:'', }
    ],
    'Örs vezér tere': [
      {name:'Astoria',doorInfo:'', },
      {name:'Keleti pályaudvar (kijárat)', doorInfo:'',},
      {name:'Örs vezér tere', doorInfo:'',}
    ],
    'Déli pályaudvar': [
      {name:'Keleti pályaudvar (kijárat)'}, 
      {name:'Astoria', },
      {name:'Széll Kálmán tér'}
    ],
    'Kőbánya-Kispest':['Nyugati pályaudvar (Váci út/Westend)', 'Kálvin tér (M4)','Corvin-negyed'],
    'Újpest-központ':['Népliget','Kálvin tér (M4)', 'Deák Ferenc tér (M2)'],
    'Kelenföld vasútállomás':['Kálvin tér', 'Móricz Zsigmond körtér','Kelenföld vasútállomás (pályaudvarhoz)'],
    'Keleti pályaudvar':['Móricz Zsigmond körtér(Lift)', 'Fővám tér', 'II. János Pál pápa tér']
  };


  showOptions(image: string) {
    this.selectedImage = image;
    this.showMessage = true;
    this.selectedStops = this.stopsData[image];
    this.selectedDestination = '';
    this.selectedStopInfo = null;
  }

  selectDestination(destination: string) {
    this.selectedDestination = destination;
    this.selectedStops = this.stopsData[destination];
    this.selectedStopInfo = null; 
    // console.log('Kiválasztott', destination, ' felé');
  }
  showStopInfo(stop: { name: string, doorInfo: string, imageSrc?: string, selected: boolean }) {
    this.selectedStopInfo = stop;
  }
}