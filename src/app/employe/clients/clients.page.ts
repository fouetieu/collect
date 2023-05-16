import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InfiniteScrollCustomEvent, IonicModule, MenuController } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { Router, ActivatedRoute } from '@angular/router';
import { StateService } from 'src/app/core/services/state.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.page.html',
  styleUrls: ['./clients.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, TranslateModule]
})
export class ClientsPage implements OnInit {

  clientsRepository?: any[] = [];
  
  clients?: any[] =[];
  isLoading = false;
  totalItems = 0;
  limit=50;
  maximumPages=100;
  page = 1;
  query = "";
  infiniteEvent: any;
  
  lang: string;
  constructor(   
    private router: Router,
    private route: ActivatedRoute,
    private menu: MenuController,
    private state: StateService
  ){   
   
  }

  //load customer
  loadClients(event?:any):void{
    this.isLoading = true;
    setTimeout(
      ()=>{
        this.isLoading = false;
        //const filterClients = this.clientsRepository.filter(c=>c.nom !== "");
        
        const filterClients = this.clientsRepository.filter((c, index)=>{ 
          const nom = c.nom.toLowerCase();              
          if(index >=   (this.page - 1)*this.limit && index <= ((this.page - 1)*this.limit + this.limit) && (nom.includes(this.query)) ) return true
          else return false
        });

        this.clients = this.clients.concat(filterClients);
        console.log(this.clients);
        if (event) {
          (event as InfiniteScrollCustomEvent).target.complete();
        }
      }, 2000
    ) 

  }

  loadMore(event: any) {
    this.infiniteEvent = event;
    this.page++;
    this.loadClients(event);
 
    if (this.page === this.maximumPages) {
      (event as InfiniteScrollCustomEvent).target.disabled = true;
    }
  }

  handleChange(event) {
    const query = event.target.value.toLowerCase();
    console.log(query);
    this.query = query;
    this.page = 1;
    this.clients = [];
    this.loadClients();
  }

  ngOnInit() {    
    this.state.getClients().subscribe(
      (res)=>{
        this.clientsRepository = res;
        this.page = 1;
        this.clients = [];
        this.loadClients();
      }
    )  
  }

  ionViewWillEnter(){
 
    console.log("ionViewWillEnter" + this.page);
    
  }
  
  
 
  edit(client: any) {  
    this.router.navigate([client.id, 'detail'], { relativeTo: this.route });
  }

  depot(client: any) {  
    
  }


  onLogOut(){
    console.log('Logging out');
  }
  


  onGoToCreate(){   
    this.router.navigate(['create'], { relativeTo: this.route });
  }


  ngOnDestroy(): void {
    //this.timer.clearTimeout();
  }
}
