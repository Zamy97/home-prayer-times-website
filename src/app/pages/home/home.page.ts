import { Component } from '@angular/core';
import {
  FEATURES,
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
  selector: 'app-home-page',
  standalone: true,
  imports: [LightboxComponent],
  templateUrl: './home.page.html',
  styleUrl: './home.page.css',
})
export class HomePage {
  readonly site = SITE;
  readonly features = FEATURES;
  readonly walls = WALL_SHOTS;
  readonly hardwareRequired = HARDWARE_REQUIRED;
  readonly hardwareOptional = HARDWARE_OPTIONAL;
  readonly materialsTotal = MATERIALS_TOTAL;
  readonly wa = whatsappUrl();
  readonly hero = WALL_SHOTS.find((s) => s.id === 'corner-day-living') ?? WALL_SHOTS[0];
  readonly mosaic = WALL_SHOTS.slice(0, 6);

  readonly browseAll: LightboxItem[] = [
    ...WALL_SHOTS.map((s) => ({ src: s.src, label: s.label, caption: s.caption })),
    ...LOOKS.map((l) => ({ src: l.src, label: l.label, caption: l.caption })),
  ];

  lightboxItems: LightboxItem[] = [];
  lightboxStart = 0;

  openAll(start = 0): void {
    this.lightboxItems = this.browseAll;
    this.lightboxStart = Math.max(0, Math.min(start, this.browseAll.length - 1));
  }

  openShot(shot: WallShot): void {
    const i = this.browseAll.findIndex((item) => item.src === shot.src);
    this.openAll(i >= 0 ? i : 0);
  }

  closeLightbox(): void {
    this.lightboxItems = [];
  }
}
