import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { __decorate, __metadata, __assign, __param, __extends } from 'tslib';
import { Component, Injectable, Input, Output, EventEmitter, NgModule, Directive, Inject, Renderer2, ElementRef, Pipe, ComponentFactoryResolver, ApplicationRef, Injector, ViewChild, TemplateRef, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { DomSanitizer, BrowserModule } from '@angular/platform-browser';
import { ActivatedRoute, Router, NavigationEnd, RouterModule } from '@angular/router';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { ElementZoneStrategyFactory } from 'elements-zone-strategy';
import { Store, StoreModule } from '@ngrx/store';
import { BehaviorSubject, of, combineLatest, timer, concat, Observable, throwError, ReplaySubject, from, Subject } from 'rxjs';
import { filter, take, map, first, mergeMap, catchError, switchMap, tap, finalize, startWith, debounceTime, distinctUntilKeyChanged, takeUntil } from 'rxjs/operators';
import { Location, CommonModule, DOCUMENT } from '@angular/common';
import { oc } from 'ts-optchain';
import { NgControl, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Effect, Actions, ofType, EffectsModule } from '@ngrx/effects';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TemplatePortal, PortalModule } from '@angular/cdk/portal';

var isDefined = filter(function (x) { return !!x; });

var ActionTypes;
(function (ActionTypes) {
    ActionTypes["SUBMIT_STEP"] = "[STEPS] Submit step";
    ActionTypes["INIT_STEP"] = "[STEPS] Init steps";
    ActionTypes["PROGRESS_UPDATE"] = "[STEPS] Progress update";
    ActionTypes["SUBMIT_STEP_ERROR"] = "[STEPS] Submit step errors";
})(ActionTypes || (ActionTypes = {}));
var SubmitStepAction = /** @class */ (function () {
    function SubmitStepAction(stepId, stepType, payload) {
        this.stepId = stepId;
        this.stepType = stepType;
        this.payload = payload;
        this.type = ActionTypes.SUBMIT_STEP;
    }
    return SubmitStepAction;
}());
var InitStepAction = /** @class */ (function () {
    function InitStepAction(payload) {
        this.payload = payload;
        this.type = ActionTypes.INIT_STEP;
    }
    return InitStepAction;
}());
var ProgressUpdateAction = /** @class */ (function () {
    function ProgressUpdateAction(stepId, payload) {
        this.stepId = stepId;
        this.payload = payload;
        this.type = ActionTypes.PROGRESS_UPDATE;
    }
    return ProgressUpdateAction;
}());
var SubmitStepErrorAction = /** @class */ (function () {
    function SubmitStepErrorAction(stepId, error) {
        this.stepId = stepId;
        this.error = error;
        this.type = ActionTypes.SUBMIT_STEP_ERROR;
    }
    return SubmitStepErrorAction;
}());

var StepPageComponent = /** @class */ (function () {
    function StepPageComponent(activatedRoute, location, router, store) {
        this.activatedRoute = activatedRoute;
        this.location = location;
        this.router = router;
        this.store = store;
        this.stepState$ = this.store.select('steps', String(this.currentStepId));
    }
    StepPageComponent.prototype.ngOnInit = function () { };
    StepPageComponent.prototype.previousStep = function () {
        this.location.back();
    };
    Object.defineProperty(StepPageComponent.prototype, "currentStepId", {
        get: function () {
            return Math.max(this.router.config.indexOf(this.activatedRoute.routeConfig), 0);
        },
        enumerable: true,
        configurable: true
    });
    StepPageComponent.prototype.nextStep = function () {
        var _this = this;
        var i = this.currentStepId;
        this.stepState$.pipe(take(1)).subscribe(function (steps) {
            var next = steps[i];
            while (!(i < _this.router.config.length - 1) &&
                next.progress.state === 'SUCCESS') {
                next = steps[++i];
            }
            _this.router.navigate([_this.router.config[i + 1].path]);
        });
    };
    StepPageComponent.prototype.submitStep = function (stepPayload) {
        var _this = this;
        this.stepState$.pipe(take(1)).subscribe(function (stepState) {
            _this.store.dispatch(new SubmitStepAction(_this.currentStepId, stepState.config.type, stepPayload));
        });
    };
    StepPageComponent = __decorate([
        Component({
            selector: 'ivw-step-page',
            templateUrl: './step-page.component.html',
            styleUrls: ['./step-page.component.scss']
        }),
        __metadata("design:paramtypes", [ActivatedRoute,
            Location,
            Router,
            Store])
    ], StepPageComponent);
    return StepPageComponent;
}());

var SummaryPageComponent = /** @class */ (function () {
    function SummaryPageComponent(store) {
        this.store = store;
        this.steps$ = this.store.select('steps').pipe(map(function (steps) {
            return Object.keys(steps)
                .map(function (key) { return steps[key]; })
                .filter(function (step) { return !step.config.hideInSummary; });
        }));
        this.isReady$ = this.steps$.pipe(map(function (steps) {
            return steps.every(function (s) { return s.progress.state === 'SUCCESS'; });
        }));
    }
    SummaryPageComponent.prototype.ngOnInit = function () { };
    SummaryPageComponent = __decorate([
        Component({
            selector: 'ivw-summary-page',
            templateUrl: './summary-page.component.html',
            styleUrls: ['./summary-page.component.scss']
        }),
        __metadata("design:paramtypes", [Store])
    ], SummaryPageComponent);
    return SummaryPageComponent;
}());

