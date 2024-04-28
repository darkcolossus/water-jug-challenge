import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisModule } from '@nestjs-modules/ioredis';
import { HealthCheckModule } from './module/healthCheck.module';
import { WaterJugModule } from './module/waterJug.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    RedisModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'single',
        url: `redis://${configService.get<string>('REDIS_HOST', 'localhost')}:6379`,
      }),
    }),
    HealthCheckModule, 
    WaterJugModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
