import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  isModalOpen: boolean = false;

  openModal() {
      this.isModalOpen = true;
  }

  closeModal() {
      this.isModalOpen = false;
  }

  
  constructor(private router: Router){}

  ngOnInit() {  
  }


}
