import { Module } from "@nestjs/common";
import { HealthCheckController } from "../application/controllers/healthCheck.controller";
import { HealthCheckService } from "../application/services/healthCheck.service";

@Module({
    controllers: [HealthCheckController],
    providers: [HealthCheckService],
    exports: [HealthCheckService],
})
export class HealthCheckModule {}