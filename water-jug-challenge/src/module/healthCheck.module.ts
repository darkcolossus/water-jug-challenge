import { Module } from "@nestjs/common";
import { HealthCheckController } from "src/application/controllers/healthCheck.controller";
import { HealthCheckService } from "src/application/services/healthCheck.service";

@Module({
    controllers: [HealthCheckController],
    providers: [HealthCheckService],
    exports: [HealthCheckService],
})
export class HealthCheckModule {}