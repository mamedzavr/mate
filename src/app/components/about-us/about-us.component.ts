import { Component, OnInit, HostListener, ElementRef } from '@angular/core';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css'],
})
export class AboutUsComponent implements OnInit {
  public offsets: number[] = [];
  public images = [
    'assets/images/icons/mate_logo.png',
    'assets/images/icons/mate_logo.png',
    'assets/images/icons/mate_logo.png',
    'assets/images/icons/mate_logo.png',
    'assets/images/icons/mate_logo.png',
    'assets/images/icons/mate_logo.png',
    'assets/images/icons/mate_logo.png',
    'assets/images/icons/mate_logo.png',
    'assets/images/icons/mate_logo.png',
    'assets/images/icons/mate_logo.png',
    'assets/images/icons/mate_logo.png',
    'assets/images/icons/mate_logo.png',
    'assets/images/icons/mate_logo.png',
    'assets/images/icons/mate_logo.png',
    'assets/images/icons/mate_logo.png',
    'assets/images/icons/mate_logo.png',
    'assets/images/icons/mate_logo.png',
    'assets/images/icons/mate_logo.png',
    'assets/images/icons/mate_logo.png',
    'assets/images/icons/mate_logo.png',
    'assets/images/icons/mate_logo.png',
    'assets/images/icons/mate_logo.png',
  ];

  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.initializeOffsets();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.offsets = this.images.map((_, i) => this.calculateOffset(i));
  }

  private initializeOffsets() {
    this.offsets = this.images.map(() => 0);
  }

  private calculateOffset(index: number): number {
    const element =
      this.el.nativeElement.querySelectorAll('.img-container')[index];
    const rect = element.getBoundingClientRect();
    const direction = index % 2 === 0 ? 1 : -1;

    if (rect.top < window.innerHeight && rect.bottom > 0) {
      const visiblePart =
        Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
      const percentageVisible = visiblePart / (rect.bottom - rect.top);

      return direction * percentageVisible * 50;
    }
    return rect.top < 0 ? direction * 50 : 0;
  }
}
