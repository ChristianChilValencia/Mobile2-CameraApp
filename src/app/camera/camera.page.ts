import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { CommonModule } from '@angular/common';
import { PicturesService } from '../services/pictures.service';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.page.html',
  styleUrls: ['./camera.page.scss'],
  standalone: true,
  imports: [IonicModule, RouterModule, CommonModule],
  providers: [PicturesService]
})
export class CameraPage {

  constructor(private picturesService: PicturesService) {}

  imageSrc: string | null = null;

  async captureImage() {
    const image = await Camera.getPhoto({
       quality: 90,
       allowEditing: false,
       resultType: CameraResultType.DataUrl,
       source: CameraSource.Camera,
    });

    this.imageSrc = image.dataUrl ?? null;
  }

  async selectFromGallery() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Photos,
    });

    this.imageSrc = image.webPath ?? null;
  }

}