import { ErrorResponse } from "./ErrorResponse";

export interface DataResponse {
    id: number;
    result?: object;
    error?: ErrorResponse;
}
