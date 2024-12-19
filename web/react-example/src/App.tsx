import React from 'react';
import ConsumptionCalculator from './components/ConsumptionCalculator';
import styles from './App.module.css';

export default function App() {
  return (
    <div className={styles.container}>
      <ConsumptionCalculator />
    </div>
  );
}