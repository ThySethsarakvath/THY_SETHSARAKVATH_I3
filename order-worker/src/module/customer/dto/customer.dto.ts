export interface VerifyCustomerDto {
  fullName: string;
  dob: string;
  phone: string;
  nationalId?: string;
}

export interface VerifyCustomerResponse {
  ok: boolean;
  normalized: {
    fullName: string;
    dob: string;
    phone: string;
    nationalId?: string;
  };
}
