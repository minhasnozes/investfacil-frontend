export type InvestorProfile = "CONSERVADOR" | "MODERADO" | "ARROJADO";

export type User = {
  id: string;
  name: string;
  email: string;
  investorProfile?: InvestorProfile | null;
};
