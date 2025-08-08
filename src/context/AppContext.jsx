import React, { createContext, useContext, useReducer } from 'react';

// Initial state for the application
const initialState = {
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
    touched: {}
  },
  isLoading: false,
  error: null,
  theme: 'light',
  language: 'fr'
};

// Reducer function to handle state updates
function appReducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
      
    case 'SET_ERROR':
      return { ...state, error: action.payload };
      
    case 'SET_COACH':
      return { ...state, coach: action.payload };
      
    case 'SET_SERVICES':
      return { ...state, services: action.payload };
      
    case 'UPDATE_CONTACT_FORM':
      return {
        ...state,
        contactForm: {
          ...state.contactForm,
          data: { ...state.contactForm.data, ...action.payload }
        }
      };
      
    case 'SET_CONTACT_FORM_STATUS':
      return {
        ...state,
        contactForm: { ...state.contactForm, status: action.payload }
      };
      
    case 'SET_CONTACT_FORM_ERRORS':
      return {
        ...state,
        contactForm: { ...state.contactForm, errors: action.payload }
      };
      
    case 'RESET_CONTACT_FORM':
      return {
        ...state,
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
          touched: {}
        }
      };
      
    case 'SET_THEME':
      return { ...state, theme: action.payload };
      
    case 'SET_LANGUAGE':
      return { ...state, language: action.payload };
      
    default:
      return state;
  }
}

// Create context
const AppContext = createContext();

// Provider component
export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const value = {
    state,
    dispatch
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

// Hook to use the context
export function useAppContext() {
  const context = useContext(AppContext);
  
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  
  return context;
}

// Specialized hooks for different parts of the state
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
    formData: state.contactForm.data,
    status: state.contactForm.status,
    errors: state.contactForm.errors,
    touched: state.contactForm.touched,
    
    updateForm: (data) => 
      dispatch({ type: 'UPDATE_CONTACT_FORM', payload: data }),
    
    setStatus: (status) => 
      dispatch({ type: 'SET_CONTACT_FORM_STATUS', payload: status }),
    
    setErrors: (errors) => 
      dispatch({ type: 'SET_CONTACT_FORM_ERRORS', payload: errors }),
    
    resetForm: () => 
      dispatch({ type: 'RESET_CONTACT_FORM' })
  };
}

export function useAppError() {
  const { state, dispatch } = useAppContext();
  
  return {
    error: state.error,
    setError: (error) => 
      dispatch({ type: 'SET_ERROR', payload: error }),
    clearError: () => 
      dispatch({ type: 'SET_ERROR', payload: null })
  };
}

export function useAppLoading() {
  const { state, dispatch } = useAppContext();
  
  return {
    isLoading: state.isLoading,
    setLoading: (loading) => 
      dispatch({ type: 'SET_LOADING', payload: loading })
  };
}