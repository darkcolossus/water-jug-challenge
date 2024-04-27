import { Injectable, Logger } from "@nestjs/common";
import { PayloadDTO } from "../dto/inputs/payload.dto";
import { SolutionStepDTO } from "../dto/outputs/solutionStep.dto";
import { SolutionDTO } from "../dto/outputs/solution.dto";
import { NodeWJ } from "src/domain/models/nodeWJ.model";
import { State } from "src/domain/models/state.model";
import { last } from "rxjs";

@Injectable()
export class WaterJugService {

    logger = new Logger('WaterJugService');

    constructor() {}

    async solve(payload: PayloadDTO, method: 'bfs' | 'dfs' = 'bfs') : Promise<SolutionDTO>{
        this.logger.log(`METHOD - getSolution: ${method}`);
        let solution = method === 'bfs'? this.bfs(payload.x_capacity, payload.y_capacity, payload.z_amount_wanted):
                                         this.dfs(payload.x_capacity, payload.y_capacity, payload.z_amount_wanted);
        return solution.length > 0? new SolutionDTO(solution): new SolutionDTO([new SolutionStepDTO(0, 0, 0, '', 'No solution!')]);
    }

    dfs(xCapacity: number, yCapacity: number, zAmountWanted: number) : SolutionStepDTO[] {
        let stack: NodeWJ[] = [new NodeWJ(new State(0, 0), null, 'Start', 0)];
        let visited: Set<string> = new Set(['0,0']);

        while(stack.length > 0) {
            let current = stack.pop()!;
            let {bucketX, bucketY} = current.state;

            if (bucketX === zAmountWanted || bucketY === zAmountWanted) {
                current.status = "Solved";
                return this.solutionPath(current);
            }

            this.generatePossibleActions(current, xCapacity, yCapacity).forEach(actionNode => {
                let stateKey = `${actionNode.state.bucketX},${actionNode.state.bucketY}`;

                if(!visited.has(stateKey)) {
                    visited.add(stateKey);
                    stack.push(actionNode);
                }
            });
        }
        
        return [];
    }

    bfs(xCapacity: number, yCapacity: number, zAmountWanted: number) : SolutionStepDTO[] {
        let queue: NodeWJ[] = [new NodeWJ(new State(0, 0), null, 'Start', 0)];
        let visited: Set<string> = new Set(['0,0']);

        while(queue.length > 0) {
            let current = queue.shift()!;
            let {bucketX, bucketY} = current.state;

            if (bucketX === zAmountWanted || bucketY === zAmountWanted) {
                current.status = "Solved"
                return this.solutionPath(current);
            }

            this.generatePossibleActions(current, xCapacity, yCapacity).forEach((actionNode) => {
                let actionNodeStateKey = `${actionNode.state.bucketX},${actionNode.state.bucketY}}`;

                if (!visited.has(actionNodeStateKey)) {
                    visited.add(actionNodeStateKey);
                    queue.push(actionNode);
                }
            });
        }

        return [];
    }

    generatePossibleActions(currentNode: NodeWJ, xCapacity: number, yCapacity: number) : NodeWJ[] {
        let actions: NodeWJ[] = [];
        let { bucketX, bucketY } = currentNode.state;
        let step = currentNode.step + 1;

        this.logger.log("CURRENT NODE - " , currentNode.print());

        // Fill bucketX
        if (bucketX < xCapacity) {
            actions.push(new NodeWJ(new State(xCapacity, bucketY), currentNode, 'Fill bucket x', step));
        }
        // Fill bucketY
        if (bucketY < yCapacity) {
            actions.push(new NodeWJ(new State(bucketX, yCapacity), currentNode, 'Fill bucket y', step));
        }
        // Empty bucketX
        if (bucketX > 0) {
            actions.push(new NodeWJ(new State(0, bucketY), currentNode, 'Empty bucket x', step));
        }
        // Empty bucketY
        if (bucketY > 0) {
            actions.push(new NodeWJ(new State(bucketX, 0), currentNode, 'Empty bucket y', step));
        }
        // Transfer from bucketX to bucketY
        let transferXtoY = Math.min(bucketX, yCapacity - bucketY);
        if (transferXtoY > 0) {
            actions.push(new NodeWJ(new State(bucketX - transferXtoY, bucketY + transferXtoY), currentNode, 'Transfer from bucket x to bucket y', step));
        }
        // Transfer from bucketY to bucketX
        let transferYtoX = Math.min(xCapacity - bucketX, bucketY);
        if (transferYtoX > 0) {
            actions.push(new NodeWJ(new State(bucketX + transferYtoX, bucketY - transferYtoX), currentNode, 'Transfer from bucket y to bucket x', step));
        }

        return actions;
    }

    solutionPath(solutionNode: NodeWJ) : SolutionStepDTO[] {
        let solutionPath : SolutionStepDTO[] = [];
        let current = solutionNode;
        let stepNumber = current.step;

        while(current != null) {
            solutionPath.unshift(new SolutionStepDTO(stepNumber--, current.state.bucketX, current.state.bucketY, current.action, current.status));
            current = current.parent;
        }

        return solutionPath;
    }
}