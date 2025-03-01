import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { CameraPage } from './camera/camera.page';
import { AlbumPage } from './album/album.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'camera',
    pathMatch: 'full'
  },
  {
    path: 'camera',
    component: CameraPage
  },
  {
    path: 'album',
    component: AlbumPage
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
