import { Controller, Get, Logger } from "@nestjs/common";
import { HealthCheckService } from "../services/healthCheck.service";

@Controller('/healthcheck')
export class HealthCheckController {

    logger = new Logger('HealthCheckController')

    constructor(private readonly healthCheckService: HealthCheckService) {}

    @Get()
    async healthCheck(): Promise<string> {
        this.logger.log('METHOD - healthCheck()')
        return await this.healthCheckService.healthCheck();
    }

}