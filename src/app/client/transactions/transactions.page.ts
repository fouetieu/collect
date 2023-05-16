import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.page.html',
  styleUrls: ['./transactions.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class TransactionsPage implements OnInit {
  transactions = [];
  allTransactions = [
    {
      title: 'Commission',
      date: '01/02/2023',
      amount: 1262,
      type: 'commission',
      currency: 'XAF'
    },
    {
      title: 'Retrait',
      date: '28/01/2023',
      amount: 25000,
      type: 'debit',
      currency: 'XAF',
    },
    {
      title: 'Versement',
      date: '14/01/2023',
      amount: 2000,
      type: 'credit',
      currency: 'XAF',
    },
    {
      title: 'Versement',
      date: '04/01/2023',
      amount: 2000,
      type: 'credit',
      currency: 'XAF',
    },
    {
      title: 'Versement',
      date: '03/01/2023',
      amount: 2000,
      type: 'credit',
      currency: 'XAF',
    }    
  ];

  constructor() {}

  ngOnInit() {
    this.transactions = this.filterTransaction(this.allTransactions);
  }

  handleChange(e) {
    const type = e.target.value;
    this.transactions = this.filterTransaction(this.allTransactions, type);
    console.log(type);
  }

  filterTransaction(value, type = 'credit') {
    const transaction = value.filter((item) => {
      return item.type === type;
    });

    return transaction;
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
