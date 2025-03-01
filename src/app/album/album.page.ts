import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PhotoService, UserPhoto } from '../services/photo.service';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-album',
  templateUrl: './album.page.html',
  styleUrls: ['./album.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule]
})
export class AlbumPage {

  constructor(public photoService: PhotoService, public actionSheetController: ActionSheetController) {}

  async ngOnInit() {
    console.log('ngOnInit called');
    await this.photoService.loadSaved();
    console.log('Photos loaded', this.photoService.photos);
  }

  addPhotoToGallery() {
    console.log('Adding photo to gallery');
    this.photoService.addNewToGallery();
  }

  public async showActionSheet(photo: UserPhoto, position: number) {
    console.log('Showing action sheet for photo', photo);
    const actionSheet = await this.actionSheetController.create({
      header: 'Photos',
      buttons: [{
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          console.log('Deleting photo', photo);
          this.photoService.deletePicture(photo, position);
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