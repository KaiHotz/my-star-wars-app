import { Component, type ErrorInfo, type PropsWithChildren, type ReactNode } from 'react';
import './ErrorBoundary.scss';

interface ErrorBoundaryProps {
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<PropsWithChildren<ErrorBoundaryProps>, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_error: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="errorboundary">
            <h1>Sorry.. there was an error</h1>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
