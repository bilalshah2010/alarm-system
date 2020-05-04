export interface SendFeedPayload {
  id: number;
  stationID?: number;
  companyID: number;
  companyName: string;
  password?: string;
  message: string;
}
