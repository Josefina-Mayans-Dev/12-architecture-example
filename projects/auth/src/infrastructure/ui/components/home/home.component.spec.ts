import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { By } from '@angular/platform-browser';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should display correct branding elements and logo', () => {
    const logoImg = fixture.debugElement.query(By.css('.site-identity img'));
    expect(logoImg).toBeTruthy();
    expect(logoImg.nativeElement.src).toContain('heart-dollar.svg');
    expect(logoImg.nativeElement.alt).toBe('BankIT logo');

    const brandName = fixture.debugElement.query(By.css('.navbar-brand'));
    expect(brandName.nativeElement.textContent).toBe('BankIT');

    const heroText = fixture.debugElement.query(By.css('.hero'));
    expect(heroText.nativeElement.textContent).toBe('Welcome to BankIT!');
  });

  it('should call login method when login link is clicked', () => {
    spyOn(component, 'login');

    const loginLink = fixture.debugElement.query(By.css('.navbar-nav a'));
    loginLink.nativeElement.click();

    expect(component.login).toHaveBeenCalled();

    expect(loginLink.nativeElement.hasAttribute('routerLinkActive')).toBeTruthy();
    expect(loginLink.nativeElement.getAttribute('routerLinkActive')).toBe('active');
  });
});
