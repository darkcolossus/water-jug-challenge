import { Module } from '@nestjs/common';
import { HealthCheckModule } from './module/healthCheck.module';

@Module({
  imports: [HealthCheckModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
