import { Component } from '@angular/core';
import {
  HARDWARE_OPTIONAL,
  HARDWARE_REQUIRED,
  LOOKS,
  MATERIALS_TOTAL,
  SITE,
  WALL_SHOTS,
  whatsappUrl,
} from '../../site.config';

@Component({
  selector: 'app-gallery-page',
  standalone: true,
  templateUrl: './gallery.page.html',
  styleUrl: './gallery.page.css',
})
export class GalleryPage {
  readonly site = SITE;
  readonly walls = WALL_SHOTS;
  readonly livingDining = WALL_SHOTS.filter(
    (s) => s.id.startsWith('living') || s.id.startsWith('dining')
  );
  readonly bedroomHall = WALL_SHOTS.filter(
    (s) => s.id.startsWith('bedroom') || s.id === 'portrait'
  );
  readonly looks = LOOKS;
  readonly hardwareRequired = HARDWARE_REQUIRED;
  readonly hardwareOptional = HARDWARE_OPTIONAL;
  readonly materialsTotal = MATERIALS_TOTAL;
  readonly wa = whatsappUrl();
}
