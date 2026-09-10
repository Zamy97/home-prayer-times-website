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

  /** Full browse order when lightbox is open (walls, then screens). */
  readonly browseAll: LightboxItem[] = [
    ...WALL_SHOTS.map((s) => ({ src: s.src, label: s.label, caption: s.caption })),
    ...LOOKS.map((l) => ({ src: l.src, label: l.label, caption: l.caption })),
  ];

  lightboxItems: LightboxItem[] = [];
  lightboxStart = 0;

  openShot(shot: WallShot): void {
    this.openAt(shot.src);
  }

  openLook(look: { src: string; label: string; caption: string }): void {
    this.openAt(look.src);
  }

  closeLightbox(): void {
    this.lightboxItems = [];
  }

  private openAt(src: string): void {
    const i = this.browseAll.findIndex((item) => item.src === src);
    this.lightboxItems = this.browseAll;
    this.lightboxStart = i >= 0 ? i : 0;
  }
}
