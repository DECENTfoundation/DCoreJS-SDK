export interface ErrorResponse {
    code: number;
    message: string;
    data: Data;
}

export interface Data {
    code: number;
    name: string;
    message: string;
    stack: Stack[];
}

export interface Stack {
    context: Context;
    format: string;
    data: object;
}

export interface Context {
    level: string;
    file: string;
    line: number;
    method: string;
    hostname: string;
    thread_name: string;
    timestamp: Date;
}
