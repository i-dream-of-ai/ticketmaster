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

export interface TicketmasterVenue {
    id: string;
    name: string;
    url: string;
    city: {
        name: string;
    };
    state: {
        name: string;
        stateCode: string;
    };
    country: {
        name: string;
        countryCode: string;
    };
    address: {
        line1: string;
    };
    location: {
        longitude: string;
        latitude: string;
    };
    markets: Array<{
        id: string;
    }>;
    images?: Array<{
        url: string;
        ratio: string;
        width: number;
        height: number;
    }>;
}

export interface TicketmasterAttraction {
    id: string;
    name: string;
    type: string;
    url: string;
    images: Array<{
        url: string;
        ratio: string;
        width: number;
        height: number;
    }>;
    classifications?: Array<{
        primary: boolean;
        segment: {
            id: string;
            name: string;
        };
        genre?: {
            id: string;
            name: string;
        };
        subGenre?: {
            id: string;
            name: string;
        };
    }>;
}

export interface TicketmasterResponse {
    _embedded?: {
        events?: TicketmasterEvent[];
        venues?: TicketmasterVenue[];
        attractions?: TicketmasterAttraction[];
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

export type SearchType = 'event' | 'venue' | 'attraction';