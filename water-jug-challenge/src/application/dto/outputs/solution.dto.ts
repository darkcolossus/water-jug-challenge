import { SolutionStepDTO } from "./solutionStep.dto";

export class SolutionDTO {
    
    solution: SolutionStepDTO[];

    constructor(solution: SolutionStepDTO[]) {
        this.solution = solution;
    }
}