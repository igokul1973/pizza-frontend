import React, { Component } from 'react';

class ErrorBoundary extends Component<{}, {hasError: boolean}> {
    constructor(props: any) {
        super(props);
        this.state = {hasError: false};
    }

    static getDerivedStateFromError() {
        // Update state so the next render shows the fallback UI
        return {hasError: true};
    }

    componentDidCatch(error: Error) {
        console.error(error);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div>The error has occurred!</div>
            )
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
