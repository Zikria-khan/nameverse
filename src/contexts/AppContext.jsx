/**
 * App Context Provider
 * Provides global state management for the application
 */

"use client";

import React, { createContext, useContext, useReducer } from 'react';

// Initial state
const initialState = {
  // Add any global state properties here
};

// Create context
const AppContext = createContext();

// Reducer function
function appReducer(state, action) {
  switch (action.type) {
    // Add reducer cases here
    default:
      return state;
  }
}

// Provider component
export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Actions
  const value = {
    state,
    dispatch,
    // Add any actions or computed values here
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

// Custom hook for using the context
export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}

// Export the context for direct access if needed
export default AppContext;