var ConfigService = /** @class */ (function () {
    function ConfigService(router, translationService, store) {
        var _this = this;
        this.router = router;
        this.translationService = translationService;
        this.store = store;
        this._theme$ = new BehaviorSubject(null);
        this._config$ = new BehaviorSubject(null);
        this._steps$ = new BehaviorSubject(null);
        this._lang$ = new BehaviorSubject(null);
        this.initLangWatching();
        this.initSteps();
        // FIXME: Hack to fix routing problem in angular element
        window.addEventListener('hashchange', function () {
            _this.router.navigate([window.location.hash.replace('#', '')]);
        });
    }
    Object.defineProperty(ConfigService.prototype, "theme", {
        get: function () {
            return this._theme$.value;
        },
        set: function (value) {
            this._theme$.next(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConfigService.prototype, "config", {
        get: function () {
            return this._config$.value;
        },
        set: function (value) {
            this._config$.next(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConfigService.prototype, "steps", {
        get: function () {
            return this._steps$.value;
        },
        set: function (value) {
            this._steps$.next(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConfigService.prototype, "lang", {
        get: function () {
            return this._lang$.value;
        },
        set: function (value) {
            this._lang$.next(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConfigService.prototype, "currentLang", {
        get: function () {
            return this.translationService.currentLang;
        },
        set: function (value) {
            this.translationService.use(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConfigService.prototype, "theme$", {
        get: function () {
            return this._theme$.pipe(map(function (theme) {
                return Object.assign({
                    summary: {
                        step: {
                            details: {
                                file: {
                                    style: "\n                    width: 100%;\n                    display: flex;\n                    justify-content: space-between;\n                    "
                                }
                            },
                            bar: {
                                style: "\n                    width: 100%;\n                    display: flex;\n                    justify-content: space-between;\n                  "
                            }
                        }
                    }
                }, theme || {});
            }));
        },
        enumerable: true,
        configurable: true
    });
    ConfigService.prototype.initLangWatching = function () {
        var _this = this;
        this._lang$.pipe(isDefined).subscribe(function (lang) {
            Object.entries(lang).forEach(function (_a) {
                var key = _a[0], values = _a[1];
                _this.translationService.setTranslation(key, values, true);
            });
        });
        this.translationService.setDefaultLang('en');
    };
    ConfigService.prototype.initSteps = function () {
        var _this = this;
        this._steps$.subscribe(function (steps) {
            _this.router.config.splice(0, _this.router.config.length);
            if (Array.isArray(steps)) {
                var stepsWithRoute = steps.map(function (x, i) { return (__assign({}, x, { id: i, route: "step_" + i })); });
                stepsWithRoute.forEach(function (step, i) {
                    _this.router.config.push({
                        path: step.route,
                        component: StepPageComponent,
                        data: step
                    });
                });
                _this.router.config.push({
                    path: 'ivw-summary',
                    component: SummaryPageComponent
                });
                _this.store.dispatch(new InitStepAction(stepsWithRoute));
            }
            // FIXME: Hack to fix routing problem in angular element
            _this.router.navigate(['step_0']);
        });
    };
    ConfigService.prototype.addConfig = function (config) {
        // this._config$.next(config);
        this.steps = config.steps;
        this.theme = config.theme;
        this.lang = config.lang;
    };
    ConfigService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [Router,
            TranslateService,
            Store])
    ], ConfigService);
    return ConfigService;
}());

var AppComponent = /** @class */ (function () {
    function AppComponent(router, configService, store) {
        var _this = this;
        this.router = router;
        this.configService = configService;
        this.store = store;
        this.currentStepId$ = this.router.events.pipe(filter(function (e) { return e instanceof NavigationEnd; }), map(function (r) {
            return _this.router.config.findIndex(function (x) { return r.url.replace('/', '') === x.path; });
        }));
        this.steps$ = this.store.select('steps').pipe(map(function (steps) {
            return Object.keys(steps).map(function (key) { return steps[key]; });
        }), map(function (steps) {
            var bSteps = steps.map(function (step) {
                return {
                    enabled: true,
                    state: oc(step).progress.state('BLANK')
                };
            });
            return bSteps.concat([
                {
                    enabled: steps
                        .filter(function (s) { return !s.config.hideInSummary; })
                        .every(function (s) { return oc(s).progress.state('BLANK') !== 'BLANK'; }),
                    state: 'BLANK'
                }
            ]);
        }));
    }
    Object.defineProperty(AppComponent.prototype, "theme", {
        get: function () {
            return this.configService.theme;
        },
        set: function (value) {
            this.configService.theme = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppComponent.prototype, "lang", {
        get: function () {
            return this.configService.lang;
        },
        set: function (value) {
            this.configService.lang = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppComponent.prototype, "steps", {
        get: function () {
            return this.configService.steps;
        },
        set: function (value) {
            this.configService.steps = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppComponent.prototype, "config", {
        get: function () {
            return this.configService.config;
        },
        set: function (value) {
            this.configService.config = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppComponent.prototype, "currentLang", {
        get: function () {
            return this.configService.currentLang;
        },
        set: function (value) {
            this.configService.currentLang = value;
        },
        enumerable: true,
        configurable: true
    });
    AppComponent.prototype.navigate = function (id) {
        this.router.navigate([this.router.config[id].path]);
    };
    AppComponent.prototype.ngOnInit = function () { };
    AppComponent.prototype.ngOnDestroy = function () {
        this.configService.destroy();
    };
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], AppComponent.prototype, "theme", null);
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], AppComponent.prototype, "lang", null);
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], AppComponent.prototype, "steps", null);
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], AppComponent.prototype, "config", null);
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], AppComponent.prototype, "currentLang", null);
    AppComponent = __decorate([
        Component({
            selector: 'ivw-root',
            templateUrl: './app.component.html',
            styleUrls: ['./app.component.scss']
        }),
        __metadata("design:paramtypes", [Router,
            ConfigService,
            Store])
    ], AppComponent);
    return AppComponent;
}());

var WidgetStepsBarComponent = /** @class */ (function () {
    function WidgetStepsBarComponent() {
        this._currentIndex = new BehaviorSubject(0);
        this._steps$ = new BehaviorSubject([]);
        this.stepClicked = new EventEmitter();
    }
    Object.defineProperty(WidgetStepsBarComponent.prototype, "currentIndex", {
        get: function () {
            return this._currentIndex.value;
        },
        set: function (value) {
            this._currentIndex.next(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WidgetStepsBarComponent.prototype, "steps", {
        get: function () {
            return this._steps$.value;
        },
        set: function (values) {
            this._steps$.next(values);
        },
        enumerable: true,
        configurable: true
    });
    WidgetStepsBarComponent.prototype.stepClick = function (i, step) {
        if (step.enabled) {
            this.stepClicked.next(i);
        }
    };
    WidgetStepsBarComponent.prototype.ngOnInit = function () { };
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], WidgetStepsBarComponent.prototype, "stepClicked", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], WidgetStepsBarComponent.prototype, "currentIndex", null);
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], WidgetStepsBarComponent.prototype, "steps", null);
    WidgetStepsBarComponent = __decorate([
        Component({
            selector: 'ivw-widget-steps-bar',
            templateUrl: './widget-steps-bar.component.html',
            styleUrls: ['./widget-steps-bar.component.scss']
        }),
        __metadata("design:paramtypes", [])
    ], WidgetStepsBarComponent);
    return WidgetStepsBarComponent;
}());

var WidgetStepsBarModule = /** @class */ (function () {
    function WidgetStepsBarModule() {
    }
    WidgetStepsBarModule = __decorate([
        NgModule({
            declarations: [WidgetStepsBarComponent],
            imports: [CommonModule],
            exports: [WidgetStepsBarComponent]
        })
    ], WidgetStepsBarModule);
    return WidgetStepsBarModule;
}());

var DeviceTypeService = /** @class */ (function () {
    function DeviceTypeService() {
    }
    DeviceTypeService.prototype.getPlatformType$ = function () {
        return of(this.getPlatformType());
    };
    DeviceTypeService.prototype.getPlatformType = function () {
        if (navigator.userAgent.match(/mobile/i)) {
            return 'Mobile';
        }
        else if (navigator.userAgent.match(/iPad|Android|Touch/i)) {
            return 'Tablet';
        }
        else {
            return 'Desktop';
        }
    };
    DeviceTypeService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [])
    ], DeviceTypeService);
    return DeviceTypeService;
}());

var InputComponent = /** @class */ (function () {
    function InputComponent(ngControl) {
        this.ngControl = ngControl;
        this.disabled = false;
        this._value = '';
        this.onChange = function () { };
        this.onTouched = function () { };
        ngControl.valueAccessor = this;
    }
    Object.defineProperty(InputComponent.prototype, "value", {
        get: function () {
            return this._value;
        },
        set: function (val) {
            this._value = val;
            this.onChange(val);
            this.onTouched();
        },
        enumerable: true,
        configurable: true
    });
    InputComponent.prototype.writeValue = function (obj) {
        if (obj) {
            this.value = obj;
        }
    };
    InputComponent.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    InputComponent.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    InputComponent.prototype.setDisabledState = function (isDisabled) {
        this.disabled = isDisabled;
    };
    InputComponent.prototype.inputChanged = function (event) {
        this.value = event.target.value;
    };
    InputComponent.prototype.hasError = function (error) {
        if (error) {
            return this.ngControl.hasError(error) && this.ngControl.touched;
        }
        else {
            return (Array.isArray(this.ngControl.errors) && this.ngControl.errors.length > 0);
        }
    };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], InputComponent.prototype, "label", void 0);
    __decorate([
        Input('value'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], InputComponent.prototype, "value", null);
    InputComponent = __decorate([
        Component({
            selector: 'ivw-input',
            templateUrl: './input.component.html',
            styleUrls: ['./input.component.scss'],
            providers: [
            // {
            //   provide: NG_VALUE_ACCESSOR,
            //   useExisting: forwardRef(() => InputComponent),
            //   multi: true
            // }
            ]
        }),
        __metadata("design:paramtypes", [NgControl])
    ], InputComponent);
    return InputComponent;
}());

var THEME_PROVIDER_TOKEN = 'theme_provider';
var ThemeDirective = /** @class */ (function () {
    function ThemeDirective(renderer, hostElement, configService) {
        this.renderer = renderer;
        this.hostElement = hostElement;
        this.configService = configService;
        this.addedClass = [];
        this._ivwTheme$ = new BehaviorSubject('');
    }
    Object.defineProperty(ThemeDirective.prototype, "ivwTheme", {
        get: function () {
            return this._ivwTheme$.value;
        },
        set: function (value) {
            this._ivwTheme$.next(value);
        },
        enumerable: true,
        configurable: true
    });
    ThemeDirective.prototype.resetClass = function () {
        var _this = this;
        this.addedClass.forEach(function (clazz) {
            _this.renderer.removeClass(_this.hostElement.nativeElement, clazz);
        });
        this.addedClass = [];
    };
    ThemeDirective.prototype.ngOnInit = function () {
        var _this = this;
        combineLatest(this.configService.theme$, this._ivwTheme$).subscribe(function (_a) {
            var theme = _a[0], ivwTheme = _a[1];
            _this.resetClass();
            _this.renderer.setAttribute(_this.hostElement.nativeElement, 'style', '');
            var themes = [];
            if (!Array.isArray(ivwTheme)) {
                themes.push(ivwTheme);
            }
            else {
                themes.push.apply(themes, ivwTheme);
            }
            themes.forEach(function (t) {
                if (typeof t === 'string') {
                    _this.processString(t, theme);
                }
                else if (typeof t === 'object') {
                    Object.keys(t).forEach(function (key) {
                        if (t[key]) {
                            _this.processString(key, theme);
                        }
                    });
                }
            });
        });
    };
    ThemeDirective.prototype.processString = function (str, theme) {
        var _this = this;
        var classAndStyle = str
            .split('.')
            .reduce(function (prev, current) { return prev[current]; }, oc(theme))({
            class: '',
            style: ''
        });
        if (classAndStyle.class) {
            var classes = classAndStyle.class.split(' ');
            classes.forEach(function (clazz) {
                _this.renderer.addClass(_this.hostElement.nativeElement, clazz);
                _this.addedClass.push(clazz);
            });
        }
        if (classAndStyle.style) {
            this.renderer.setAttribute(this.hostElement.nativeElement, 'style', classAndStyle.style);
        }
    };
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], ThemeDirective.prototype, "ivwTheme", null);
    ThemeDirective = __decorate([
        Directive({
            selector: '[ivwTheme]'
        }),
        __param(2, Inject(THEME_PROVIDER_TOKEN)),
        __metadata("design:paramtypes", [Renderer2,
            ElementRef, Object])
    ], ThemeDirective);
    return ThemeDirective;
}());

var HiddenDirective = /** @class */ (function () {
    function HiddenDirective(renderer, hostElement) {
        this.renderer = renderer;
        this.hostElement = hostElement;
        this._hidden$ = new BehaviorSubject(false);
    }
    Object.defineProperty(HiddenDirective.prototype, "ivwHidden", {
        get: function () {
            return this._hidden$.value;
        },
        set: function (value) {
            this._hidden$.next(value);
        },
        enumerable: true,
        configurable: true
    });
    HiddenDirective.prototype.ngOnInit = function () {
        var _this = this;
        this._hidden$.subscribe(function (value) {
            if (value) {
                _this.renderer.setStyle(_this.hostElement.nativeElement, 'visibility', 'hidden');
                _this.renderer.setStyle(_this.hostElement.nativeElement, 'height', '0px');
                _this.renderer.setStyle(_this.hostElement.nativeElement, 'position', 'absolute');
            }
            else {
                _this.renderer.removeStyle(_this.hostElement.nativeElement, 'visibility');
                _this.renderer.removeStyle(_this.hostElement.nativeElement, 'height');
                _this.renderer.removeStyle(_this.hostElement.nativeElement, 'position');
            }
        });
    };
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], HiddenDirective.prototype, "ivwHidden", null);
    HiddenDirective = __decorate([
        Directive({
            selector: '[ivwHidden]'
        }),
        __metadata("design:paramtypes", [Renderer2, ElementRef])
    ], HiddenDirective);
    return HiddenDirective;
}());

