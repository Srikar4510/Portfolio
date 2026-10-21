import { Component } from 'react';

// Keeps one broken widget from blanking the whole site.
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { failed: false };
  }

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidUpdate(prev) {
    // Navigating to another page clears the error.
    if (this.state.failed && prev.resetKey !== this.props.resetKey) this.setState({ failed: false });
  }

  componentDidCatch(error, info) {
    console.error(error, info.componentStack);
  }

  render() {
    if (!this.state.failed) return this.props.children;
    return (
      <main className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center px-4 text-center">
        <h1 className="text-3xl font-bold">Something went wrong</h1>
        <p className="mt-3 text-ink-muted">This page hit an error. Reloading usually fixes it.</p>
        <button type="button" onClick={() => window.location.reload()} className="btn-primary mt-8">
          Reload
        </button>
      </main>
    );
  }
}

export default ErrorBoundary;
