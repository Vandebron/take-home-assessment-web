import { useState, ComponentType } from 'react';
import { Electric, ElectricAndGas } from '../icons';
import styles from './ProductSelector.module.css';

interface ProductSelectorProps {
  readonly value?: string;
  readonly onChange?: (value: string) => void;
}

/**
 * Product type definition
 */
type Product = {
  id: string;
  label: string;
  icon: ComponentType;
};

/**
 * Available energy products
 * - electricity: Only electricity
 * - electricity-gas: Combined electricity and gas
 */
const products: Product[] = [
  { id: 'electricity', label: 'Stroom', icon: Electric },
  { id: 'electricity-gas', label: 'Stroom en Gas', icon: ElectricAndGas },
];

/**
 * ProductSelector Component
 *
 * Allows selection between electricity-only or combined electricity and gas products
 */
export default function ProductSelector({ value = 'electricity', onChange }: ProductSelectorProps) {
  const [selectedProduct, setSelectedProduct] = useState<string>(value);

  /**
   * Handles product selection change
   * Updates internal state and notifies parent via onChange callback
   */
  const handleProductChange = (productId: string): void => {
    setSelectedProduct(productId);
    onChange?.(productId);
  };

  return (
    <fieldset className={styles.container} aria-label="Product type selection">
      {products.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          type="button"
          onClick={() => handleProductChange(id)}
          className={`${styles.button} ${selectedProduct === id ? styles.selected : ''}`}
          aria-label={label}
          aria-pressed={selectedProduct === id}
        >
          <div className={styles.icon}>
            <Icon />
          </div>
          <span className={styles.label}>{label}</span>
        </button>
      ))}
    </fieldset>
  );
}
