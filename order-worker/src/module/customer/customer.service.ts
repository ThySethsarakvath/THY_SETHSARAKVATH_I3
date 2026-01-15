// src/modules/customers/customers.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class CustomersService {
  private readonly blockedPhones = new Set(['+85512999999', '+85511111111']);

  private readonly blockedNationalIds = new Set(['A1234567', 'B9876543']);

  private readonly blockedNames = new Set(['john scammer', 'fraud user']);

  isBlockedPhone(phone: string): boolean {
    return this.blockedPhones.has(phone);
  }

  isBlockedNationalId(nationalId?: string): boolean {
    if (!nationalId) return false;
    return this.blockedNationalIds.has(nationalId.toUpperCase());
  }

  isBlockedName(name: string): boolean {
    return this.blockedNames.has(name.toLowerCase());
  }

  isCustomerBlocked(data: {
    phone?: string;
    nationalId?: string;
    fullName?: string;
  }): { blocked: boolean; reason?: string } {
    if (data.phone && this.isBlockedPhone(data.phone)) {
      return { blocked: true, reason: 'Phone number is blocked' };
    }

    if (data.nationalId && this.isBlockedNationalId(data.nationalId)) {
      return { blocked: true, reason: 'National ID is blocked' };
    }

    if (data.fullName && this.isBlockedName(data.fullName)) {
      return { blocked: true, reason: 'Customer name is blocked' };
    }

    return { blocked: false };
  }
}
