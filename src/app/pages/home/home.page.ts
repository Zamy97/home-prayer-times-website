import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FEATURES, SITE, WALL_SHOTS, WallShot, whatsappUrl } from '../../site.config';
import { LightboxComponent, LightboxItem } from '../../lightbox/lightbox.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [RouterLink, LightboxComponent],
  templateUrl: './home.page.html',
  styleUrl: './home.page.css',
})
export class HomePage {
  readonly site = SITE;
  readonly features = FEATURES;
  readonly walls = WALL_SHOTS;
  readonly wa = whatsappUrl();
  readonly hero = WALL_SHOTS.find((s) => s.id === 'corner-day-living') ?? WALL_SHOTS[0];
  readonly mosaic = WALL_SHOTS.slice(0, 6);

  readonly browseAll: LightboxItem[] = WALL_SHOTS.map((s) => ({
    src: s.src,
    label: s.label,
    caption: s.caption,
  }));

  lightboxItems: LightboxItem[] = [];
  lightboxStart = 0;

  openShot(shot: WallShot): void {
    const i = this.browseAll.findIndex((item) => item.src === shot.src);
    this.lightboxItems = this.browseAll;
    this.lightboxStart = i >= 0 ? i : 0;
  }

  closeLightbox(): void {
    this.lightboxItems = [];
  }
}
