import { Test, TestingModule } from '@nestjs/testing';
import { HealthCheckController } from  '../../src/application/controllers/healthCheck.controller';
import { HealthCheckService } from '../../src/application/services/healthCheck.service';

describe('HealthCheckController', () => {
  let healthCheckController: HealthCheckController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [HealthCheckController],
      providers: [HealthCheckService],
    }).compile();

    healthCheckController = app.get<HealthCheckController>(HealthCheckController);
  });

  describe('root', () => {
    it('should return "Hello world!"', async () => {
      expect(await healthCheckController.healthCheck()).toBe('Hello world!');
    });
  });
});
