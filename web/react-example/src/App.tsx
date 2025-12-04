import React from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import ConsumptionCalculator from './components/ConsumptionCalculator';
import styles from './App.module.css';

/**
 * App Component
 *
 * Root application component that renders the consumption calculator
 * within a centered container layout, wrapped in an error boundary.
 */
export default function App(): JSX.Element {
  return (
    <ErrorBoundary>
      <div className={styles.container}>
        <ConsumptionCalculator />
      </div>
    </ErrorBoundary>
  );
}
