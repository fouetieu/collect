import { CUSTOM_ELEMENTS_SCHEMA, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, IonicSlides } from '@ionic/angular';
import Swiper from 'swiper';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePage implements OnInit {
  swiperModules = [IonicSlides];
  @ViewChild('swiper')
  swiperRef: ElementRef | undefined;
  swiper?: Swiper;

  slides = [
    {
      title: 'Solde Total',
      balance: '42069',
      account: '50901293853',
      currency: 'XAF',
    }
  ];

  accountActions = [
    {
      icon: 'paper-plane',
      color: 'action-cyan',
      label: 'send',
    },
    {
      icon: 'add-circle',
      color: 'action-yellow',
      label: 'top-up',
    },
    {
      icon: 'newspaper',
      color: 'action-white',
      label: 'bills',
    },
  ];

  transactions = [
    {
      title: 'Commission',
      date: '01/02/2023',
      amount: 1262,
      type: 'debit',
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
  }

  swiperReady() {
    console.log("Swipe Reday");
    this.swiper = this.swiperRef?.nativeElement.swiper;
  }

  onSlideChange([Swiper]) {
    console.log('slide change', Swiper);
  }

  handleAction({ label }) {
    console.log('You clicked on:', label);
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
