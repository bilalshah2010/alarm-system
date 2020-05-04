import { Company } from "@/Models/Company";

export interface CompanyState {
  company?: Company;
  token: string;
  error: string;
  isSocketConnected: boolean;
}
