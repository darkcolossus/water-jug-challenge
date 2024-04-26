import { Injectable, Logger } from "@nestjs/common";

@Injectable()
export class HealthCheckService {
    logger = new Logger('HealthCheckService')

    constructor() {}

    async healthCheck() : Promise<string> {
        this.logger.log('METHOD - healthCheck()')
        return "Hello world!";
    }
}