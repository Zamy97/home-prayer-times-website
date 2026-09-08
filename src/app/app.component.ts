import { Component, HostListener } from '@angular/core';
import { FEATURES, HARDWARE_OPTIONAL, HARDWARE_REQUIRED, LAYOUTS, LOOKS, MATERIALS_TOTAL, SITE, whatsappUrl } from './site.config';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  readonly site = SITE;
  readonly features = FEATURES;
  readonly looks = LOOKS;
  readonly layouts = LAYOUTS;
  readonly hardwareRequired = HARDWARE_REQUIRED;
  readonly hardwareOptional = HARDWARE_OPTIONAL;
  readonly materialsTotal = MATERIALS_TOTAL;
  readonly wa = whatsappUrl();

  scrolled = false;

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled = window.scrollY > 24;
  }
}
