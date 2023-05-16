import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertController, IonicModule } from '@ionic/angular';
import { HttpClient} from '@angular/common/http';

import { TranslateModule, TranslateLoader, TranslateService } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
  standalone: true,
  imports: [
    IonicModule, 
    CommonModule, 
    FormsModule,
    TranslateModule,
    ReactiveFormsModule
    ]  
})
export class AuthPage implements OnInit {
  form: FormGroup;
  type = true;
  isLoading: boolean;

  constructor(
    private router: Router,
    private alertController: AlertController,
    private translateService: TranslateService
  ) { 
    this.initForm();
  }

  ngOnInit() {
  }

  customCounterFormatter(inputLength: number, maxLength: number) {
    return `${maxLength - inputLength} characters remaining`;
  }

  initForm() {
    this.form = new FormGroup({
      phone: new FormControl("", {validators: [Validators.required,Validators.pattern(/(?:(?=(^6(9|8|7|6|5)[0-9]{7}$))|(?=(^0\d{8}$)))/g)]}),
      pin: new FormControl("", {validators: [Validators.required, Validators.pattern(/(?:(?=([0-9]{6}))|(?=([0-9]{4})))/g)]})
    });
  }

  changeType() {
    this.type = !this.type;
  }


  onSubmit() {
    if(!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }
    console.log(this.form.value);
    let msgError = this.translateService.instant('auth.signInErrorMsg');
    this.isLoading = true;
    setTimeout(()=>{
      this.isLoading = false;
      console.log(this.form.value);
      if(this.form.value.phone === "696313544"){
        this.router.navigateByUrl('/employe', {replaceUrl: true});
      }else if(this.form.value.phone === "675703916"){
        this.router.navigateByUrl('/client', {replaceUrl: true});
      }else{
        this.showAlert("Impossible de vous connecter pour l'instant!");
      }
      
    },1000)
   
  }

  async showAlert(message) {
    const alert = await this.alertController.create({
      header: this.translateService.instant('auth.signInErrorTitle'),
      message,
      buttons: ['OK'],
    });

    await alert.present();
  }


}
