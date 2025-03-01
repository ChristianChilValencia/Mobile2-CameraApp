import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.page.html',
  styleUrls: ['./camera.page.scss'],
  standalone: true,
  imports: [IonicModule, RouterModule]
})
export class CameraPage {

  constructor() {}

  imageSrc: string | null = null;

  async takePicture(){
    const image = await Camera.getPhoto({
       quality: 90,
       allowEditing: false,
       resultType: CameraResultType.DataUrl,
       source: CameraSource.Camera,
    });

    this.imageSrc = image.dataUrl ?? null;

  }

  async pickFromGallery() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Photos,
    });

    this.imageSrc = image.webPath ?? null;
  }

}