import { Injectable, Type } from '@angular/core';
import {ToastController } from '@ionic/angular';

export type position = "top" | "bottom" | "middle";

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  private myToast: any;

  constructor(
    private toast: ToastController
  ) { }

  successToast(msg:any, position?:position) {
    this.myToast = this.toast.create({
      position: position,
      message: msg,
      duration: 2000,
      color: 'success'
    }).then((toastData) => {
      console.log(toastData);
      toastData.present();
    });
  }

  errorToast(msg:any, position?:position) {
    this.myToast = this.toast.create({
      position: position,
      message: msg,
      duration: 2000,
      color: 'danger'
    }).then((toastData) => {
      console.log(toastData);
      toastData.present();
    });
  }

  showToast(position:position, msg:any, duration: number, color:string) {
    this.myToast = this.toast.create({
      position: position,
      message: msg,
      duration: duration,
      color: color,
      buttons: [
         {
          icon: 'close-circle',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    }).then((toastData) => {
      console.log(toastData);
      toastData.present();
    });
  }
  
  HideToast() {
    this.myToast = this.toast.dismiss();
  }
  
}
