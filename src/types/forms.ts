import { ServiceType, FormStatus } from './common';

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  service: ServiceType | '';
  message: string;
}

export interface ContactFormState {
  data: ContactFormData;
  status: FormStatus;
  errors: Partial<ContactFormData>;
  touchedFields: Set<keyof ContactFormData>;
}

export interface FormFieldConfig {
  name: keyof ContactFormData;
  label: string;
  type: 'text' | 'email' | 'tel' | 'select' | 'textarea';
  required: boolean;
  placeholder?: string;
  options?: Array<{ value: string; label: string }>;
  validation?: {
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    custom?: (value: string) => string | undefined;
  };
}

export interface NewsletterFormData {
  email: string;
  name?: string;
}

export interface NewsletterFormState {
  data: NewsletterFormData;
  status: FormStatus;
  errors: Partial<NewsletterFormData>;
}