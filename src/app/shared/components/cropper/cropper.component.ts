import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import {
  ImageCroppedEvent,
  ImageCropperComponent,
  ImageCropperModule,
  ImageTransform,
} from 'ngx-image-cropper';
import { Capacitor } from '@capacitor/core';
import { PhotoService } from 'src/app/core/services/photo.service';
import { AppPhoto } from '../../models/photo.model';

@Component({
  selector: 'app-cropper',
  templateUrl: './cropper.component.html',
  styleUrls: ['./cropper.component.scss'],
  standalone: true,
  imports: [
    IonicModule, 
    CommonModule,     
    TranslateModule,   
    ImageCropperModule
  ],
})
export class CropperComponent  implements OnInit {
  @ViewChild('cropper') cropper: ImageCropperComponent;
  type : string;
  myImage: any = null;
  croppedImage: any = '';
  transform: ImageTransform = {};
  isMobile = false; // Capacitor.getPlatform() !== 'web';
  picture:AppPhoto | null = null;
  pictures:AppPhoto[] = [];
  constructor(public photoService: PhotoService, private modalCtrl : ModalController) { }

  ngOnInit() {
    console.log(this.type);
    if(this.type== 'single'){
      this.photoService._technicienPicture.subscribe(
        (photo)=>{
          console.log(photo);
          if(photo) this.picture = photo;
        }
      );
    }
    if(this.type == 'galery'){
      this.photoService._achatPictures.subscribe(
        (photos)=>{
          console.log(photos);
          if(photos){
            this.picture = photos[0];
            this.pictures = photos;
          } 
        }
      );
    }

    
  }
  
   // Called when we finished editing (because autoCrop is set to false)
   imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }
 
  // We encountered a problem while loading the image
  loadImageFailed() {
    console.log('Image load failed!');
  }
 
  // Manually trigger the crop
  cropImage() {
    this.cropper.crop();    
    if(this.type == 'single'){
      this.picture.cropped = this.croppedImage;
      this.picture.blob = this.base64ToFile(this.croppedImage); 
      this.photoService.technicienCroppedPicture.next(this.picture);
    }else{
      const photos = [...this.photoService.achatPictures.getValue()];
      photos[0].cropped = this.croppedImage;
      photos[0].blob = this.base64ToFile(this.croppedImage); 
      this.photoService.achatCroppedPictures.next(photos);
    }
    
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  async base64ToBlob(base64Data: string): Promise<Blob> {
    const parts = base64Data.split(';base64,');
    const contentType = parts[0].split(':')[1];
    const b64Data = parts[1];
    const byteCharacters = atob(b64Data);
    const byteArrays = [];
  
    for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
      const slice = byteCharacters.slice(offset, offset + 1024);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
  
    return new Blob(byteArrays, {type: contentType});
  }

  base64ToFile(base64Image: string): Blob {
    const split = base64Image.split(',');
    const type = split[0].replace('data:', '').replace(';base64', '');
    const byteString = atob(split[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i += 1) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], {type});
  }

  cancel() {
    if(this.type == 'single'){      
      this.photoService.technicienPicture.next(null);
    }else{
      this.pictures.shift();
      this.photoService.achatPictures.next(this.pictures);
    }
    return this.modalCtrl.dismiss(null, 'cancel');
  }
 
  // Discard all changes
  discardChanges() {
    this.myImage = null;
    this.croppedImage = null;
  }
 
  // Edit the image
  rotate() {
    const newValue = ((this.transform.rotate ?? 0) + 90) % 360;
 
    this.transform = {
      ...this.transform,
      rotate: newValue,
    };
  }
 
  flipHorizontal() {
    this.transform = {
      ...this.transform,
      flipH: !this.transform.flipH,
    };
  }
 
  flipVertical() {
    this.transform = {
      ...this.transform,
      flipV: !this.transform.flipV,
    };
  }

}
