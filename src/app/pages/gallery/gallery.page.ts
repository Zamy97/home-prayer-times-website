import { Component } from '@angular/core';
import {
  HARDWARE_OPTIONAL,
  HARDWARE_REQUIRED,
  LOOKS,
  MATERIALS_TOTAL,
  SITE,
  WALL_SHOTS,
  WallShot,
  whatsappUrl,
} from '../../site.config';
import { LightboxComponent, LightboxItem } from '../../lightbox/lightbox.component';

@Component({
  selector: 'app-gallery-page',
  standalone: true,
  imports: [LightboxComponent],
  templateUrl: './gallery.page.html',
  styleUrl: './gallery.page.css',
})
export class GalleryPage {
  readonly site = SITE;
  readonly walls = WALL_SHOTS;
  readonly cornerShots = WALL_SHOTS.filter((s) => s.group === 'corner');
  readonly roomShots = WALL_SHOTS.filter((s) => s.group === 'home' || s.group === 'rooms');
  readonly looks = LOOKS;
  readonly hardwareRequired = HARDWARE_REQUIRED;
  readonly hardwareOptional = HARDWARE_OPTIONAL;
  readonly materialsTotal = MATERIALS_TOTAL;
  readonly wa = whatsappUrl();

  lightbox: LightboxItem | null = null;

  openShot(shot: WallShot): void {
    this.lightbox = { src: shot.src, label: shot.label, caption: shot.caption };
  }

  openLook(look: { src: string; label: string; caption: string }): void {
    this.lightbox = { src: look.src, label: look.label, caption: look.caption };
  }

  closeLightbox(): void {
    this.lightbox = null;
  }
}
