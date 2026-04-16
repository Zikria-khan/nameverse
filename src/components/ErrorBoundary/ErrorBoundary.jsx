/**
 * Error Boundary Component
 * Catches JavaScript errors anywhere in their child component tree,
 * logs those errors, and displays a fallback UI.
 */

"use client";

import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to an error reporting service
    console.error('Error caught by boundary:', error, errorInfo);
    
    // Update state with error details
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  render() {
    if (this.state.hasError) {
      // Render fallback UI
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
          <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 space-y-4">
            <div className="text-center">
              <h2 className="text-xl font-bold text-gray-900">Something went wrong</h2>
              <p className="mt-2 text-gray-600">
                We're sorry, but something went wrong. Please try refreshing the page.
              </p>
              
              {process.env.NODE_ENV === 'development' && (
                <details className="mt-4 text-left bg-gray-100 p-4 rounded">
                  <summary className="font-medium text-gray-800 cursor-pointer">
                    Error details
                  </summary>
                  <pre className="mt-2 text-sm text-red-600 overflow-auto">
                    {this.state.error && this.state.error.toString()}
                  </pre>
                </details>
              )}
              
              <div className="mt-6">
                <button
                  onClick={() => window.location.reload()}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Refresh Page
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Render children if no error
    return this.props.children;
  }
}