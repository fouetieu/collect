import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-employe',
  templateUrl: './employe.page.html',
  styleUrls: ['./employe.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class EmployePage implements OnInit {

  currentTab = 'dashboard';
  constructor() {}

  setCurrentTab({ tab }) {
    this.currentTab = tab;
  }

  ngOnInit() {
  }

}
