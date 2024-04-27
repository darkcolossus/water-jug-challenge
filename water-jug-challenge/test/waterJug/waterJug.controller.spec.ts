import { Test, TestingModule } from "@nestjs/testing";
import { WaterJugController } from "../../src/application/controllers/waterJug.controller";
import { WaterJugService } from "../../src/application/services/waterJugService.service";

describe('WaterJugController', () => {
    let waterJugController: WaterJugController;
    let waterJugService: WaterJugService;
  
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
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

    it('should not return a solution DFS', async () => {
        const solution = waterJugService.bfs(3,3,5);
        expect(solution.length).toBe(0);
    });
  });