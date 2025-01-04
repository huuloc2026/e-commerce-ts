import {
    ReasonPhrases,
    StatusCodes,
    getReasonPhrase,
    getStatusCode,
} from 'http-status-codes';


export class ErrorResponse extends Error {
    public status: number;
    constructor(message: string,status:number) {
        super(message);
        this.status=status
        Error.captureStackTrace(this, this.constructor);
    }
}
// 400 Bad Request
export class BadRequestError extends ErrorResponse {
    constructor(message:string = ReasonPhrases.BAD_REQUEST, status:number = StatusCodes.BAD_REQUEST) {
        super(message, status);
    }
}

// 401 Unauthorized
export class UnauthorizedError extends ErrorResponse {
    constructor(message:string = ReasonPhrases.UNAUTHORIZED, status = StatusCodes.UNAUTHORIZED) {
        super(message, status);
    }
}

// 403 Forbidden
export class ForbiddenError extends ErrorResponse {
    constructor(message: string = ReasonPhrases.FORBIDDEN, status = StatusCodes.FORBIDDEN) {
        super(message, status);
    }
}

// 404 Not Found
export class NotFoundError extends ErrorResponse {
    constructor(message: string = ReasonPhrases.NOT_FOUND, status = StatusCodes.NOT_FOUND) {
        super(message, status);
    }
}

// 409 Conflict
export class ConflictError extends ErrorResponse {
    constructor(message: string = ReasonPhrases.CONFLICT, status = StatusCodes.CONFLICT) {
        super(message, status);
    }
}

// 422 Unprocessable Entity
export class UnprocessableEntityError extends ErrorResponse {
    constructor(message: string = ReasonPhrases.UNPROCESSABLE_ENTITY, status = StatusCodes.UNPROCESSABLE_ENTITY) {
        super(message, status);
    }
}

// 500 Internal Server Error
export class InternalServerError extends ErrorResponse {
    constructor(message: string = ReasonPhrases.INTERNAL_SERVER_ERROR, status = StatusCodes.INTERNAL_SERVER_ERROR) {
        super(message, status);
    }
}

// 503 Service Unavailable
export class ServiceUnavailableError extends ErrorResponse {
    constructor(message: string = ReasonPhrases.SERVICE_UNAVAILABLE, status = StatusCodes.SERVICE_UNAVAILABLE) {
        super(message, status);
    }
}

export class TooManyRequestsError extends ErrorResponse {
    constructor(message: string = ReasonPhrases.TOO_MANY_REQUESTS, status = StatusCodes.TOO_MANY_REQUESTS) {
        super(message, status);
    }
}

export class GatewayTimeoutError extends ErrorResponse {
    constructor(message: string = ReasonPhrases.GATEWAY_TIMEOUT, status = StatusCodes.GATEWAY_TIMEOUT) {
        super(message, status);
    }
}
