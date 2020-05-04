export interface Company {
  id: number;
  username: string;
  type: string;
  auth_type: string;
  stations?: Array<{
    id: number;
    name: string;
    cameras: Array<{
      id: number;
      message: string;
      state?: boolean;
      responseMessage?: string;
    }>;
  }>;
  cameras?: Array<{
    id: number;
    message: string;
    state?: boolean;
    responseMessage?: string;
  }>;
}
