import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PicturesService, UserPhoto } from '../services/pictures.service';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-album',
  templateUrl: './album.page.html',
  styleUrls: ['./album.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule]
})
export class AlbumPage {

  constructor(public picturesService: PicturesService, public actionSheetController: ActionSheetController) {}

  async ngOnInit() {
    console.log('ngOnInit called');
    await this.picturesService.loadPhotos();
    console.log('Photos loaded', this.picturesService.photos);
  }

  addPhoto() {
    console.log('Adding photo to gallery');
    this.picturesService.capturePhoto();
  }

  public async presentActionSheet(photo: UserPhoto, index: number) {
    console.log('Showing action sheet for photo', photo);
    const actionSheet = await this.actionSheetController.create({
      header: 'Photos',
      buttons: [{
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          console.log('Deleting photo', photo);
          this.picturesService.removePhoto(photo, index);
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

}