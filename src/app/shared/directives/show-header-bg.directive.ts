import { AfterViewInit, Directive, HostListener, Input, Renderer2 } from '@angular/core';
import { isPlatform, DomController } from '@ionic/angular';


@Directive({
  selector: '[appShowHeaderBg]'
})
export class ShowHeaderBgDirective implements AfterViewInit {
  @Input('appShowHeaderBg') header: any;
  private headerHeight = isPlatform('ios') ? 44 : 56;
  private children: any;

  constructor(
    private renderer: Renderer2,
    private domCtrl: DomController,
  ) { }

  ngAfterViewInit(): void {
    this.header = this.header.el;
    this.children = this.header.children;
    console.log("header");
    console.log(this.header);
  }

  @HostListener('ionScroll', ['$event']) onContentScroll($event: any) {
    const scrollTop: number = $event.detail.scrollTop;
    console.log(scrollTop);
    /*
    let newPosition = -scrollTop;
    if (newPosition < -this.headerHeight) {
      newPosition = -this.headerHeight;
    }
    let newOpacity = 1 - (newPosition / -this.headerHeight);

    this.domCtrl.write(() => {
      this.renderer.setStyle(this.header, 'top', newPosition + 'px');
      for (let c of this.children) {
        this.renderer.setStyle(c, 'opacity', newOpacity);
      }
    });*/
  }

}