var ResizeDirective = /** @class */ (function () {
    function ResizeDirective(hostElement) {
        this.hostElement = hostElement;
        this.ivwResizeChange = new EventEmitter();
    }
    ResizeDirective.prototype.ngOnInit = function () {
        var _this = this;
        window.addEventListener('resize', function () {
            _this.sizeChange();
        });
        timer(200)
            .pipe(first())
            .subscribe(function () {
            _this.sizeChange();
        });
    };
    ResizeDirective.prototype.sizeChange = function () {
        this.ivwResizeChange.next({
            width: this.hostElement.nativeElement.offsetWidth,
            height: this.hostElement.nativeElement.offsetHeight
        });
    };
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], ResizeDirective.prototype, "ivwResizeChange", void 0);
    ResizeDirective = __decorate([
        Directive({
            selector: '[ivwResize]'
        }),
        __metadata("design:paramtypes", [ElementRef])
    ], ResizeDirective);
    return ResizeDirective;
}());

var ThemeModule = /** @class */ (function () {
    function ThemeModule() {
    }
    ThemeModule = __decorate([
        NgModule({
            declarations: [ThemeDirective, HiddenDirective, ResizeDirective],
            imports: [CommonModule],
            exports: [ThemeDirective, HiddenDirective, ResizeDirective]
        })
    ], ThemeModule);
    return ThemeModule;
}());

var InputModule = /** @class */ (function () {
    function InputModule() {
    }
    InputModule = __decorate([
        NgModule({
            declarations: [InputComponent],
            imports: [CommonModule, ThemeModule, TranslateModule],
            exports: [InputComponent]
        })
    ], InputModule);
    return InputModule;
}());

