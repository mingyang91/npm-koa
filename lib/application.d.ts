import { EventEmitter } from 'events';
import * as http from 'http';
import * as compose from 'koa-compose';
import Keygrip = require('keygrip');
import { BaseRequest, Request as _Request } from './request';
import { BaseResponse, Response as _Response } from './response';
import { BaseContext, Context as _Context } from './context';

declare namespace app {
    export type Request = _Request;
    export type Response = _Response;
    export type Context = _Context;

    export interface Application extends EventEmitter {
        proxy: boolean;
        middleware: compose.Middleware<Context>[];
        subdomainOffset: number;
        env: string;
        context: BaseContext;
        request: BaseRequest;
        response: BaseResponse;
        silent: boolean;
        keys: Keygrip | string[];

        /**
         * Shorthand for:
         *
         *    http.createServer(app.callback()).listen(...)
         */
        listen(port: number, hostname?: string, backlog?: number, callback?: Function): http.Server;
        listen(port: number, hostname?: string, callback?: Function): http.Server;
        listen(path: string, callback?: Function): http.Server;
        listen(handle: any, listeningListener?: Function): http.Server;
        listen(): http.Server;

        /**
         * Return JSON representation.
         * We only bother showing settings.
         */
        inspect(): any;

        /**
         * Return JSON representation.
         * We only bother showing settings.
         */
        toJSON(): any;

        /**
         * Use the given middleware `fn`.
         *
         * Old-style middleware will be converted.
         */
        use(middleware: compose.Middleware<Context>): this;

        /**
         * Return a request handler callback
         * for node's native http server.
         */
        callback(): (req: http.IncomingMessage, res: http.ServerResponse) => void;

        /**
         * Default error handler.
         */
        onerror(err: Error): void;
    }

    export interface Koa {
        new (): Application;
    }
}

declare const app: app.Koa;

export = app;