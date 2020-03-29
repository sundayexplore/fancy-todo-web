declare class UserController {
    static signUp(req: any, res: any, next: any): Promise<void>;
    static signIn(req: any, res: any, next: any): Promise<void>;
    static updatePut(req: any, res: any, next: any): Promise<void>;
    static updatePatch(req: any, res: any, next: any): Promise<void>;
    static delete(req: any, res: any, next: any): Promise<void>;
}
export default UserController;
