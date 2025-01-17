export interface TicketmasterEvent {
    id: string;
    name: string;
    dates: {
        start: {
            localDate: string;
            localTime: string;
            dateTime: string;
        };
    };
    priceRanges?: Array<{
        type: string;
        currency: string;
        min: number;
        max: number;
    }>;
    url: string;
    images: Array<{
        url: string;
        ratio: string;
        width: number;
        height: number;
    }>;
}

export interface TicketmasterResponse {
    _embedded?: {
        events: TicketmasterEvent[];
    };
    page: {
        size: number;
        totalElements: number;
        totalPages: number;
        number: number;
    };
}

export interface TicketmasterError {
    fault: {
        faultstring: string;
        detail: {
            errorcode: string;
        };
    };
}

export class TicketmasterApiError extends Error {
    constructor(
        message: string,
        public readonly code?: string,
        public readonly status?: number
    ) {
        super(message);
        this.name = 'TicketmasterApiError';
    }
}