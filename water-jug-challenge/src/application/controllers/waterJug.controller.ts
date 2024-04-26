import { Body, Controller, Logger, Post } from "@nestjs/common";
import { ApiResponse } from "@nestjs/swagger";
import { PayloadDTO } from "../dto/inputs/payload.dto";
import { SolutionDTO } from "../dto/outputs/solution.dto";
import { WaterJugService } from "../services/waterJugService.service";

@Controller()
export class WaterJugController {
    logger = new Logger('JugController');

    constructor(private readonly waterJugService: WaterJugService) {}

    @Post('/jug')
    @ApiResponse({
        status: 201,
        description: 'solve puzzle.'
    })
    async jug(
        @Body() payloadDTO: PayloadDTO,
    ): Promise<SolutionDTO> {
        this.logger.log('METHOD jug')
        return await this.waterJugService.getSolution(payloadDTO);
    }

    
}