import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FEATURES, SITE, WALL_SHOTS, whatsappUrl } from '../../site.config';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.page.html',
  styleUrl: './home.page.css',
})
export class HomePage {
  readonly site = SITE;
  readonly features = FEATURES;
  readonly walls = WALL_SHOTS;
  readonly wa = whatsappUrl();
  readonly hero = WALL_SHOTS[0];
}
