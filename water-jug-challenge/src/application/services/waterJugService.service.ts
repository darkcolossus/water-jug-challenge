import { Injectable, Logger } from "@nestjs/common";
import { PayloadDTO } from "../dto/inputs/payload.dto";
import { SolutionStepDTO } from "../dto/outputs/solutionStep.dto";
import { SolutionDTO } from "../dto/outputs/solution.dto";

@Injectable()
export class WaterJugService {

    logger = new Logger('WaterJugService');

    constructor() {}

    async solve(payload: PayloadDTO) {
        this.logger.log('METHOD - getSolution')
        const st1 = new SolutionStepDTO(1, 2, 0, "Fill bucket X")
        const st2 = new SolutionStepDTO(2, 0, 2, "Transfer from bucket X to Y")
        const st3 = new SolutionStepDTO(3, 2, 2, "Fill bucket X")
        const st4 = new SolutionStepDTO(4, 0, 4, "Transfer from bucket X to Y")
        const solution = new SolutionDTO([st1, st2, st3, st4])

        return solution;
    }
}