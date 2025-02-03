import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SuccessModalComponent } from './success-modal.component';
import { By } from '@angular/platform-browser';

describe('SuccessModalComponent', () => {
    let component: SuccessModalComponent;
    let fixture: ComponentFixture<SuccessModalComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [SuccessModalComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(SuccessModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });


    it('should NOT show the modal when initialized (default isVisible is false)', () => {
        const modalElement = fixture.debugElement.query(By.css('.modal-overlay'));
        expect(modalElement).toBeFalsy();
    });

    it('should show modal when isVisible is set to true internally', () => {
        component.isVisible = true;
        fixture.detectChanges();

        const modalElement = fixture.debugElement.query(By.css('.modal-overlay'));
        expect(modalElement).toBeTruthy();
    });

    it('should emit modalClosed event when close button is clicked', () => {
        component.isVisible = true;
        fixture.detectChanges();

        const modalClosedSpy = jasmine.createSpy('modalClosedSpy');
        component.modalClosed.subscribe(modalClosedSpy);

        const closeButton = fixture.debugElement.query(By.css('.modal-header button'));
        closeButton.nativeElement.click();

        expect(modalClosedSpy).toHaveBeenCalled();
    });
});