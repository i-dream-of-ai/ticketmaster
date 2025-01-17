import axios, { AxiosError } from 'axios';
import { TicketmasterApiError, TicketmasterEvent, TicketmasterError, TicketmasterResponse } from './types.js';

/**
 * Client for interacting with the Ticketmaster Discovery API
 */
export class TicketmasterClient {
    private readonly apiKey: string;
    private readonly baseUrl = 'https://app.ticketmaster.com/discovery/v2';
    private readonly msgVenueId = 'KovZpZA7AAEA'; // Madison Square Garden venue ID

    constructor(apiKey: string) {
        if (!apiKey) {
            throw new Error('API key is required');
        }
        this.apiKey = apiKey;
    }

    /**
     * Formats a date range for the Ticketmaster API
     * @param startDate Start of the date range
     * @param endDate End of the date range
     * @returns Formatted date range string
     */
    formatDateRange(startDate: Date, endDate: Date): string {
        // Set start time to beginning of day in UTC
        const start = new Date(startDate);
        start.setUTCHours(0, 0, 0, 0);

        // Set end time to end of day in UTC
        const end = new Date(endDate);
        end.setUTCHours(23, 59, 59, 999);

        return `${start.toISOString().split('.')[0]}Z,${end.toISOString().split('.')[0]}Z`;
    }

    /**
     * Gets events at Madison Square Garden for a given date range
     * @param startDate Start of the date range
     * @param endDate End of the date range
     * @returns Array of events
     * @throws TicketmasterApiError if the API request fails
     */
    async getEventsAtVenue(startDate: Date, endDate: Date): Promise<TicketmasterEvent[]> {
        try {
            const dateRange = this.formatDateRange(startDate, endDate);
            const [startDateTime, endDateTime] = dateRange.split(',');

            const response = await axios.get<TicketmasterResponse>(`${this.baseUrl}/events`, {
                params: {
                    apikey: this.apiKey,
                    venueId: this.msgVenueId,
                    startDateTime,
                    endDateTime,
                    size: 200, // Maximum page size
                    sort: 'date,asc'
                }
            });

            return response.data._embedded?.events || [];
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError<TicketmasterError>;
                const apiError = axiosError.response?.data?.fault;
                
                throw new TicketmasterApiError(
                    apiError?.faultstring || 'Failed to fetch events',
                    apiError?.detail?.errorcode,
                    axiosError.response?.status
                );
            }
            
            throw error;
        }
    }
}