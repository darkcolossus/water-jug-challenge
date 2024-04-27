import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { HealthCheckModule } from '../src/module/healthCheck.module';
import { WaterJugModule } from '../src/module/waterJug.module';
import { SolutionStepDTO } from '../src/application/dto/outputs/solutionStep.dto';

describe('HealthCheckController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [HealthCheckModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/healthCheck')
      .expect(200)
      .expect('Hello world!');
  });

  afterEach(async () => {
    await app.close();
  });
});

describe('WaterJugController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [WaterJugModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/solve (POST) should resolve Water Jug Puzzle using BFS algorithm', () => {
    return request(app.getHttpServer())
      .post('/solve')
      .send({ x_capacity: 2, y_capacity: 10, z_amount_wanted: 4})
      .expect(201)
      .expect(response => {
        expect(response.body.solution[response.body.solution.length-1]).toEqual(new SolutionStepDTO(4, 0, 4, "Transfer from bucket x to bucket y", "Solved"));
      });
  });  

  afterEach(async () => {
    await app.close();
  });
});
