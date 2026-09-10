import { Routes } from '@angular/router';
import { HomePage } from './pages/home/home.page';
import { GalleryPage } from './pages/gallery/gallery.page';

export const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'on-the-wall', component: GalleryPage },
  { path: '**', redirectTo: '' },
];
