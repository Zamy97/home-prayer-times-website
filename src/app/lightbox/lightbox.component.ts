import { Component, HostListener, input, output } from '@angular/core';

export type LightboxItem = {
  src: string;
  label: string;
  caption?: string;
};

@Component({
  selector: 'app-lightbox',
  standalone: true,
  template: `
    @if (item(); as open) {
      <div
        class="lb"
        role="dialog"
        aria-modal="true"
        [attr.aria-label]="open.label"
        (click)="onBackdrop($event)"
      >
        <button class="lb__close" type="button" (click)="closed.emit()" aria-label="Close">
          Close
        </button>
        <figure class="lb__figure" (click)="$event.stopPropagation()">
          <img [src]="open.src" [alt]="open.label" />
          <figcaption>
            <strong>{{ open.label }}</strong>
            @if (open.caption) {
              <span>{{ open.caption }}</span>
            }
          </figcaption>
        </figure>
      </div>
    }
  `,
  styles: [
    `
      .lb {
        position: fixed;
        inset: 0;
        z-index: 100;
        display: grid;
        place-items: center;
        padding: 1.25rem;
        background: rgba(8, 10, 12, 0.82);
        backdrop-filter: blur(10px);
        animation: lb-in 0.22s ease;
      }

      .lb__close {
        position: absolute;
        top: 1rem;
        right: 1rem;
        z-index: 2;
        border: 0;
        border-radius: 980px;
        padding: 0.55rem 1rem;
        background: #f5f5f7;
        color: #111;
        font: inherit;
        font-size: 0.85rem;
        font-weight: 700;
        cursor: pointer;
      }

      .lb__figure {
        margin: 0;
        max-width: min(1100px, 96vw);
        max-height: 90vh;
        display: grid;
        gap: 0.85rem;
      }

      .lb__figure img {
        max-width: 100%;
        max-height: min(78vh, 900px);
        width: auto;
        height: auto;
        margin: 0 auto;
        border-radius: 1rem;
        box-shadow: 0 30px 80px rgba(0, 0, 0, 0.45);
        background: #111;
      }

      .lb__figure figcaption {
        text-align: center;
        color: #f5f5f7;
        display: grid;
        gap: 0.2rem;
      }

      .lb__figure strong {
        font-size: 1rem;
        letter-spacing: -0.02em;
      }

      .lb__figure span {
        color: rgba(245, 245, 247, 0.68);
        font-size: 0.9rem;
      }

      @keyframes lb-in {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }
    `,
  ],
})
export class LightboxComponent {
  readonly item = input<LightboxItem | null>(null);
  readonly closed = output<void>();

  @HostListener('document:keydown.escape')
  onEsc(): void {
    if (this.item()) this.closed.emit();
  }

  onBackdrop(event: MouseEvent): void {
    if (event.target === event.currentTarget) this.closed.emit();
  }
}
