import {Component, Inject} from '@angular/core';
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
    CommonModule
  ],
  templateUrl: './submit-modal.component.html',
  styleUrl: './submit-modal.component.scss'
})
export class SubmitModalComponent {

  constructor(
      public dialogRef: MatDialogRef<SubmitModalComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}


}
