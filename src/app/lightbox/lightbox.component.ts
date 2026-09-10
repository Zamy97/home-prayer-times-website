import { Component, HostListener, computed, input, linkedSignal, output } from '@angular/core';

export type LightboxItem = {
  src: string;
  label: string;
  caption?: string;
};

@Component({
  selector: 'app-lightbox',
  standalone: true,
  template: `
    @if (active(); as open) {
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

        @if (canNav()) {
          <button
            class="lb__nav lb__nav--prev"
            type="button"
            (click)="prev(); $event.stopPropagation()"
            aria-label="Previous image"
          >
            ‹
          </button>
          <button
            class="lb__nav lb__nav--next"
            type="button"
            (click)="next(); $event.stopPropagation()"
            aria-label="Next image"
          >
            ›
          </button>
        }

        <figure class="lb__figure" (click)="$event.stopPropagation()">
          <img [src]="open.src" [alt]="open.label" />
          <figcaption>
            <strong>{{ open.label }}</strong>
            @if (open.caption) {
              <span>{{ open.caption }}</span>
            }
            @if (canNav()) {
              <span class="lb__count">{{ index() + 1 }} / {{ items().length }}</span>
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
        background: rgba(8, 10, 12, 0.84);
        backdrop-filter: blur(10px);
        animation: lb-in 0.22s ease;
      }

      .lb__close {
        position: absolute;
        top: 1rem;
        right: 1rem;
        z-index: 3;
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

      .lb__nav {
        position: absolute;
        top: 50%;
        z-index: 3;
        transform: translateY(-50%);
        width: 2.75rem;
        height: 2.75rem;
        border: 0;
        border-radius: 50%;
        background: rgba(245, 245, 247, 0.94);
        color: #111;
        font-size: 1.75rem;
        line-height: 1;
        cursor: pointer;
        display: grid;
        place-items: center;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
      }

      .lb__nav:hover {
        background: #fff;
      }

      .lb__nav--prev {
        left: max(0.75rem, 2vw);
      }

      .lb__nav--next {
        right: max(0.75rem, 2vw);
      }

      .lb__figure {
        margin: 0;
        max-width: min(1100px, 92vw);
        max-height: 90vh;
        display: grid;
        gap: 0.85rem;
      }

      .lb__figure img {
        max-width: 100%;
        max-height: min(74vh, 880px);
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

      .lb__count {
        font-size: 0.78rem !important;
        letter-spacing: 0.06em;
        text-transform: uppercase;
        color: rgba(245, 245, 247, 0.5) !important;
      }

      @keyframes lb-in {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }

      @media (max-width: 640px) {
        .lb__nav {
          width: 2.35rem;
          height: 2.35rem;
          font-size: 1.45rem;
        }
      }
    `,
  ],
})
export class LightboxComponent {
  readonly items = input<LightboxItem[]>([]);
  readonly startIndex = input(0);
  readonly closed = output<void>();

  /** Resets when parent changes startIndex; local next/prev updates freely. */
  readonly index = linkedSignal(() => {
    const n = this.items().length;
    if (!n) return 0;
    return Math.max(0, Math.min(this.startIndex(), n - 1));
  });

  readonly active = computed(() => {
    const list = this.items();
    if (!list.length) return null;
    const i = ((this.index() % list.length) + list.length) % list.length;
    return list[i] ?? null;
  });

  readonly canNav = computed(() => this.items().length > 1);

  prev(): void {
    const n = this.items().length;
    if (n < 2) return;
    this.index.update((i) => (i - 1 + n) % n);
  }

  next(): void {
    const n = this.items().length;
    if (n < 2) return;
    this.index.update((i) => (i + 1) % n);
  }

  @HostListener('document:keydown.escape')
  onEsc(): void {
    if (this.active()) this.closed.emit();
  }

  @HostListener('document:keydown.arrowleft')
  onLeft(): void {
    if (this.active()) this.prev();
  }

  @HostListener('document:keydown.arrowright')
  onRight(): void {
    if (this.active()) this.next();
  }

  onBackdrop(event: MouseEvent): void {
    if (event.target === event.currentTarget) this.closed.emit();
  }
}