var ButtonComponent = /** @class */ (function () {
    function ButtonComponent() {
        this.click = new EventEmitter();
        this._disabled$ = new BehaviorSubject(false);
        this.disabled$ = this._disabled$.asObservable();
    }
    Object.defineProperty(ButtonComponent.prototype, "disabled", {
        get: function () {
            return this._disabled$.value;
        },
        set: function (value) {
            this._disabled$.next(value);
        },
        enumerable: true,
        configurable: true
    });
    ButtonComponent.prototype.ngOnInit = function () { };
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], ButtonComponent.prototype, "click", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], ButtonComponent.prototype, "disabled", null);
    ButtonComponent = __decorate([
        Component({
            selector: 'ivw-button',
            templateUrl: './button.component.html',
            styleUrls: ['./button.component.scss']
        }),
        __metadata("design:paramtypes", [])
    ], ButtonComponent);
    return ButtonComponent;
}());

var ButtonModule = /** @class */ (function () {
    function ButtonModule() {
    }
    ButtonModule = __decorate([
        NgModule({
            declarations: [ButtonComponent],
            imports: [CommonModule, ThemeModule],
            exports: [ButtonComponent]
        })
    ], ButtonModule);
    return ButtonModule;
}());

var TrustedHtmlPipe = /** @class */ (function () {
    function TrustedHtmlPipe(_sanitizer) {
        this._sanitizer = _sanitizer;
    }
    TrustedHtmlPipe.prototype.transform = function (value, args) {
        return this._sanitizer.bypassSecurityTrustHtml(value);
    };
    TrustedHtmlPipe = __decorate([
        Pipe({
            name: 'trustedHtml'
        }),
        __metadata("design:paramtypes", [DomSanitizer])
    ], TrustedHtmlPipe);
    return TrustedHtmlPipe;
}());

var TrustedHtmlModule = /** @class */ (function () {
    function TrustedHtmlModule() {
    }
    TrustedHtmlModule = __decorate([
        NgModule({
            declarations: [TrustedHtmlPipe],
            imports: [CommonModule],
            exports: [TrustedHtmlPipe]
        })
    ], TrustedHtmlModule);
    return TrustedHtmlModule;
}());

var FileUploadComponent = /** @class */ (function () {
    function FileUploadComponent(ngControl) {
        this.ngControl = ngControl;
        this.disabled = false;
        this._value = null;
        this.onChange = function () { };
        this.onTouched = function () { };
        ngControl.valueAccessor = this;
    }
    Object.defineProperty(FileUploadComponent.prototype, "value", {
        get: function () {
            return this._value;
        },
        set: function (val) {
            this._value = val;
            this.onChange(val);
            this.onTouched();
        },
        enumerable: true,
        configurable: true
    });
    FileUploadComponent.prototype.writeValue = function (obj) {
        if (obj) {
            this.value = obj;
        }
    };
    FileUploadComponent.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    FileUploadComponent.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    FileUploadComponent.prototype.setDisabledState = function (isDisabled) {
        this.disabled = isDisabled;
    };
    FileUploadComponent.prototype.fileChange = function (event) {
        var _this = this;
        this.value = event.target.value;
        var fileList = oc(event).target.files(new Array());
        var res = Array.from(fileList).map(function (f) { return _this.getBase64$(f); });
        concat.apply(void 0, res).pipe(first())
            .subscribe(function (value) {
            _this.value = value;
        });
    };
    FileUploadComponent.prototype.getBase64$ = function (file) {
        return Observable.create(function (observer) {
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function () {
                var encoded = reader.result.replace(/^data:(.*;base64,)?/, '');
                if (encoded.length % 4 > 0) {
                    encoded += '='.repeat(4 - (encoded.length % 4));
                }
                var name = file.name;
                var content = encoded;
                observer.next({ name: name, content: content });
            };
            reader.onerror = function (error) { return observer.error(error); };
        });
    };
    FileUploadComponent.prototype.hasError = function (error) {
        if (error) {
            return this.ngControl.hasError(error) && this.ngControl.touched;
        }
        else {
            return (Array.isArray(this.ngControl.errors) && this.ngControl.errors.length > 0);
        }
    };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], FileUploadComponent.prototype, "label", void 0);
    __decorate([
        Input('value'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], FileUploadComponent.prototype, "value", null);
    FileUploadComponent = __decorate([
        Component({
            selector: 'ivw-file-upload',
            templateUrl: './file-upload.component.html',
            styleUrls: ['./file-upload.component.scss']
        }),
        __metadata("design:paramtypes", [NgControl])
    ], FileUploadComponent);
    return FileUploadComponent;
}());

var FileUploadModule = /** @class */ (function () {
    function FileUploadModule() {
    }
    FileUploadModule = __decorate([
        NgModule({
            declarations: [FileUploadComponent],
            imports: [CommonModule, ThemeModule],
            exports: [FileUploadComponent]
        })
    ], FileUploadModule);
    return FileUploadModule;
}());

var SharedModule = /** @class */ (function () {
    function SharedModule() {
    }
    SharedModule = __decorate([
        NgModule({
            declarations: [],
            imports: [CommonModule],
            exports: [
                InputModule,
                TranslateModule,
                ButtonModule,
                FileUploadModule,
                TrustedHtmlModule,
                ThemeModule
            ]
        })
    ], SharedModule);
    return SharedModule;
}());

var StepDataService = /** @class */ (function () {
    function StepDataService(httpClient, config) {
        this.httpClient = httpClient;
        this.config = config;
    }
    Object.defineProperty(StepDataService.prototype, "apiEndpoint", {
        get: function () {
            return this.config.config.apiUrl + "/" + this.config.config.tenantId + "/" + this.config.config.serviceId + "/submissions/" + this.config.config.submissionId;
        },
        enumerable: true,
        configurable: true
    });
    StepDataService.prototype.submitStep = function (type, payload) {
        switch (type) {
            case 'picture':
                var image = payload.image;
                return this.submitDocument({
                    data: image.replace('data:image/jpeg;base64,', ''),
                    type: 'jpeg/base64',
                    step: '1'
                });
            case 'file':
                var file = payload.file;
                return this.submitDocument({
                    data: file,
                    type: 'jpeg/base64',
                    step: '1'
                });
            case 'information':
                return this.submitInformation(payload);
            default:
                return throwError(new Error('Step type not supported'));
        }
    };
    StepDataService.prototype.submitDocument = function (document) {
        return this.httpClient.post(this.apiEndpoint + "/documents", document);
    };
    StepDataService.prototype.submitInformation = function (information) {
        return this.httpClient.post(this.apiEndpoint + "/information", information);
    };
    StepDataService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [HttpClient, ConfigService])
    ], StepDataService);
    return StepDataService;
}());

var StepsEffects = /** @class */ (function () {
    function StepsEffects(stepData, actions$) {
        var _this = this;
        this.stepData = stepData;
        this.actions$ = actions$;
        this.submitStep$ = this.actions$.pipe(ofType(ActionTypes.SUBMIT_STEP), mergeMap(function (action) {
            return _this.stepData.submitStep(action.stepType, action.payload).pipe(map(function () {
                return new ProgressUpdateAction(action.stepId, { state: 'SUCCESS' });
            }), catchError(function (error) {
                return of(new SubmitStepErrorAction(action.stepId, { error: error }));
            }));
        }));
    }
    __decorate([
        Effect(),
        __metadata("design:type", Observable)
    ], StepsEffects.prototype, "submitStep$", void 0);
    StepsEffects = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [StepDataService, Actions])
    ], StepsEffects);
    return StepsEffects;
}());

