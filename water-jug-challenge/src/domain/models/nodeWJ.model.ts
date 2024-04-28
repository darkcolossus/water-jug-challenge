import { State } from "./state.model";

export class NodeWJ {
    public state: State;
    public parent: NodeWJ | null;
    public next: NodeWJ | null;
    public action: string;
    public step: number;
    public status: string;
    public g: number = 0;
    public h: number = 0;
    public f: number = 0;

    constructor(state: State, parent: NodeWJ, action: string, step: number) {
        this.state = state;
        this.parent = parent;
        this.action = action;
        this.step = step;
        this.next = null;
        this.status = "";
    }

    print() {
        return JSON.stringify(this.state) ;
    }
}