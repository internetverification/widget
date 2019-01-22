import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { createHostComponentFactory, Spectator } from '@netbasal/spectator';
import { TranslatePipe } from '@ngx-translate/core';
import { MockComponent, MockDirective, MockPipe } from 'ng-mocks';
import { ButtonComponent } from '../../components/button/button.component';
import { HiddenDirective } from '../../directives/hidden.directive';
import { ResizeDirective } from '../../directives/resize.directive';
import { ThemeDirective } from '../../directives/theme.directive';
import { TrustedHtmlPipe } from '../../pipes/trusted-html/trusted-html.pipe';
import { CameraService } from './camera.service';
import { PictureComponent } from './picture.component';
import { SvgOverlayComponent } from './svg-overlay/svg-overlay.component';

describe('PictureComponent', () => {
  const mockHidden = MockDirective(HiddenDirective);

  let spectator: Spectator<PictureComponent>;
  const createComponent = createHostComponentFactory({
    component: PictureComponent,
    imports: [ReactiveFormsModule],
    providers: [{ provide: CameraService, useValue: {} }],
    declarations: [
      MockComponent(ButtonComponent),
      MockComponent(SvgOverlayComponent),
      MockDirective(ThemeDirective),
      mockHidden,
      MockDirective(ResizeDirective),
      MockPipe(TranslatePipe, s => s),
      MockPipe(TrustedHtmlPipe)
    ]
  });

  it('should create', () => {
    spectator = createComponent('<ivw-picture></ivw-picture>');
    expect(spectator.component).toBeTruthy();
  });

  it('should display video element on start', () => {
    spectator = createComponent('<ivw-picture></ivw-picture>');
    expect(spectator.query('video').attributes.getNamedItem('ivwHidden')).toBe(
      null
    );
  });

  it('should hide canvas element on start', () => {
    spectator = createComponent('<ivw-picture></ivw-picture>');
    spectator.detectChanges();
    expect(
      spectator.component.state === spectator.component.CAPTURE_STATE
    ).toBeTruthy();
    expect(spectator.debugElement.queryAll(By.directive(mockHidden))[1]).toBe(
      true
    );
    expect(spectator.query('canvas').attributes.getNamedItem('ivwHidden')).toBe(
      true
    );
  });
});
