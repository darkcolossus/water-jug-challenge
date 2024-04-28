import { Body, Controller, Inject, Logger, Post } from "@nestjs/common";
import { ApiResponse } from "@nestjs/swagger";
import { PayloadDTO } from "../dto/inputs/payload.dto";
import { SolutionDTO } from "../dto/outputs/solution.dto";
import { WaterJugService } from "../services/waterJugService.service";
import { ConfigService } from "@nestjs/config";

@Controller()
export class WaterJugController {
    logger = new Logger('JugController');

    constructor(
        private readonly waterJugService: WaterJugService,
        @Inject(ConfigService) private configService: ConfigService
    ) {}

    @Post('/solve')
    @ApiResponse({
        status: 201,
        description: 'solve puzzle.'
    })
    async solve(
        @Body() payloadDTO: PayloadDTO,
    ): Promise<SolutionDTO> {
        this.logger.log('METHOD solve')
        const method = this.configService.get<string>('SOLVE_METHOD', 'aStar');
        return await this.waterJugService.solve(payloadDTO, method);
    }
}