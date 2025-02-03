import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainLayoutComponent } from './main-layout.component';
import { By } from '@angular/platform-browser';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

describe('MainLayoutComponent', () => {
  let component: MainLayoutComponent;
  let fixture: ComponentFixture<MainLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render the layout structure with header, sidebar, and body', () => {
    const layoutElement = fixture.debugElement.query(By.css('.layout'));
    expect(layoutElement).toBeTruthy();

    const headerElement = fixture.debugElement.query(By.css('.header'));
    expect(headerElement).toBeTruthy();

    const headerComponent = fixture.debugElement.query(By.directive(HeaderComponent));
    expect(headerComponent).toBeTruthy();

    const leftSideElement = fixture.debugElement.query(By.css('.leftSide'));
    expect(leftSideElement).toBeTruthy();

    const sideBarComponent = fixture.debugElement.query(By.directive(SidebarComponent));
    expect(sideBarComponent).toBeTruthy();

    const bodyElement = fixture.debugElement.query(By.css('.body'));
    expect(bodyElement).toBeTruthy();
  });

  it('should have router-outlet inside the main container', () => {
     const mainElement = fixture.debugElement.query(By.css('.layout-main'));
     expect(mainElement).toBeTruthy();

     const routerOutlet = fixture.debugElement.query(By.css('router-outlet'));
     expect(routerOutlet).toBeTruthy();
  });
});
