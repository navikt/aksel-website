import React from "react";
import { ErrorInfo } from "react";
/* import { isTest } from "../utils/environment"; */
/* import { loggError } from "../utils/logger"; */
import styled from "styled-components";

interface Props {
  boundaryName?: string;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

const Style = styled.div`
  padding: 2rem;
  text-align: center;
  background-color: var(--navds-global-color-blue-50);
  color: var(--navds-semantic-color-text-inverted); ;
`;

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    /* if (isTest()) {
      throw error;
    } */
    this.setState({ hasError: true, error, errorInfo });
    /* loggError(error); */
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      return <Style>Beklager, det skjedde en teknisk feil 🤷‍♀️</Style>;
    }
    return this.props.children;
  }
}

export function withErrorBoundary<Props>(
  Component: React.ComponentType<Props>,
  boundaryName: string
) {
  return (props: Props): any => {
    return (
      <ErrorBoundary boundaryName={boundaryName}>
        <Component {...props} />
      </ErrorBoundary>
    );
  };
}