var DataModule = /** @class */ (function () {
    function DataModule() {
    }
    DataModule = __decorate([
        NgModule({
            declarations: [],
            imports: [CommonModule, HttpClientModule]
        })
    ], DataModule);
    return DataModule;
}());

var EffectsModule$1 = /** @class */ (function () {
    function EffectsModule$$1() {
    }
    EffectsModule$$1 = __decorate([
        NgModule({
            declarations: [],
            imports: [CommonModule, DataModule, EffectsModule.forRoot([StepsEffects])]
        })
    ], EffectsModule$$1);
    return EffectsModule$$1;
}());

var initialState = {};
function cloneObject(obj) {
    var clone = {};
    for (var i in obj) {
        if (obj[i] !== null && typeof obj[i] === 'object') {
            clone[i] = cloneObject(obj[i]);
        }
        else {
            clone[i] = obj[i];
        }
    }
    return clone;
}
var updateStep = function (step, stepUpdate) {
    return Object.assign({}, step, stepUpdate);
};
var addProgress = function (step, progress) {
    var prevLogs = step.progress.logs || [];
    prevLogs.push(progress);
    var newStep = cloneObject(step);
    newStep.progress.logs = prevLogs;
    newStep.progress.state = progress.state;
    return newStep;
};
var addStepError = function (step, error) {
    var newStep = cloneObject(step);
    newStep.progress.state = 'ERROR';
    return newStep;
};
function stepsReducer(state, action) {
    if (state === void 0) { state = initialState; }
    var _a, _b, _c;
    switch (action.type) {
        case ActionTypes.PROGRESS_UPDATE:
            return __assign({}, state, (_a = {}, _a[action.stepId] = addProgress(state[action.stepId], action.payload), _a));
        case ActionTypes.SUBMIT_STEP_ERROR:
            return __assign({}, state, (_b = {}, _b[action.stepId] = addStepError(state[action.stepId], action.error), _b));
        case ActionTypes.SUBMIT_STEP:
            var step = state[action.stepId];
            var updatedStep = updateStep(step, {
                payload: action.payload,
                progress: {
                    state: 'PROCESSING'
                }
            });
            return __assign({}, state, (_c = {}, _c[action.stepId] = updatedStep, _c));
        case ActionTypes.INIT_STEP:
            return action.payload.reduce(function (prev, current, i) {
                var _a;
                return (__assign({}, prev, (_a = {}, _a[i] = { config: current, progress: { state: 'BLANK' } }, _a)));
            }, {});
        default:
            return state;
    }
}

var StoreModule$1 = /** @class */ (function () {
    function StoreModule$$1() {
    }
    StoreModule$$1 = __decorate([
        NgModule({
            declarations: [],
            imports: [CommonModule, StoreModule.forRoot({ steps: stepsReducer })]
        })
    ], StoreModule$$1);
    return StoreModule$$1;
}());

var FileComponent = /** @class */ (function () {
    function FileComponent(_sanitizer) {
        this._sanitizer = _sanitizer;
    }
    Object.defineProperty(FileComponent.prototype, "name", {
        get: function () {
            return this.step.payload.file.name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileComponent.prototype, "href", {
        get: function () {
            return this._sanitizer.bypassSecurityTrustUrl("data:application/octet-stream;charset=utf-16le;base64," + this.step.payload.file.content);
        },
        enumerable: true,
        configurable: true
    });
    FileComponent.prototype.ngOnInit = function () { };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], FileComponent.prototype, "step", void 0);
    FileComponent = __decorate([
        Component({
            selector: 'ivw-file',
            templateUrl: './file.component.html',
            styleUrls: ['./file.component.scss']
        }),
        __metadata("design:paramtypes", [DomSanitizer])
    ], FileComponent);
    return FileComponent;
}());

var FileModule = /** @class */ (function () {
    function FileModule() {
    }
    FileModule = __decorate([
        NgModule({
            declarations: [FileComponent],
            imports: [CommonModule, SharedModule],
            exports: [FileComponent]
        })
    ], FileModule);
    return FileModule;
}());

var InformationComponent = /** @class */ (function () {
    function InformationComponent() {
    }
    InformationComponent.prototype.ngOnInit = function () { };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], InformationComponent.prototype, "step", void 0);
    InformationComponent = __decorate([
        Component({
            selector: 'ivw-information',
            templateUrl: './information.component.html',
            styleUrls: ['./information.component.scss']
        }),
        __metadata("design:paramtypes", [])
    ], InformationComponent);
    return InformationComponent;
}());

var InformationModule = /** @class */ (function () {
    function InformationModule() {
    }
    InformationModule = __decorate([
        NgModule({
            declarations: [InformationComponent],
            imports: [CommonModule, SharedModule],
            exports: [InformationComponent]
        })
    ], InformationModule);
    return InformationModule;
}());

var PictureComponent = /** @class */ (function () {
    function PictureComponent() {
    }
    PictureComponent.prototype.ngOnInit = function () { };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], PictureComponent.prototype, "step", void 0);
    PictureComponent = __decorate([
        Component({
            selector: 'ivw-picture',
            templateUrl: './picture.component.html',
            styleUrls: ['./picture.component.scss']
        }),
        __metadata("design:paramtypes", [])
    ], PictureComponent);
    return PictureComponent;
}());

var PictureModule = /** @class */ (function () {
    function PictureModule() {
    }
    PictureModule = __decorate([
        NgModule({
            declarations: [PictureComponent],
            imports: [CommonModule, SharedModule],
            exports: [PictureComponent]
        })
    ], PictureModule);
    return PictureModule;
}());

var SummaryStepComponent = /** @class */ (function () {
    function SummaryStepComponent() {
    }
    SummaryStepComponent.prototype.ngOnInit = function () { };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], SummaryStepComponent.prototype, "step", void 0);
    SummaryStepComponent = __decorate([
        Component({
            selector: 'ivw-summary-step',
            templateUrl: './summary-step.component.html',
            styleUrls: ['./summary-step.component.scss']
        }),
        __metadata("design:paramtypes", [])
    ], SummaryStepComponent);
    return SummaryStepComponent;
}());

var SummaryStepModule = /** @class */ (function () {
    function SummaryStepModule() {
    }
    SummaryStepModule = __decorate([
        NgModule({
            declarations: [SummaryStepComponent],
            imports: [
                CommonModule,
                PictureModule,
                InformationModule,
                RouterModule,
                FileModule,
                SharedModule
            ],
            exports: [SummaryStepComponent]
        })
    ], SummaryStepModule);
    return SummaryStepModule;
}());

