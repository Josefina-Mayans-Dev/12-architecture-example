import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarComponent } from './sidebar.component';
import { By } from '@angular/platform-browser';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render the sidebar with user avatar', () => {
    const sidebarElement = fixture.debugElement.query(By.css('.sidebar'));
    expect(sidebarElement).toBeTruthy();

    const avatarElement = fixture.debugElement.query(By.css('.sidebar__avatar img'));
    expect(avatarElement).toBeTruthy();
});

it('should display the username when provided', () => {
    component.username = 'Test User';
    fixture.detectChanges();

    const usernameElement = fixture.debugElement.query(By.css('.sidebar__user-profile h2'));
    expect(usernameElement).toBeTruthy();
    expect(usernameElement.nativeElement.textContent).toContain('Test User');
});

it('should NOT display the username when username is not provided', () => {
    const usernameElement = fixture.debugElement.query(By.css('.sidebar__user-profile h2'));
    expect(usernameElement).toBeFalsy();
});
});
