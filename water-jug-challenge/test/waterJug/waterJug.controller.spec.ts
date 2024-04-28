import { Test, TestingModule } from "@nestjs/testing";
import { WaterJugController } from "../../src/application/controllers/waterJug.controller";
import { WaterJugService } from "../../src/application/services/waterJugService.service";
import { RedisModule } from "@nestjs-modules/ioredis";
import { ConfigModule, ConfigService } from "@nestjs/config";

describe('WaterJugController', () => {
    let waterJugController: WaterJugController;
    let waterJugService: WaterJugService;
  
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        imports: [
            RedisModule.forRootAsync({
                imports: [ConfigModule],
                inject: [ConfigService],
                useFactory: (configService: ConfigService) => ({
                  type: 'single',
                  url: `redis://${configService.get<string>('REDIS_HOST', 'localhost')}:6379`,
                }),
              }),
        ],
        controllers: [WaterJugController],
        providers: [WaterJugService],
      }).compile();
  
      waterJugController = module.get<WaterJugController>(WaterJugController);
      waterJugService = module.get<WaterJugService>(WaterJugService);
    });

    it('controller should be defined', () => {
        expect(waterJugController).toBeDefined();
    })
  
    it('service should be defined', () => {
        expect(waterJugService).toBeDefined();
    })

    it('should find a solution using BFS', async () => {
        const solution = waterJugService.bfs(2,10,4);
        expect(solution).toBeDefined();
        expect(solution[solution.length - 1].status).toBe("Solved");
        expect(solution.some(step => step.bucketX === 2 || step.bucketY === 2)).toBeTruthy();
    });

    it('should not return a solution BFS', async () => {
        const solution = waterJugService.bfs(2,6,5);
        expect(solution.length).toBe(0);
    });

    it('should find a solution using BFS', async () => {
        const solution = waterJugService.bfs(2,100,96);
        expect(solution).toBeDefined();
        expect(solution[solution.length - 1].status).toBe("Solved");
        expect(solution.some(step => step.bucketX === 2 || step.bucketY === 98)).toBeTruthy();
    });

    it('should not return a solution using DFS', async () => {
        const solution = waterJugService.dfs(3,3,5);
        expect(solution.length).toBe(0);
    });
    
    it('should return a solution BFS or DFS', async () => {
        const payload = { x_capacity: 17, y_capacity: 21, z_amount_wanted: 15};
        const solutionBFS = await waterJugService.solve(payload, 'bfs');
        expect(solutionBFS.solution[solutionBFS.solution.length-1].status).toEqual('Solved');
        const solutionDFS = await waterJugService.solve(payload, 'dfs');
        expect(solutionDFS.solution[solutionDFS.solution.length-1].status).toEqual('Solved');
    });

    it('should return a solution BFS or DFS', async () => {
        const payload = { x_capacity: 8, y_capacity: 9, z_amount_wanted: 7};
        const solutionBFS = await waterJugService.solve(payload, 'bfs');
        expect(solutionBFS.solution[solutionBFS.solution.length-1].status).toEqual('Solved');
        const solutionDFS = await waterJugService.solve(payload, 'dfs');
        expect(solutionDFS.solution[solutionDFS.solution.length-1].status).toEqual('Solved');
    });

    it('should not return a solution BFS or DFS', async () => {
        const payload = { x_capacity: 10, y_capacity: 15, z_amount_wanted: 12};
        const solutionBFS = await waterJugService.solve(payload, 'bfs');
        expect(solutionBFS.solution[0].status).toEqual('No solution!');
        const solutionDFS = await waterJugService.solve(payload, 'dfs');
        expect(solutionDFS.solution[0].status).toEqual('No solution!');
    });

    it('should return a solution BFS or DFS', async () => {
        const payload = { x_capacity: 101, y_capacity: 103, z_amount_wanted: 100};
        const solutionBFS = await waterJugService.solve(payload, 'bfs');
        expect(solutionBFS.solution[solutionBFS.solution.length-1].status).toEqual('Solved');
        const solutionDFS = await waterJugService.solve(payload, 'dfs');
        expect(solutionDFS.solution[solutionDFS.solution.length-1].status).toEqual('Solved');
    });

    it('should return a solution BFS or DFS', async () => {
        const payload = { x_capacity: 999, y_capacity: 1000, z_amount_wanted: 500};
        const solutionBFS = await waterJugService.solve(payload, 'bfs');
        expect(solutionBFS.solution[solutionBFS.solution.length-1].status).toEqual('Solved');
        const solutionDFS = await waterJugService.solve(payload, 'dfs');
        expect(solutionDFS.solution[solutionDFS.solution.length-1].status).toEqual('Solved');
    });

    it('should not return a solution BFS or DFS', async () => {
        const payload = { x_capacity: 250, y_capacity: 380, z_amount_wanted: 225};
        const solutionBFS = await waterJugService.solve(payload, 'bfs');
        expect(solutionBFS.solution[0].status).toEqual('No solution!');
        const solutionDFS = await waterJugService.solve(payload, 'dfs');
        expect(solutionDFS.solution[0].status).toEqual('No solution!');
    });

    it('should return a solution BFS or DFS', async () => {
        const payload = { x_capacity: 10000, y_capacity: 15000, z_amount_wanted: 5000};
        const solutionBFS = await waterJugService.solve(payload, 'bfs');
        expect(solutionBFS.solution[solutionBFS.solution.length-1].status).toEqual('Solved');
        const solutionDFS = await waterJugService.solve(payload, 'dfs');
        expect(solutionDFS.solution[solutionDFS.solution.length-1].status).toEqual('Solved');
    });

    it('should not return a solution BFS or DFS', async () => {
        const payload = { x_capacity: 20000, y_capacity: 35000, z_amount_wanted: 1500};
        const solutionBFS = await waterJugService.solve(payload, 'bfs');
        expect(solutionBFS.solution[0].status).toEqual('No solution!');
        const solutionDFS = await waterJugService.solve(payload, 'dfs');
        expect(solutionDFS.solution[0].status).toEqual('No solution!');
    });

    it('should not return a solution BFS or DFS', async () => {
        const payload = { x_capacity: 50000, y_capacity: 100000, z_amount_wanted: 20000};
        const solutionBFS = await waterJugService.solve(payload, 'bfs');
        expect(solutionBFS.solution[0].status).toEqual('No solution!');
        const solutionDFS = await waterJugService.solve(payload, 'dfs');
        expect(solutionDFS.solution[0].status).toEqual('No solution!');
    });

    it('should return a solution using aStar', async () => {
        const payload = { x_capacity: 1000000, y_capacity: 1600020, z_amount_wanted: 500020};
        const solutionAstar = await waterJugService.solve(payload, 'aStar');
        expect(solutionAstar.solution[solutionAstar.solution.length-1].status).toEqual('Solved');
    });
  });