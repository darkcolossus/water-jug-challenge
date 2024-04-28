import { Module } from '@nestjs/common';
import { RedisModule } from '@nestjs-modules/ioredis';
import { HealthCheckModule } from './module/healthCheck.module';
import { WaterJugModule } from './module/waterJug.module';

@Module({
  imports: [
    RedisModule.forRoot({
      type: 'single',
      url: 'redis://localhost:6379',
    }),
    HealthCheckModule, 
    WaterJugModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
