import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {  IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-commissions',
  templateUrl: './commissions.page.html',
  styleUrls: ['./commissions.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, TranslateModule]
})
export class CommissionsPage implements OnInit {
  
  commissions = {
    solde : 422400,
    transactions: [
      {
        title: 'Commission',
        date: '01/02/2023',
        amount:  153167,
        type: 'credit',
        currency: 'XAF'
      },
      {
        title: 'Retrait',
        date: '28/01/2023',
        amount: 120000,
        type: 'debit',
        currency: 'XAF',
      },
      {
        title: 'Commission',
        date: '01/01/2023',
        amount: 123000,
        type: 'credit',
        currency: 'XAF',
      },
      {
        title: 'Commission',
        date: '01/12/2022',
        amount: 90000,
        type: 'credit',
        currency: 'XAF',
      },
      {
        title: 'Commission',
        date: '01/11/2022',
        amount: 152000,
        type: 'credit',
        currency: 'XAF',
      }        
      
    ]
  }

  constructor() { }

  ngOnInit() {
  }

  format(value, currency = 'XAF') {
    return new Intl.NumberFormat('fr-FR', <any>{
      style: 'currency',
      currency: currency,
      currencySign: 'accounting',
      signDisplay: 'auto',
    }).format(value);
  }


}
