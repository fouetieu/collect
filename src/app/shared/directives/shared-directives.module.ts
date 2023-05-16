import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParallaxDirective } from './parallax.directive';
import { HideHeaderDirective } from './hide-header.directive';
import { ShowHeaderBgDirective } from './show-header-bg.directive';
import { ShowHeaderDirective } from './show-header.directive';

@NgModule({
  declarations: [ParallaxDirective, HideHeaderDirective, ShowHeaderBgDirective, ShowHeaderDirective],
  imports: [
    CommonModule
  ],
  exports: [ParallaxDirective, HideHeaderDirective, ShowHeaderBgDirective, ShowHeaderDirective],
})
export class SharedDirectivesModule { }