var ModalService = /** @class */ (function () {
    function ModalService(componentFactoryResolver, appRef, injector, document) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.appRef = appRef;
        this.injector = injector;
        this.document = document;
    }
    ModalService.prototype.init = function (outlet) {
        var _this = this;
        if (!this._outlet) {
            var componentRef_1 = this.componentFactoryResolver
                .resolveComponentFactory(outlet)
                .create(this.injector);
            setTimeout(function () {
                // 2. Attach component to the appRef so that it's inside the ng component tree
                _this.appRef.attachView(componentRef_1.hostView);
                // 3. Get DOM element from component
                var domElem = componentRef_1.hostView
                    .rootNodes[0];
                // 4. Append DOM element to the body
                window.document.body.appendChild(domElem);
            });
        }
    };
    ModalService.prototype.attach = function (template) {
        var _this = this;
        if (this._outlet) {
            setTimeout(function () {
                _this._outlet.portal = new TemplatePortal(template, null);
            });
        }
    };
    ModalService.prototype.detach = function () {
        var _this = this;
        if (this._outlet) {
            setTimeout(function () {
                _this._outlet.portal.detach();
                _this._outlet.portal = null;
            });
        }
    };
    ModalService.prototype.registerOutlet = function (outlet) {
        this._outlet = outlet;
    };
    ModalService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __param(3, Inject(DOCUMENT)),
        __metadata("design:paramtypes", [ComponentFactoryResolver,
            ApplicationRef,
            Injector,
            Document])
    ], ModalService);
    return ModalService;
}());

var ModalOutletComponent = /** @class */ (function () {
    function ModalOutletComponent(modalService) {
        var _this = this;
        this.modalService = modalService;
        this._init$ = new ReplaySubject();
        this._portal$ = new BehaviorSubject(null);
        this.portal$ = this._init$.pipe(switchMap(function () { return _this._portal$; }));
        this.modalService.registerOutlet(this);
    }
    Object.defineProperty(ModalOutletComponent.prototype, "portal", {
        get: function () {
            return this._portal$.value;
        },
        set: function (value) {
            this._portal$.next(value);
        },
        enumerable: true,
        configurable: true
    });
    ModalOutletComponent.prototype.ngOnInit = function () {
        this._init$.next();
    };
    ModalOutletComponent = __decorate([
        Component({
            selector: 'ivw-modal-outlet',
            templateUrl: './modal-outlet.component.html',
            styleUrls: ['./modal-outlet.component.scss']
        }),
        __metadata("design:paramtypes", [ModalService])
    ], ModalOutletComponent);
    return ModalOutletComponent;
}());

var MobileLayoutComponent = /** @class */ (function () {
    function MobileLayoutComponent(modalService, deviceTypeService) {
        this.modalService = modalService;
        this.deviceTypeService = deviceTypeService;
        this.shouldRenderModal = this.deviceTypeService.getPlatformType() === 'Mobile';
    }
    MobileLayoutComponent.prototype.ngOnInit = function () {
        if (this.shouldRenderModal) {
            this.modalService.init(ModalOutletComponent);
            this.modalService.attach(this.template);
        }
        else {
            this.portal = new TemplatePortal(this.template, null);
        }
    };
    MobileLayoutComponent.prototype.ngOnDestroy = function () {
        if (this.shouldRenderModal) {
            this.modalService.detach();
        }
    };
    __decorate([
        ViewChild('template'),
        __metadata("design:type", TemplateRef)
    ], MobileLayoutComponent.prototype, "template", void 0);
    MobileLayoutComponent = __decorate([
        Component({
            selector: 'ivw-mobile-layout',
            templateUrl: './mobile-layout.component.html',
            styleUrls: ['./mobile-layout.component.scss']
        }),
        __metadata("design:paramtypes", [ModalService,
            DeviceTypeService])
    ], MobileLayoutComponent);
    return MobileLayoutComponent;
}());

var ModalOutletModule = /** @class */ (function () {
    function ModalOutletModule() {
    }
    ModalOutletModule = __decorate([
        NgModule({
            declarations: [ModalOutletComponent],
            imports: [CommonModule, PortalModule, ThemeModule],
            exports: [ModalOutletComponent],
            entryComponents: [ModalOutletComponent]
        })
    ], ModalOutletModule);
    return ModalOutletModule;
}());

var MobileLayoutModule = /** @class */ (function () {
    function MobileLayoutModule() {
    }
    MobileLayoutModule = __decorate([
        NgModule({
            declarations: [MobileLayoutComponent],
            imports: [CommonModule, ModalOutletModule, PortalModule],
            exports: [ModalOutletModule, MobileLayoutComponent]
        })
    ], MobileLayoutModule);
    return MobileLayoutModule;
}());

var BaseStepComponent = /** @class */ (function () {
    function BaseStepComponent() {
        this.nextStep = new EventEmitter();
        this.previousStep = new EventEmitter();
        this.submitStep = new EventEmitter();
    }
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], BaseStepComponent.prototype, "nextStep", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], BaseStepComponent.prototype, "previousStep", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], BaseStepComponent.prototype, "submitStep", void 0);
    return BaseStepComponent;
}());

var CustomTextComponent = /** @class */ (function (_super) {
    __extends(CustomTextComponent, _super);
    function CustomTextComponent() {
        return _super.call(this) || this;
    }
    CustomTextComponent.prototype.ngOnInit = function () { };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], CustomTextComponent.prototype, "step", void 0);
    CustomTextComponent = __decorate([
        Component({
            selector: 'ivw-custom-text',
            templateUrl: './custom-text.component.html',
            styleUrls: ['./custom-text.component.scss']
        }),
        __metadata("design:paramtypes", [])
    ], CustomTextComponent);
    return CustomTextComponent;
}(BaseStepComponent));

var CustomTextModule = /** @class */ (function () {
    function CustomTextModule() {
    }
    CustomTextModule = __decorate([
        NgModule({
            declarations: [CustomTextComponent],
            imports: [CommonModule, SharedModule],
            exports: [CustomTextComponent]
        })
    ], CustomTextModule);
    return CustomTextModule;
}());

var FileComponent$1 = /** @class */ (function (_super) {
    __extends(FileComponent, _super);
    function FileComponent(_fb) {
        var _this = _super.call(this) || this;
        _this._fb = _fb;
        return _this;
    }
    FileComponent.prototype.ngOnInit = function () {
        this.formGroup = this._fb.group({
            file: ['', [Validators.required]]
        });
    };
    FileComponent.prototype.submit = function () {
        this.submitStep.next(this.formGroup.value);
        this.nextStep.next();
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], FileComponent.prototype, "step", void 0);
    FileComponent = __decorate([
        Component({
            selector: 'ivw-file',
            templateUrl: './file.component.html',
            styleUrls: ['./file.component.scss']
        }),
        __metadata("design:paramtypes", [FormBuilder])
    ], FileComponent);
    return FileComponent;
}(BaseStepComponent));

var FileModule$1 = /** @class */ (function () {
    function FileModule() {
    }
    FileModule = __decorate([
        NgModule({
            declarations: [FileComponent$1],
            imports: [CommonModule, ReactiveFormsModule, SharedModule],
            exports: [FileComponent$1]
        })
    ], FileModule);
    return FileModule;
}());

var InformationComponent$1 = /** @class */ (function (_super) {
    __extends(InformationComponent, _super);
    function InformationComponent(_fb) {
        var _this = _super.call(this) || this;
        _this._fb = _fb;
        return _this;
    }
    InformationComponent.prototype.ngOnInit = function () {
        this.formGroup = this._fb.group({
            email: [
                oc(this.step).payload.email(''),
                [Validators.email, Validators.required]
            ],
            firstName: [oc(this.step).payload.firstName(''), Validators.required],
            lastName: [oc(this.step).payload.lastName(''), Validators.required]
        });
    };
    InformationComponent.prototype.submit = function () {
        this.submitStep.next(this.formGroup.value);
        this.nextStep.next();
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], InformationComponent.prototype, "step", void 0);
    InformationComponent = __decorate([
        Component({
            selector: 'ivw-information',
            templateUrl: './information.component.html',
            styleUrls: ['./information.component.scss']
        }),
        __metadata("design:paramtypes", [FormBuilder])
    ], InformationComponent);
    return InformationComponent;
}(BaseStepComponent));

