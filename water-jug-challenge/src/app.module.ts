import { Module } from '@nestjs/common';
import { HealthCheckModule } from './module/healthCheck.module';
import { WaterJugModule } from './module/waterJug.module';

@Module({
  imports: [HealthCheckModule, WaterJugModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
