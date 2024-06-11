import {Component, Inject, Input} from '@angular/core';
import {
    MAT_DIALOG_DATA,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent, MatDialogRef,
    MatDialogTitle
} from "@angular/material/dialog";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatButton} from "@angular/material/button";
import {CommonModule} from "@angular/common";
import {MatStepper, MatStepperNext} from "@angular/material/stepper";

@Component({
    selector: 'app-submit-modal',
    standalone: true,
    imports: [
        MatDialogContent,
        MatLabel,
        MatFormField,
        MatButton,
        MatDialogActions,
        MatDialogClose,
        MatDialogTitle,
        CommonModule,
        MatStepperNext
    ],
    templateUrl: './submit-modal.component.html',
    styleUrl: './submit-modal.component.scss'
})
export class SubmitModalComponent {
    @Input()
    stepper!: MatStepper;

    constructor(
        public dialogRef: MatDialogRef<SubmitModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
    ) {
    }

    onRetry(): void {
        window.location.reload();
        this.dialogRef.close('retry');
    }

    onNext(): void {
        if (this.stepper) {
            this.stepper.next();
        }
        this.dialogRef.close('next');
    }


}
