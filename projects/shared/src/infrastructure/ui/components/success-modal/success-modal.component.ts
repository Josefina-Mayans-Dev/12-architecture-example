import { Component, Input, input, output } from '@angular/core';

@Component({
    selector: 'lib-success-modal',
    imports: [],
    templateUrl: './success-modal.component.html',
    styleUrl: './success-modal.component.scss'
})

export class SuccessModalComponent {
    @Input() isVisible = false;
   // isVisible = input<boolean>(false);
    title = input<string>('Register Successful!');

    modalClosed = output<void>();

    close() {
        this.modalClosed.emit();
    }

}