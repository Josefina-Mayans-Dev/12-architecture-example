import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { By } from '@angular/platform-browser';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should render the header with correct site info and avatar', () => {
    const headerElement = fixture.debugElement.query(By.css('.layout__header'));
    expect(headerElement).toBeTruthy();

    const siteIdentity = fixture.debugElement.query(By.css('.site-identity a'));
    expect(siteIdentity).toBeTruthy();
    expect(siteIdentity.nativeElement.getAttribute('routerLink')).toBe('/');

    const logo = fixture.debugElement.query(By.css('.site-identity svg'));
    expect(logo).toBeTruthy();

    const siteName = fixture.debugElement.query(By.css('.navbar-brand'));
    expect(siteName.nativeElement.textContent).toContain('BankIT');

    const avatar = fixture.debugElement.query(By.css('.navbar__avatar'));
    expect(avatar).toBeTruthy();

});

it('should toggle the menu and emit logout event when clicked', () => {
    let dropdown = fixture.debugElement.query(By.css('.navbar__dropdown'));
    expect(dropdown).toBeFalsy();

    const avatar = fixture.debugElement.query(By.css('.navbar__avatar'));
    avatar.nativeElement.click();
    fixture.detectChanges();

    dropdown = fixture.debugElement.query(By.css('.navbar__dropdown'));
    expect(dropdown).toBeTruthy();

    const logoutButton = fixture.debugElement.query(By.css('.navbar__logout-btn'));
    expect(logoutButton).toBeTruthy();

    const logoutSpy = jasmine.createSpy('logoutSpy');
    component.logoutClicked.subscribe(logoutSpy);

    logoutButton.nativeElement.click();
    expect(logoutSpy).toHaveBeenCalled();
});
});
