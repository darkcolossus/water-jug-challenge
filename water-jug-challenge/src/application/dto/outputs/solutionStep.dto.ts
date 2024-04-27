export class SolutionStepDTO {
    step: number;
    bucketX: number;
    bucketY: number;
    action: string
    status: string;

    constructor(step: number, bucketX: number, bucketY: number, action: string, status: string = "") {
        this.step = step;
        this.bucketX = bucketX;
        this.bucketY = bucketY;
        this.action = action;
        this.status = status
    }
}