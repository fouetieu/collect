import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Preferences } from '@capacitor/preferences';
import { BehaviorSubject } from 'rxjs';
import { AppPhoto } from 'src/app/shared/models/photo.model';
import { ModalController, Platform } from '@ionic/angular';
import { Capacitor } from '@capacitor/core';
import { CropperComponent } from 'src/app/shared/components/cropper/cropper.component';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  public technicienPicture = new BehaviorSubject<AppPhoto>(null);
  public technicienCroppedPicture = new BehaviorSubject<AppPhoto>(null);
  public achatPictures = new BehaviorSubject<AppPhoto[]>([]);
  public achatCroppedPictures = new BehaviorSubject<AppPhoto[]>([]);

  public _technicienPicture = this.technicienPicture.asObservable();
  public _technicienCroppedPicture = this.technicienCroppedPicture.asObservable();
  public _achatPictures = this.achatPictures.asObservable();
  public _achatCroppedPictures = this.achatCroppedPictures.asObservable();
  private platform: Platform;

  constructor(platform: Platform,  private modalCtrl: ModalController) {
    this.platform = platform;
  }

  public async addTechnicienPicture() {
    // Take a photo
    const capturedPhoto = await Camera.getPhoto({
      //resultType: CameraResultType.Uri,
      resultType: CameraResultType.Base64,
      allowEditing: false,
      source: CameraSource.Camera,
      quality: 70
    });

    //const savedImageFile = await this.savePicture(capturedPhoto);
    const photo = {
      filepath: "",
      webviewPath: "",
      base64:`data:image/jpeg;base64,${capturedPhoto.base64String}`,
      blob:null,
      cropped: null
    }

    this.technicienPicture.next(photo);
    const modal = await this.modalCtrl.create({
      component: CropperComponent,
      componentProps:{
        type:'single'
      }
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      console.log(`${data}!`);
    }
  }

 
  public async addachatPicture(): Promise<boolean> {
    this.achatPictures.subscribe();
    if(this.achatPictures.getValue().length > 2){
      return false;
    }
    // Take a photo
    const capturedPhoto = await Camera.getPhoto({
      //resultType: CameraResultType.Uri,
      resultType: CameraResultType.Base64,
      allowEditing: false,
      source: CameraSource.Camera,
      quality: 70
    });

    //const savedImageFile = await this.savePicture(capturedPhoto);
    const photo = {
      filepath: "",
      webviewPath: "",
      base64:`data:image/jpeg;base64,${capturedPhoto.base64String}`,
      blob:null,
      cropped: null
    }
    
    const photos = [photo, ...this.achatPictures.getValue()]
    this.achatPictures.next(photos);
    const modal = await this.modalCtrl.create({
      component: CropperComponent,
      componentProps:{
        type:'galery'
      }
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      console.log(`${data}!`);
    }

    return true;
  }

  public delachatPicture(photo : AppPhoto) { 
    console.log(photo); 
    this.achatCroppedPictures.subscribe();
    this.achatPictures.subscribe();
    const ophotos = this.achatPictures.getValue().filter((ap) => ap.base64 !== photo.base64);
    const photos = this.achatCroppedPictures.getValue().filter((ap) => ap.cropped !== photo.cropped);
    console.log(ophotos);
    console.log(photos);
     this.achatPictures.next(ophotos);
    this.achatCroppedPictures.next(photos);
  }


 // Save picture to file on device
  private async savePicture(photo: Photo) {
    // Convert photo to base64 format, required by Filesystem API to save
    const base64Data = await this.readAsBase64(photo);

    // Write the file to the data directory
    const fileName = new Date().getTime() + '.jpeg';
    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: Directory.Data
    });

    if (this.platform.is('hybrid')) {
      // Display the new image by rewriting the 'file://' path to HTTP
      // Details: https://ionicframework.com/docs/building/webview#file-protocol
      return {
        filepath: savedFile.uri,
        webviewPath: Capacitor.convertFileSrc(savedFile.uri),
      };
    }
    else {
      // Use webPath to display the new image instead of base64 since it's
      // already loaded into memory
      return {
        filepath: fileName,
        webviewPath: photo.webPath
      };
    }
  }

  private async readAsBase64(photo: Photo) {
    // "hybrid" will detect Cordova or Capacitor
    if (this.platform.is('hybrid')) {
      // Read the file into base64 format
      const file = await Filesystem.readFile({
        path: photo.path
      });
  
      return file.data;
    }
    else {
      // Fetch the photo, read as a blob, then convert to base64 format
      const response = await fetch(photo.webPath!);
      const blob = await response.blob();
  
      return await this.convertBlobToBase64(blob) as string;
    }
  }
  
  private convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
        resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });
}
