import { Module } from "@nestjs/common";
import { WaterJugController } from "../application/controllers/waterJug.controller";
import { WaterJugService } from "../application/services/waterJugService.service";

@Module({
    controllers: [WaterJugController],
    providers: [WaterJugService],
    exports: [WaterJugService],
})
export class WaterJugModule {}