import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {MatDivider} from "@angular/material/divider";
import {MatStep, MatStepLabel, MatStepper, MatStepperNext, MatStepperPrevious} from "@angular/material/stepper";
import {ReactiveFormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {CaptchaSelectComponent} from "./captcha-select/captcha-select.component";
import {DataService} from "./data.service";
import {HttpClientModule} from "@angular/common/http";
import {NgIf} from "@angular/common";

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        RouterOutlet,
        MatDivider,
        MatStep,
        MatStepper,
        ReactiveFormsModule,
        MatButton,
        MatStepLabel,
        MatStepperNext,
        MatStepperPrevious,
        CaptchaSelectComponent,
        HttpClientModule,
        NgIf
    ],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'kogni';
    stageNames: { [key in 'Zone' | 'Continent' | 'Country']: string } = {'Zone': '', 'Continent': '', 'Country': ''};
    stagePhotos: {
        [key in 'Zone' | 'Continent' | 'Country']: {
            photoName: string,
            isCorrect: boolean
        }[]
    } = {'Zone': [], 'Continent': [], 'Country': []};
    dataLoaded: boolean = false;

    constructor(private dataService: DataService) {
    }

    ngOnInit() {
        this.dataService.loadCSV('assets/images.csv').subscribe({
            next: () => {
                this.updateStageData();
                this.dataLoaded = true;
            },
            error: (err) => {
                console.error('Error loading CSV:', err);
            }
        });
    }

    private updateStageData() {
        for (const stage of Object.keys(this.stageNames)) {
            const response = this.dataService.generateResponse(stage as keyof typeof this.stageNames);
            this.stageNames[stage as keyof typeof this.stageNames] = response.name;
            this.stagePhotos[stage as keyof typeof this.stageNames] = response.data;
        }
    }
}
