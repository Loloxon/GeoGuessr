import * as path from "node:path";

export class ImageModel {
    public path: string;
    public isCorrect: boolean = false;
    public isSelected: boolean = false;


    constructor(path: string = "assets/view.avif", isCorrect: boolean = false) {
        this.path = path;
        this.isCorrect = isCorrect;
    }

}
