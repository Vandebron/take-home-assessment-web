import React from 'react';
import styles from './Loading.module.css';

interface LoadingProps {
  /**
   * Text to display below the spinner
   */
  text?: string;
  /**
   * Size of the spinner
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Whether to display as fullscreen overlay
   */
  fullscreen?: boolean;
}

/**
 * Loading Component
 *
 * Displays a loading spinner with optional text.
 * Can be used inline or as a fullscreen overlay.
 */
export default function Loading({
  text = 'Laden...',
  size = 'medium',
  fullscreen = false,
}: LoadingProps): JSX.Element {
  const containerClass = fullscreen ? `${styles.container} ${styles.fullscreen}` : styles.container;

  const spinnerClass = `${styles.spinner} ${styles[size]}`;

  return (
    <div className={containerClass} role="status" aria-live="polite">
      <div className={styles.content}>
        <div className={spinnerClass} aria-hidden="true">
          <div className={styles.spinnerRing}></div>
          <div className={styles.spinnerRing}></div>
          <div className={styles.spinnerRing}></div>
          <div className={styles.spinnerRing}></div>
        </div>
        {text && <p className={styles.text}>{text}</p>}
        <span className={styles.srOnly}>Pagina wordt geladen</span>
      </div>
    </div>
  );
}
