/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="w-20 h-20 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-4xl font-bold">!</span>
        </div>
        <h1 className="text-3xl font-black text-slate-900 italic">Something went wrong</h1>
        <p className="text-slate-500 font-medium">
          We encountered an unexpected error. Please try refreshing the page or contact support if the problem persists.
        </p>
        <button 
          onClick={() => {
            resetErrorBoundary();
            if (typeof window !== 'undefined') {
              window.location.reload();
            }
          }}
          className="w-full bg-primary-600 text-white py-4 rounded-xl font-bold hover:bg-primary-700 transition-all shadow-lg"
        >
          Refresh Page
        </button>
        {process.env.NODE_ENV === 'development' && (
          <pre className="mt-8 p-4 bg-slate-100 rounded-lg text-left text-xs text-red-500 overflow-auto max-h-[200px]">
            {error?.toString()}
          </pre>
        )}
      </div>
    </div>
  );
}

export default function ErrorBoundary({ children }) {
  return (
    <ReactErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        // Reset the state of your app so the error doesn't happen again
      }}
    >
      {children}
    </ReactErrorBoundary>
  );
}
