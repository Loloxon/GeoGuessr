import { Injectable } from '@angular/core';
import * as Papa from 'papaparse';
import { shuffle } from 'lodash';
import { HttpClient } from '@angular/common/http';
import { Observable, Observer } from 'rxjs';

interface CsvData {
    [key: string]: string;
}

@Injectable({
    providedIn: 'root'
})
export class DataService {
    private static readonly MIN_CHOSEN_SAMPLES = 5;
    private static readonly MIN_NOT_CHOSEN_SAMPLES = 4;

    private stageNames = {
        Zone: 'Strefa Klimatyczna',
        Continent: 'Kontynent',
        Country: 'Kraj'
    };

    private stageLists: { [key: string]: string[] } = {};
    private df: CsvData[] = [];

    constructor(private http: HttpClient) { }

    loadCSV(url: string): Observable<void> {
        return new Observable<void>((observer: Observer<void>) => {
            this.http.get(url, { responseType: 'text' }).subscribe({
                next: data => this.parseCSV(data, observer),
                error: (error: any) => observer.error(error)
            });
        });
    }

    private parseCSV(data: string, observer: Observer<void>) {
        Papa.parse<CsvData>(data, {
            header: true,
            skipEmptyLines: true,
            complete: (result: Papa.ParseResult<CsvData>) => {
                this.df = result.data;
                this.populateStageLists();
                observer.next();
                observer.complete();
            },
            error: (error: any) => observer.error(error)
        });
    }

    private populateStageLists() {
        for (const stage in this.stageNames) {
            this.stageLists[stage] = Array.from(new Set(this.df.map(item => item[this.stageNames[stage as keyof typeof this.stageNames]])));
        }
    }

    generateResponse(stage: keyof typeof this.stageNames): { name: string, data: { photoName: string, isCorrect: boolean }[] } {
        const stages = this.stageLists[stage];
        if (!stages || stages.length === 0) {
            console.error('No data available for stage:', stage);
            return { name: '', data: [] };
        }

        var chosenStage = stages[Math.floor(Math.random() * stages.length)];
        const [dfChosen, dfNotChosen] = this.splitDataFrames(stage, chosenStage);

        if (dfChosen.length < DataService.MIN_CHOSEN_SAMPLES || dfNotChosen.length < DataService.MIN_NOT_CHOSEN_SAMPLES) {
            console.error('Insufficient data for stage:', chosenStage);
            return { name: chosenStage.toUpperCase(), data: [] };
        }

        const resultData = this.generateResultData(dfChosen, dfNotChosen);
        return {
            name: chosenStage.toUpperCase(),
            data: resultData
        };
    }

    private splitDataFrames(stage: keyof typeof this.stageNames, chosenStage: string): [CsvData[], CsvData[]] {
        const dfChosen = this.df.filter(item => item[this.stageNames[stage]] === chosenStage);
        const dfNotChosen = this.df.filter(item => item[this.stageNames[stage]] !== chosenStage);
        return [dfChosen, dfNotChosen];
    }

    private generateResultData(dfChosen: CsvData[], dfNotChosen: CsvData[]): { photoName: string, isCorrect: boolean }[] {
        const chosenSamples = shuffle(dfChosen).slice(0, DataService.MIN_CHOSEN_SAMPLES);
        const notChosenSamples = shuffle(dfNotChosen).slice(0, DataService.MIN_NOT_CHOSEN_SAMPLES);

        const resultData = [
            ...chosenSamples.map(item => ({ photoName: item['Nazwa zdjecia'], isCorrect: true })),
            ...notChosenSamples.map(item => ({ photoName: item['Nazwa zdjecia'], isCorrect: false }))
        ];

        return shuffle(resultData);
    }
}
