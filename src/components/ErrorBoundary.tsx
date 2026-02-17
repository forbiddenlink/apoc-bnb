'use client';

import { Component, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
          <div className="text-center space-y-6 max-w-md">
            <div className="relative">
              <AlertTriangle className="h-24 w-24 text-accent mx-auto animate-pulse" />
              <div className="absolute inset-0 blur-xl bg-accent/20 animate-pulse" />
            </div>
            
            <div className="space-y-2">
              <h2 className="text-3xl font-black text-primary uppercase tracking-tight">
                CRITICAL SYSTEM FAILURE
              </h2>
              <p className="text-muted-foreground font-mono text-sm">
                [ERROR] Bunker systems have malfunctioned
              </p>
            </div>

            <div className="bg-card border border-accent/30 rounded-lg p-4">
              <p className="text-xs font-mono text-accent/80 break-all">
                {this.state.error?.message || 'Unknown error occurred'}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button 
                onClick={() => window.location.href = '/'}
                variant="default"
                size="lg"
                className="gap-2"
              >
                <AlertTriangle className="h-4 w-4" />
                EVACUATE TO HOME
              </Button>
              <Button 
                onClick={() => window.location.reload()}
                variant="outline"
                size="lg"
                className="gap-2"
              >
                <RefreshCw className="h-4 w-4" />
                REBOOT SYSTEM
              </Button>
            </div>

            <p className="text-xs text-muted-foreground/50">
              If the problem persists, the apocalypse may have gotten worse.
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
