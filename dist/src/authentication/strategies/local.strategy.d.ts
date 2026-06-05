import { Strategy } from 'passport-local';
import { AuthenticationService } from '../authentication.service';
declare const LocalStrategy_base: new (...args: [] | [options: import("passport-local").IStrategyOptionsWithRequest] | [options: import("passport-local").IStrategyOptions]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class LocalStrategy extends LocalStrategy_base {
    private authService;
    constructor(authService: AuthenticationService);
    validate(email: string, password: string): Promise<any>;
}
export {};
