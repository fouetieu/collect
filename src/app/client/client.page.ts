import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-client',
  templateUrl: './client.page.html',
  styleUrls: ['./client.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ClientPage implements OnInit {

  currentTab = 'home';
  constructor() {}

  setCurrentTab({ tab }) {
    this.currentTab = tab;
  }

  ngOnInit() {
  }

}
