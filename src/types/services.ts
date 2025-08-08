import { BaseEntity } from './common';

export interface Service extends BaseEntity {
  title: string;
  description: string;
  icon: string;
  features: string[];
  price: string;
  duration?: string;
  category: ServiceCategory;
  isPopular?: boolean;
  maxParticipants?: number;
}

export interface ServiceCategory {
  id: string;
  name: string;
  color: string;
  description: string;
}

export interface Pricing {
  amount: number;
  currency: string;
  period: 'session' | 'month' | 'year';
  discount?: {
    percentage: number;
    validUntil: Date;
  };
}

export interface ServiceBooking {
  serviceId: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  preferredDate?: string;
  message?: string;
  status: BookingStatus;
}

export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';