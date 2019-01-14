import {
  Directive,
  Renderer2,
  ElementRef,
  Input,
  OnInit,
  Inject
} from '@angular/core';
import { oc } from 'ts-optchain';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';

export const THEME_PROVIDER_TOKEN = 'theme_provider';

type Theme = any;

export interface ThemeProvider {
  theme$: Observable<Theme>;
}

@Directive({
  selector: '[ivwTheme]'
})
export class ThemeDirective implements OnInit {
  constructor(
    private renderer: Renderer2,
    private hostElement: ElementRef,
    @Inject(THEME_PROVIDER_TOKEN)
    private configService: ThemeProvider
  ) {}

  private addedClass: string[] = [];

  private _ivwTheme$ = new BehaviorSubject<
    string | object | Array<string | object>
  >('');

  @Input()
  get ivwTheme() {
    return this._ivwTheme$.value;
  }

  set ivwTheme(value: string | object | Array<string | object>) {
    this._ivwTheme$.next(value);
  }

  private resetClass() {
    this.addedClass.forEach(clazz => {
      this.renderer.removeClass(this.hostElement.nativeElement, clazz);
    });
    this.addedClass = [];
  }

  ngOnInit(): void {
    combineLatest(this.configService.theme$, this._ivwTheme$).subscribe(
      ([theme, ivwTheme]) => {
        this.resetClass();
        this.renderer.setAttribute(this.hostElement.nativeElement, 'style', '');
        const themes = [];
        if (!Array.isArray(ivwTheme)) {
          themes.push(ivwTheme);
        } else {
          themes.push(...ivwTheme);
        }
        themes.forEach(t => {
          if (typeof t === 'string') {
            this.processString(t, theme);
          } else if (typeof t === 'object') {
            Object.keys(t).forEach(key => {
              if (t[key]) {
                this.processString(key, theme);
              }
            });
          }
        });
      }
    );
  }

  processString(str: string, theme: Theme) {
    const classAndStyle = str
      .split('.')
      .reduce((prev, current) => prev[current], oc(theme))({
      class: '',
      style: ''
    });
    if (classAndStyle.class) {
      const classes = classAndStyle.class.split(' ');
      classes.forEach(clazz => {
        this.renderer.addClass(this.hostElement.nativeElement, clazz);
        this.addedClass.push(clazz);
      });
    }
    if (classAndStyle.style) {
      this.renderer.setAttribute(
        this.hostElement.nativeElement,
        'style',
        classAndStyle.style
      );
    }
  }
}