var InformationModule$1 = /** @class */ (function () {
    function InformationModule() {
    }
    InformationModule = __decorate([
        NgModule({
            declarations: [InformationComponent$1],
            imports: [CommonModule, SharedModule, ReactiveFormsModule],
            exports: [InformationComponent$1]
        })
    ], InformationModule);
    return InformationModule;
}());

var CameraService = /** @class */ (function () {
    function CameraService() {
    }
    CameraService.prototype.getCameraOptions = function () {
        return from(navigator.mediaDevices.enumerateDevices()).pipe(map(function (mediaDevices) {
            return mediaDevices.filter(function (device) { return device.kind === 'videoinput'; });
        }));
    };
    CameraService.prototype.getUserMedia = function (options) {
        var mediaStreams = [];
        var obs = Observable.create(function (observer) {
            window.navigator.getUserMedia({
                video: options,
                audio: false
            }, function (stream) { return observer.next(stream); }, function (error) { return observer.error(error); });
        });
        return obs.pipe(tap(function (stream) {
            mediaStreams.push(stream);
        }), finalize(function () {
            mediaStreams.forEach(function (mediaStream) {
                mediaStream.getTracks().forEach(function (track) { return track.stop(); });
            });
        }));
    };
    CameraService.prototype.getRenderer = function (videoElement, options) {
        return this.getUserMedia(options).pipe(map(function (mediaStream) {
            return new Renderer(videoElement, mediaStream);
        }));
    };
    CameraService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [])
    ], CameraService);
    return CameraService;
}());
var Renderer = /** @class */ (function () {
    function Renderer(videoElement, mediaStream) {
        this.videoElement = videoElement;
        this.mediaStream = mediaStream;
    }
    Renderer.prototype.render = function () {
        this.videoElement.srcObject = this.mediaStream;
    };
    Renderer.prototype.stop = function () {
        this.mediaStream.getTracks().forEach(function (track) { return track.stop(); });
    };
    Renderer.prototype.draw = function (canvasElement) {
        var canvas = canvasElement;
        if (!canvasElement) {
            canvas = document.createElement('canvas');
        }
        var ctx = canvas.getContext('2d');
        canvas.width = this.videoElement.clientWidth;
        canvas.height = this.videoElement.clientHeight;
        ctx.drawImage(this.videoElement, 0, 0, this.videoElement.clientWidth, this.videoElement.clientHeight);
        return canvas.toDataURL('image/jpeg');
    };
    return Renderer;
}());

var PictureComponent$1 = /** @class */ (function (_super) {
    __extends(PictureComponent, _super);
    function PictureComponent(cameraService, deviceType, _cd) {
        var _this = _super.call(this) || this;
        _this.cameraService = cameraService;
        _this.deviceType = deviceType;
        _this._cd = _cd;
        _this.CAPTURE_STATE = 'capture';
        _this.PREVIEW_STATE = 'preview';
        _this.state = _this.CAPTURE_STATE;
        _this.cameraOrientation$ = new BehaviorSubject('user');
        _this.destroySubject$ = new Subject();
        _this._captureSubject = new Subject();
        _this._startSubject = new ReplaySubject();
        _this.resize = new ReplaySubject();
        _this.isVideoReady$ = new BehaviorSubject(false);
        _this.isMobile$ = _this.deviceType
            .getPlatformType$()
            .pipe(map(function (type) { return type === 'Mobile'; }));
        return _this;
    }
    PictureComponent.prototype.ngOnInit = function () {
        var _this = this;
        var image = oc(this.step).payload.image();
        if (image) {
            this.state = this.PREVIEW_STATE;
            var ctx_1 = this.canvas.nativeElement.getContext('2d');
            var img_1 = new Image();
            img_1.onload = function () {
                _this.canvas.nativeElement.width = img_1.width;
                _this.canvas.nativeElement.height = img_1.height;
                ctx_1.drawImage(img_1, 0, 0, img_1.width, img_1.height);
            };
            img_1.src = image;
        }
        this._startSubject
            .pipe(startWith(!!image), tap(function (hasImage) {
            return (_this.state = hasImage ? _this.PREVIEW_STATE : _this.CAPTURE_STATE);
        }), filter(function (hasImage) { return !hasImage; }), switchMap(function () {
            return _this.resize.pipe(debounceTime(300), distinctUntilKeyChanged('width'), distinctUntilKeyChanged('height'));
        }), switchMap(function () {
            return _this.isMobile$.pipe(switchMap(function (isMobile) {
                if (isMobile) {
                    return _this.cameraOrientation$.pipe(map(function (facingMode) {
                        return {
                            facingMode: facingMode
                        };
                    }));
                }
                else {
                    return of({});
                }
            }));
        }), switchMap(function (options) {
            return _this.cameraService
                .getRenderer(_this.videoElement.nativeElement, options)
                .pipe(tap(function (renderer) { return renderer.render(); }), tap(function () { return _this.isVideoReady$.next(true); }), tap(function () { return _this._cd.detectChanges(); }), switchMap(function (renderer) {
                return _this._captureSubject.pipe(tap(function () {
                    renderer.draw(_this.canvas.nativeElement);
                    _this.state = _this.PREVIEW_STATE;
                }));
            }), 
            // We stop the media stream after the picture is taken
            take(1), tap(function () { return _this.isVideoReady$.next(false); }));
        }), takeUntil(this.destroySubject$))
            .subscribe();
    };
    PictureComponent.prototype.capture = function () {
        this._captureSubject.next();
    };
    PictureComponent.prototype.restart = function () {
        this._startSubject.next(false);
    };
    PictureComponent.prototype.submit = function () {
        this.submitStep.next({
            image: this.canvas.nativeElement.toDataURL('image/jpeg')
        });
        this.nextStep.next();
    };
    PictureComponent.prototype.switchCamera = function () {
        this.cameraOrientation$.next(this.cameraOrientation$.value === 'user' ? 'environment' : 'user');
    };
    PictureComponent.prototype.ngOnDestroy = function () {
        this.destroySubject$.next();
    };
    __decorate([
        ViewChild('videoElement'),
        __metadata("design:type", ElementRef)
    ], PictureComponent.prototype, "videoElement", void 0);
    __decorate([
        ViewChild('canvas'),
        __metadata("design:type", ElementRef)
    ], PictureComponent.prototype, "canvas", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], PictureComponent.prototype, "step", void 0);
    PictureComponent = __decorate([
        Component({
            selector: 'ivw-picture',
            templateUrl: './picture.component.html',
            styleUrls: ['./picture.component.scss']
        }),
        __metadata("design:paramtypes", [CameraService,
            DeviceTypeService,
            ChangeDetectorRef])
    ], PictureComponent);
    return PictureComponent;
}(BaseStepComponent));

