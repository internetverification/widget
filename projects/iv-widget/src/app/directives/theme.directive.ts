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

type ElementThemeConfig = string | object | Array<string | object>;

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
  private stylesToApply: string[] = [];

  private _ivwTheme$ = new BehaviorSubject<ElementThemeConfig>('');

  @Input()
  get ivwTheme() {
    return this._ivwTheme$.value;
  }

  set ivwTheme(value: ElementThemeConfig) {
    this._ivwTheme$.next(value);
  }

  private resetClass() {
    this.addedClass.forEach(clazz => {
      this.renderer.removeClass(this.hostElement.nativeElement, clazz);
    });
    this.addedClass = [];
  }

  private ensureArray(config: ElementThemeConfig) {
    const themes: Array<string | object> = [];
    if (!Array.isArray(config)) {
      themes.push(config);
    } else {
      themes.push(...config);
    }
    return themes;
  }

  ngOnInit(): void {
    // Listen to  global theme config change or element (with this directive on it) theme config change
    combineLatest(this.configService.theme$, this._ivwTheme$).subscribe(
      ([globalThemeConfig, currentElementThemeConfig]) => {
        this.resetClass();
        this.renderer.setAttribute(this.hostElement.nativeElement, 'style', '');
        this.stylesToApply = [];
        const themes = this.ensureArray(currentElementThemeConfig);
        themes.forEach(t => {
          // Support an object or a string
          if (typeof t === 'string') {
            this.setStyleAndClassFromKey(t, globalThemeConfig);
          } else if (typeof t === 'object') {
            // For object we need to process each key of it
            Object.keys(t).forEach(key => {
              if (t[key]) {
                this.setStyleAndClassFromKey(key, globalThemeConfig);
              }
            });
          }
        });

        // Finally we concatenate all style and apply it
        this.renderer.setAttribute(
          this.hostElement.nativeElement,
          'style',
          this.stylesToApply.join('; ')
        );
      }
    );
  }

  private extractKeyFromThemeConfig(key: string, theme: Theme) {
    // Key express an object property as follow picture.button to refer to { picture: { button: {class: ''} }}
    return key.split('.').reduce((prev, current) => prev[current], oc(theme))({
      class: '',
      style: ''
    });
  }

  setStyleAndClassFromKey(str: string, theme: Theme) {
    const classAndStyle = this.extractKeyFromThemeConfig(str, theme);
    if (classAndStyle.class) {
      const classes = classAndStyle.class.split(' ');
      classes.forEach(clazz => {
        this.renderer.addClass(this.hostElement.nativeElement, clazz);
        this.addedClass.push(clazz);
      });
    }
    if (classAndStyle.style) {
      this.stylesToApply.push(classAndStyle.style.replace(/^(.*);?$/, '$1'));
    }
  }
}
