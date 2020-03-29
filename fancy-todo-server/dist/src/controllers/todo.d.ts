declare class TodoController {
    static findAll(req: any, res: any, next: any): Promise<void>;
    static findOne(req: any, res: any, next: any): Promise<void>;
    static create(req: any, res: any, next: any): Promise<void>;
    static update(req: any, res: any, next: any): Promise<void>;
    static delete(req: any, res: any, next: any): Promise<void>;
}
export default TodoController;