var svgTemplateCard = function () { return "\n    <svg\n      viewBox=\"0 0 86 54\"\n    >\n      <rect\n        width=\"86\"\n        height=\"54\"\n        style=\"fill:rgba(255, 255, 255, 0);stroke-width:5;stroke:rgba(139, 139, 139, 0.7)\"\n      />\n    </svg>\n"; };
var svgTemplateFace = function () { return "\n    <svg\n      viewBox=\"0 0 768 1024\"\n    >\n      <g>\n        <title>Layer 1</title>\n        <path\n          id=\"svg_1\"\n          d=\"m689.8,445.5l2.4,-44.2c37.2,-259.3 -183.6,-371.2 -183.6,-371.2c-32,-18.3 -84.4,-26.2 -132.1,-25c-32.6,-0.8 -67.8,4.9 -96.8,12.4c-6.5,1 -25.8,8.8 -32.4,12.6c0,0 -227.4,111.9 -190.2,371.2l2.4,44.2c0,0 -56,1.9 -42.5,113.3c0,0 13.4,69.1 32.6,92.2c0,0 29.7,103.2 57.1,89.1c4.1,15.6 8.4,29.9 12.4,40.4c0,0 42.7,110.4 100.7,155.7c0,0 48.1,48.1 68,63.7c0,0 42.8,31.8 88.1,22.5l7.1,0c45.3,9.3 78.8,-22.5 78.8,-22.5c19.8,-15.6 68,-62.1 68,-62.1c58.1,-45.3 100.7,-156.5 100.7,-156.5c4,-10.5 8.3,-25.2 12.4,-40.8c0,0 0.1,-0.2 0.1,-0.2c27.4,13.6 56.9,-89.2 56.9,-89.2c19.2,-23 32.6,-92.2 32.6,-92.2c13.3,-111.5 -42.7,-113.4 -42.7,-113.4z\"\n          stroke-miterlimit=\"10\"\n          stroke-linejoin=\"round\"\n          stroke-linecap=\"round\"\n          stroke-width=\"20\"\n          stroke=\"rgba(139, 139, 139, 0.7)\"\n          fill=\"none\"\n        />\n      </g>\n    </svg>\n"; };

var SvgOverlayComponent = /** @class */ (function () {
    function SvgOverlayComponent(_sanitizer) {
        this._sanitizer = _sanitizer;
        this.cardTemplate = this.trust(svgTemplateCard());
        this.faceTemplate = this.trust(svgTemplateFace());
    }
    SvgOverlayComponent.prototype.trust = function (str) {
        return this._sanitizer.bypassSecurityTrustHtml(str);
    };
    SvgOverlayComponent.prototype.ngOnInit = function () { };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], SvgOverlayComponent.prototype, "type", void 0);
    SvgOverlayComponent = __decorate([
        Component({
            selector: 'ivw-svg-overlay',
            templateUrl: './svg-overlay.component.html',
            styleUrls: ['./svg-overlay.component.scss'],
            encapsulation: ViewEncapsulation.None
        }),
        __metadata("design:paramtypes", [DomSanitizer])
    ], SvgOverlayComponent);
    return SvgOverlayComponent;
}());

var CameraSwitcherComponent = /** @class */ (function () {
    function CameraSwitcherComponent(deviceType) {
        this.deviceType = deviceType;
        this.cameraSwitched = new EventEmitter();
        this.isMobile$ = this.deviceType.getPlatformType$().pipe(map(function (type) {
            return type === 'Mobile';
        }));
    }
    CameraSwitcherComponent.prototype.ngOnInit = function () { };
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], CameraSwitcherComponent.prototype, "cameraSwitched", void 0);
    CameraSwitcherComponent = __decorate([
        Component({
            selector: 'ivw-camera-switcher',
            templateUrl: './camera-switcher.component.html',
            styleUrls: ['./camera-switcher.component.scss']
        }),
        __metadata("design:paramtypes", [DeviceTypeService])
    ], CameraSwitcherComponent);
    return CameraSwitcherComponent;
}());

var PictureModule$1 = /** @class */ (function () {
    function PictureModule() {
    }
    PictureModule = __decorate([
        NgModule({
            declarations: [PictureComponent$1, SvgOverlayComponent, CameraSwitcherComponent],
            imports: [CommonModule, SharedModule],
            exports: [PictureComponent$1]
        })
    ], PictureModule);
    return PictureModule;
}());

var StepComponent = /** @class */ (function (_super) {
    __extends(StepComponent, _super);
    function StepComponent() {
        return _super.call(this) || this;
    }
    StepComponent.prototype.ngOnInit = function () { };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], StepComponent.prototype, "step", void 0);
    StepComponent = __decorate([
        Component({
            selector: 'ivw-step',
            templateUrl: './step.component.html',
            styleUrls: ['./step.component.scss']
        }),
        __metadata("design:paramtypes", [])
    ], StepComponent);
    return StepComponent;
}(BaseStepComponent));

var StepModule = /** @class */ (function () {
    function StepModule() {
    }
    StepModule = __decorate([
        NgModule({
            declarations: [StepComponent],
            imports: [
                CommonModule,
                InformationModule$1,
                PictureModule$1,
                FileModule$1,
                CustomTextModule,
                SharedModule,
                MobileLayoutModule
            ],
            exports: [StepComponent]
        })
    ], StepModule);
    return StepModule;
}());

var AppModule = /** @class */ (function () {
    function AppModule(injector) {
        this.injector = injector;
        this.customElement = null;
    }
    AppModule.prototype.ngDoBootstrap = function () {
        var strategyFactory = new ElementZoneStrategyFactory(AppComponent, this.injector);
        var el = createCustomElement(AppComponent, {
            injector: this.injector,
            strategyFactory: strategyFactory
        });
        this.customElement = el;
        return el;
        // customElements.define('iv-widget', el);
    };
    AppModule = __decorate([
        NgModule({
            declarations: [AppComponent, StepPageComponent, SummaryPageComponent],
            imports: [
                BrowserModule,
                StepModule,
                SummaryStepModule,
                WidgetStepsBarModule,
                RouterModule.forRoot([], { useHash: true }),
                StoreModule$1,
                EffectsModule$1,
                SharedModule,
                TranslateModule.forRoot()
            ],
            providers: [
                DeviceTypeService,
                { provide: THEME_PROVIDER_TOKEN, useExisting: ConfigService }
            ],
            entryComponents: [AppComponent, StepPageComponent, SummaryPageComponent]
            // bootstrap: [AppComponent]
        }),
        __metadata("design:paramtypes", [Injector])
    ], AppModule);
    return AppModule;
}());

var initWidget = function () {
    var myModule = platformBrowserDynamic()
        .bootstrapModule(AppModule)
        .catch(function (err) { return console.error(err); });
    return myModule.then(function (appModule) {
        return appModule.instance;
    });
};
// Add global function to allow other application to initialize the component
var createIvWidget = function (idSelector, config) {
    if (config === void 0) { config = {
        idToken: '',
        steps: [],
        config: { apiUrl: '', tenantId: '', serviceId: '', submissionId: '' }
    }; }
    var el = document.getElementById(idSelector);
    var widget = document.createElement('iv-widget');
    widget.steps = config.steps;
    widget.lang = config.lang;
    widget.theme = config.theme;
    widget.config = config.config;
    el.appendChild(widget);
    return widget;
};

export { initWidget, createIvWidget };
