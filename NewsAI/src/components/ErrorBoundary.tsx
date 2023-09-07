import React, {PropsWithChildren} from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<
  PropsWithChildren,
  ErrorBoundaryState
> {
  constructor(props: {}) {
    super(props);
    this.state = {hasError: false};
  }

  // Use this lifecycle method to catch the error and set the state
  static getDerivedStateFromError(_error: any) {
    return {hasError: true};
  }

  // Use this lifecycle method for logging errors
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Caught error: ', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Render fallback UI
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
