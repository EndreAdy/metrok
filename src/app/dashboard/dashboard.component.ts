import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { MegallokService } from '../megallok.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LinesComponent } from '../lines/lines.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Megallok } from '../megallok.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  showEditForm: boolean = false;
  showCreateForm: boolean = false;
  public megallokForm: FormGroup;
  public editForm: FormGroup;
  megallokRef: any;
  Megallok: Megallok[];



  constructor(public firestore: AngularFirestore,
              public authService: AuthService,
              public formBuilder: FormBuilder,
              public megallokService: MegallokService,
              public router: Router,
              private act: ActivatedRoute)
              {  
                this.megallokForm = this.formBuilder.group({
                  line:[''],
                  irany:[''],
                  nev:[''],
                  doorInfo:[''],
                  kijarat: ['']
                })
                this.editForm = this.formBuilder.group({
                  line:[''],
                  irany:[''],
                  nev:[''],
                  doorInfo:[''],
                  kijarat: ['']
                })
              }

ngOnInit(){
  const id = this.act.snapshot.paramMap.get('id');
  if (id){
  this.megallokService.getMegalloDoc(id).subscribe(res => {
  this.megallokRef = res;
  this.editForm = this.formBuilder.group({
    line:[this.megallokRef.line],
    irany:[this.megallokRef.irany],
    nev:[this.megallokRef.nev],
    doorInfo:[this.megallokRef.doorInfo],
    kijarat: [this.megallokRef.kijarat]
  })
})
}


  /* this.megallokService.getMegalloList().subscribe(res =>{
    this.Megallok=res.map( e => {
      return{
        id: e.payload.doc.id,
        ...e.payload.doc.data() as{}
      }as Megallok;
      })
    }); */
    this.megallokService.getMegalloList().subscribe(res => {
      this.Megallok = res.map(e => {
        const id = e.payload.doc.id;
        const data = e.payload.doc.data() as Megallok;
        return { id, ...data };
      });
    });
  }

  removeMegallo(megallok){
    console.log(megallok);
    if(confirm("Biztos, hogy ki szeretnéd törölni ezt: " + megallok.nev + "?")){
      this.megallokService.deleteMegallo(megallok);
    }
  }

  onSubmitUpdate() {
    const id = this.act.snapshot.paramMap.get('id');
    this.megallokService.updateMegallo(this.editForm.value, id);
    console.log("Megálló sikeresen szerkesztve");
  }
  onSubmitCreate() {
    this.megallokService.createMegallo(this.megallokForm.value);
    console.log("Megálló sikeresen létrehozva");
  }
  toggleEditForm() {
    this.showEditForm = !this.showEditForm;
  }
  toggleCreateForm() {
    this.showCreateForm = !this.showCreateForm;
  }
  async signUp(email: string, password: string, name: string) {
    try {
      await this.authService.signUpWithEmailAndPassword(email, password, name);
      
    } catch (error) {
      console.error('Hiba a regisztráció során:', error);

    }
  }
  

  
}
