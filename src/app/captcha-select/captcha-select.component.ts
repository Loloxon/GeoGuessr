// captcha-select.component.ts
import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {MatCheckbox} from "@angular/material/checkbox";
import {ImageModel} from "./image-model";
import {CommonModule} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {MatDialog} from "@angular/material/dialog";
import {SubmitModalComponent} from "../submit-modal/submit-modal.component";

interface ImageData {
    photoName: string;
    isCorrect: boolean;
}

@Component({
    selector: 'app-captcha-select',
    standalone: true,
    imports: [
        MatCheckbox,
        CommonModule,
        MatButton
    ],
    templateUrl: './captcha-select.component.html',
    styleUrl: './captcha-select.component.scss',
})
export class CaptchaSelectComponent implements OnChanges {

    @Input()
    public stageName: string = '';

    @Input()
    public imageNames: ImageData[] = [];

    public images: ImageModel[] = [];

    public selectedImgListLength: number = 0;

    constructor(private dialog: MatDialog) {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['imageNames'] && changes['imageNames'].currentValue) {
            this.images = this.imageNames.map(data => new ImageModel('assets/images/' + data.photoName, data.isCorrect));
        }
    }

    public onClickImage(img: ImageModel) {
        if (img.isSelected) {
            img.isSelected = false;
        } else {
            this.selectedImgListLength = this.images.filter((i: ImageModel) => i.isSelected).length;

            if (this.selectedImgListLength < 5) {
                console.log('dupa: ' + img.isCorrect)
                img.isSelected = true;
            }
        }

        this.selectedImgListLength = this.images.filter((i: ImageModel) => i.isSelected).length;
    }

    public onConfirm() {
        const dialogRef = this.dialog.open(SubmitModalComponent, {
            data: {
                title: 'You selected right images!',
                subtitle: 'You can now go to the next stage',
                nextButtonActive: true,
                retryButtonActive: true
            }
        })
    }
}
