import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { ContactFormData, ContactFormState, FormStatus } from '@/types/forms';
import { Coach } from '@/types/coach';
import { Service } from '@/types/services';

// État global de l'application
export interface AppState {
  coach: Coach | null;
  services: Service[];
  contactForm: ContactFormState;
  isLoading: boolean;
  error: string | null;
  theme: 'light' | 'dark';
  language: 'fr' | 'en';
}

// Actions disponibles
export type AppAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_COACH'; payload: Coach }
  | { type: 'SET_SERVICES'; payload: Service[] }
  | { type: 'UPDATE_CONTACT_FORM'; payload: Partial<ContactFormData> }
  | { type: 'SET_CONTACT_FORM_STATUS'; payload: FormStatus }
  | { type: 'SET_CONTACT_FORM_ERRORS'; payload: Partial<ContactFormData> }
  | { type: 'TOUCH_CONTACT_FORM_FIELD'; payload: keyof ContactFormData }
  | { type: 'RESET_CONTACT_FORM' }
  | { type: 'SET_THEME'; payload: 'light' | 'dark' }
  | { type: 'SET_LANGUAGE'; payload: 'fr' | 'en' };

// État initial
const initialState: AppState = {
  coach: null,
  services: [],
  contactForm: {
    data: {
      name: '',
      email: '',
      phone: '',
      service: '',
      message: ''
    },
    status: 'idle',
    errors: {},
    touchedFields: new Set()
  },
  isLoading: false,
  error: null,
  theme: 'light',
  language: 'fr'
};

// Reducer utilisant le pattern State Machine
function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
        error: action.payload ? null : state.error // Clear error when loading starts
      };

    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };

    case 'SET_COACH':
      return {
        ...state,
        coach: action.payload,
        error: null
      };

    case 'SET_SERVICES':
      return {
        ...state,
        services: action.payload,
        error: null
      };

    case 'UPDATE_CONTACT_FORM':
      return {
        ...state,
        contactForm: {
          ...state.contactForm,
          data: {
            ...state.contactForm.data,
            ...action.payload
          }
        }
      };

    case 'SET_CONTACT_FORM_STATUS':
      return {
        ...state,
        contactForm: {
          ...state.contactForm,
          status: action.payload
        }
      };

    case 'SET_CONTACT_FORM_ERRORS':
      return {
        ...state,
        contactForm: {
          ...state.contactForm,
          errors: action.payload
        }
      };

    case 'TOUCH_CONTACT_FORM_FIELD':
      return {
        ...state,
        contactForm: {
          ...state.contactForm,
          touchedFields: new Set(state.contactForm.touchedFields).add(action.payload)
        }
      };

    case 'RESET_CONTACT_FORM':
      return {
        ...state,
        contactForm: initialState.contactForm
      };

    case 'SET_THEME':
      return {
        ...state,
        theme: action.payload
      };

    case 'SET_LANGUAGE':
      return {
        ...state,
        language: action.payload
      };

    default:
      return state;
  }
}

// Context
const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

// Provider component
interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

// Hook pour utiliser le context avec vérification de sécurité
export function useAppContext() {
  const context = useContext(AppContext);
  
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  
  return context;
}

// Hooks spécialisés pour différentes parties de l'état
export function useCoach() {
  const { state } = useAppContext();
  return state.coach;
}

export function useServices() {
  const { state } = useAppContext();
  return state.services;
}

export function useContactForm() {
  const { state, dispatch } = useAppContext();
  
  return {
    formState: state.contactForm,
    updateForm: (data: Partial<ContactFormData>) => 
      dispatch({ type: 'UPDATE_CONTACT_FORM', payload: data }),
    setStatus: (status: FormStatus) => 
      dispatch({ type: 'SET_CONTACT_FORM_STATUS', payload: status }),
    setErrors: (errors: Partial<ContactFormData>) => 
      dispatch({ type: 'SET_CONTACT_FORM_ERRORS', payload: errors }),
    touchField: (field: keyof ContactFormData) => 
      dispatch({ type: 'TOUCH_CONTACT_FORM_FIELD', payload: field }),
    resetForm: () => 
      dispatch({ type: 'RESET_CONTACT_FORM' })
  };
}

export function useAppError() {
  const { state, dispatch } = useAppContext();
  
  return {
    error: state.error,
    setError: (error: string | null) => 
      dispatch({ type: 'SET_ERROR', payload: error }),
    clearError: () => 
      dispatch({ type: 'SET_ERROR', payload: null })
  };
}

export function useAppLoading() {
  const { state, dispatch } = useAppContext();
  
  return {
    isLoading: state.isLoading,
    setLoading: (loading: boolean) => 
      dispatch({ type: 'SET_LOADING', payload: loading })
  };
}