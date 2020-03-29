declare class Authorize {
    authorizeUser(req: any, res: any, next: any): Promise<void>;
    authorizeTodo(req: any, res: any, next: any): Promise<void>;
}
export default Authorize;
