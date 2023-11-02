import { Component, HostListener, OnInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css'],
})
export class AboutUsComponent implements OnInit {
  public images = [
    'assets/images/icons/mate_logo.png',
    'assets/images/icons/mate_logo.png','assets/images/icons/mate_logo.png','assets/images/icons/mate_logo.png','assets/images/icons/mate_logo.png','assets/images/icons/mate_logo.png','assets/images/icons/mate_logo.png','assets/images/icons/mate_logo.png','assets/images/icons/mate_logo.png','assets/images/icons/mate_logo.png','assets/images/icons/mate_logo.png','assets/images/icons/mate_logo.png','assets/images/icons/mate_logo.png',
  ];

  public offsets: number[] = [];

  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.onWindowScroll();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const viewHeight = window.innerHeight;
    this.offsets = this.images.map((_, index) => {
      const imageElement = this.el.nativeElement.querySelectorAll('img')[index];
      const rect = imageElement.getBoundingClientRect();
      const isVisible = rect.top < viewHeight && rect.bottom >= 0;
      const offset = rect.top - viewHeight;

      if (isVisible) {
        const direction = index % 2 === 0 ? 1 : -1;
        return Math.max(0, Math.min(-offset * direction, 100));
      }
      return 0;
    });
  }
}
