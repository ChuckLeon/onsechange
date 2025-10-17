export type Step = "SetOrganiser" | "AddUsers" | "ExchangeSent";

// Email API Types
export interface EmailApiRequest {
  exchangeName: string;
  organiser: string;
  playerEmail: string;
  playerName: string;
  giftee: string;
}

export interface EmailApiResponse {
  id: string;
  from: string;
  to: string[];
  created_at: string;
}

export interface EmailApiError {
  error: string;
}
