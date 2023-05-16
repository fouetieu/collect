import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonModal, IonicModule, NavController, isPlatform } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { SharedDirectivesModule } from 'src/app/shared/directives/shared-directives.module';
import { ActivatedRoute } from '@angular/router';
import { LocalStoreService } from 'src/app/core/services/local-store.service';
import { StateService } from 'src/app/core/services/state.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { OverlayEventDetail } from '@ionic/core/components';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, TranslateModule, SharedDirectivesModule]
})
export class DetailPage implements OnInit {
  @ViewChild(IonModal) modal: IonModal;
  amount: number;
  compte : any | null = null; 
  @ViewChild(IonContent) content: IonContent;
  client: any | null = null;
  segmentValue="details";
  constructor(
    private route: ActivatedRoute,   
    private navCtrl: NavController,
    private storage: LocalStoreService,
    private state: StateService,
    private toastService: ToastService,
    @Inject(DOCUMENT) private document: Document
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      console.log(paramMap.get('id'));
      if (!paramMap.has('id')) {
        this.navCtrl.navigateBack('/clients');
        return;
      }     
      const clientId =  +paramMap.get('id');      
     

      //client
      const clients = this.state.clients$.getValue();
      const clientFilter = clients.filter(c=> c.id === clientId);
      this.client = clientFilter[0];
    });

    this.state.getCompte().subscribe(
      (res)=>{
        console.log(res);
        this.compte = res;
      }
    )
    
    const headerHeight = isPlatform('ios') ? 44 : 56;
    this.document.documentElement.style.setProperty('--header-position', `calc(env(safe-area-inset-top) + ${headerHeight}px)`)
 
  }

  onScroll(ev) {
    const offset = ev.detail.scrollTop;
    
  }
  isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    
    return (
      rect.top >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
    );
  }

  segmentChanged(event) {    
    this.segmentValue = event.detail.value;
  }

  onGoBack(){
    console.log("GO back");
    this.navCtrl.back();
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


  

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(this.amount, 'confirm');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      console.log( `Montant  , ${ev.detail.data}!`);
      this.state.versement(+ev.detail.data);
    }
  }

  imageUrl(client: any){
    if(client.photo === "") return 'assets/icons/user.png';
    else return client.photo;
  }

}
