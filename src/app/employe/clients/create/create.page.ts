import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule, LoadingController, NavController } from '@ionic/angular';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { finalize } from 'rxjs';
import { PhotoService } from 'src/app/core/services/photo.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { AppPhoto } from 'src/app/shared/models/photo.model';
import { StateService } from 'src/app/core/services/state.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule, TranslateModule]
})
export class CreatePage implements OnInit {
  profileSelected: {id:number,selected:boolean,principal:boolean}[] = [];
  picture:AppPhoto = {
    filepath: '',
    webviewPath: 'assets/icons/user.png',
    cropped: 'assets/icons/user.png',
    blob: null,
    base64: null

  };
  defaultPictureUrl='assets/icons/user.png';
  form: FormGroup;
  constructor(
    private navCtrl: NavController,
    public photoService: PhotoService,   
    protected loadingCtrl: LoadingController,
    protected toastService: ToastService,
    private translate: TranslateService,
    private state: StateService
  ) {  this.initForm();
  }

   initForm() {
    this.form = new FormGroup({
      nom: new FormControl("", {validators: [Validators.required]}),
      telephone: new FormControl("", {validators: [Validators.required, Validators.pattern(/^6(9|8|7|5)[0-9]{7}$/)]}),
      cni: new FormControl("", {validators: [Validators.required, Validators.minLength(11)]}),
      sex: new FormControl("", {validators: [Validators.required]}),
      localisation: new FormControl("", {validators: [Validators.required]}),
      activite: new FormControl("", {validators: [Validators.required]}),
      email: new FormControl("", {validators: [Validators.email]}),
      matricule: new FormControl("")
    });
  }

  ngOnInit() {
    this.photoService._technicienCroppedPicture.subscribe(
      (photo)=>{
        console.log(photo);
        if(photo) this.picture = photo;
      }
    );
  }


imageUri(): any{
    if(!this.picture.cropped){
      return 'url(assets/icons/user.png)'; 
    }else{
      return  this.picture.cropped;
    }
}

onGoBack(){
  console.log("GO back");
  this.navCtrl.back();
}

addPhoto() {
  this.photoService.addTechnicienPicture();
}

async onSaveClick(){
  console.log(this.form.value);
  if(!this.form.valid) {
    this.form.markAllAsTouched();
    this.toastService.errorToast(this.translate.instant("app.clients.create.fillAllRequiredField"), 'top');
    return;
  }
 
  //get image
  const formData = new FormData();
  
  if(this.picture.cropped != this.defaultPictureUrl){      
    formData.append('file', this.picture.blob, `image-${new Date().getTime()}.jpeg`);     
  }
  
  if(formData.getAll('file').length <= 0){
    this.toastService.errorToast(this.translate.instant("app.client.create.selectPicture"), 'top');
    return;
  }

  
  //form value
  //add matricule
  this.form.get('matricule').setValue("000"+ (this.state.clients$.getValue().length + 1));
  console.log(this.form.value);
  formData.append('customer', JSON.stringify(this.form.value));
  
  //Save
  const loading = await this.loadingCtrl.create({
      message: 'Enregistrement en cours...',
  });
  await loading.present();

  setTimeout(
    ()=>{
      loading.dismiss();
      this.state.addClient(this.form.value,  this.picture);
      this.toastService.successToast('Client crée avec succès.', 'top')
      this.navCtrl.back();
    }, 2000
  ) ;

 
    
}


}
