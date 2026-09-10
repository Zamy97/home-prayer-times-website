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
  readonly hero = WALL_SHOTS.find((s) => s.id === 'home-day') ?? WALL_SHOTS[0];
  readonly mosaic = WALL_SHOTS.slice(0, 6);

  lightbox: LightboxItem | null = null;

  openShot(shot: WallShot): void {
    this.lightbox = { src: shot.src, label: shot.label, caption: shot.caption };
  }

  closeLightbox(): void {
    this.lightbox = null;
  }
}
