import { CUSTOM_ELEMENTS_SCHEMA, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, IonicSlides, MenuController } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { Router } from '@angular/router';
import Swiper from 'swiper';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, TranslateModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DashboardPage implements OnInit {
  swiperModules = [IonicSlides];
  @ViewChild('swiper')
  swiperRef: ElementRef | undefined;
  swiper?: Swiper;

  
  features: any[] = [
    {id: 1, name: 'Ajouter un Client', src: 'assets/icons/add-user.png', background: 'rgba(255,178,102, 0.1)', page: 'clients/create'},
    {id: 1, name: 'Enregistrer un versement', src: 'assets/icons/credit.png', background: 'rgba(255,178,102, 0.1)', page: 'clients'}
  ];

  
  roles!: String;
  lang!: String;
  constructor(   
    private router: Router,
    private menu: MenuController  
  ) { }

  ionViewWillEnter() {
   
  }

  ngOnInit() {
    
  }

  openMoreMenu(){
    this.menu.enable(true, 'more');
    this.menu.open('more');    
  }

  
  onPageClick(page:string) {    
    this.router.navigateByUrl('/employe/'+page, {replaceUrl: true});  
  }

  swiperReady() {
    this.swiper = this.swiperRef?.nativeElement.swiper;
  }

  onGoToCommisions(){
    this.router.navigateByUrl('/employe/commissions'); 
  }



}
