import { Directive, Renderer2, ElementRef, Input, OnInit } from '@angular/core';
import { ConfigService } from '../config.service';
import { Theme } from '../types';
import { oc } from 'ts-optchain';

@Directive({
  selector: '[ivwTheme]'
})
export class ThemeDirective implements OnInit {
  constructor(
    private renderer: Renderer2,
    private hostElement: ElementRef,
    private configService: ConfigService
  ) {}
  @Input()
  ivwTheme: string;
  ngOnInit(): void {
    this.configService.theme$.subscribe((theme: Theme) => {
      const classAndStyle = this.ivwTheme
        .split('.')
        .reduce((prev, current) => prev[current], oc(theme))({
        class: '',
        style: ''
      });
      if (classAndStyle.class) {
        this.renderer.addClass(
          this.hostElement.nativeElement,
          classAndStyle.class
        );
      }
      if (classAndStyle) {
        this.renderer.setAttribute(
          this.hostElement.nativeElement,
          'style',
          classAndStyle.style
        );
      }
    });
  }
}
