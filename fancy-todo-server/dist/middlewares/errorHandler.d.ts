interface IError extends Error {
    status: number;
    name: string;
    message: string;
}
declare const _default: (err: IError, req: object, res: any, next: any) => void;
export default _default;
