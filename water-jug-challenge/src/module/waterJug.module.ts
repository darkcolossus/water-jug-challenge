import { Module } from "@nestjs/common";
import { WaterJugController } from "src/application/controllers/waterJug.controller";
import { WaterJugService } from "src/application/services/waterJugService.service";

@Module({
    controllers: [WaterJugController],
    providers: [WaterJugService],
    exports: [WaterJugService],
})
export class WaterJugModule {}