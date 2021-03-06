/* @flow */

import type { IntlShape, MessageDescriptor } from 'react-intl';

import React, { useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';

import { getMainClasses } from '~utils/css';

import styles from './Input.module.css';

type Appearance = {|
  display?: 'none',
  padding?: 'small' | 'large' | 'huge',
  size?: 'large' | 'stretch',
  theme?: 'minimal',
|};

type Props = {
  /** Appearance object */
  appearance?: Appearance,
  /** Setting this will add className styles to the `appearance` object */
  className?: string,
  /** Outline in red if error */
  error?: ?string | ?MessageDescriptor,
  /** Injected by `injectIntl` */
  intl: IntlShape,
  /** ID required to connect label and input */
  id: string,
  /** A string or a `messageDescriptor` that make up the input's label */
  label?: MessageDescriptor | string,
  /** Values for loading label (react-intl interpolation) */
  labelValues?: Object,
  /** A string or a `messageDescriptor` that make up the input's placeholder */
  placeholder?: MessageDescriptor | string,
  /** Values for loading placeholder (react-intl interpolation) */
  placeholderValues?: Object,
  /** Will display error text below the input (if it exists) */
  showErrorText?: boolean,
  /** Input html type attribute */
  type?: 'date' | 'email' | 'number' | 'range' | 'text',
  /** Max value - only used for `range` type */
  max?: number | string,
  /** Min value - only used for `range` type */
  min?: number | string,
  /** Value of the input */
  value: number | string,
};

const displayName = 'Input';

const Input = ({
  appearance,
  className,
  error,
  id,
  intl: { formatMessage },
  label,
  labelValues,
  max,
  min,
  placeholder,
  placeholderValues,
  showErrorText,
  type = 'text',
  value,
  ...rest
}: Props) => {
  const [styleProps, setStyleProps] = useState({});

  const baseClasses = getMainClasses(appearance, styles, {
    hasError: !!error,
  });

  const labelText =
    typeof label === 'string'
      ? label
      : label && formatMessage(label, labelValues);
  const placeholderText =
    typeof placeholder === 'string'
      ? placeholder
      : placeholder && formatMessage(placeholder, placeholderValues);
  const errorText =
    typeof error === 'string' ? error : error && formatMessage(error);

  const toNumber = (val: number | string): number => parseInt(val, 10);

  useEffect(() => {
    const newStyles = {};
    if (type === 'range' && min && max) {
      const percent = Math.ceil(
        ((toNumber(value) - toNumber(min)) / (toNumber(max) - toNumber(min))) *
          100,
      );
      newStyles.background = `-webkit-linear-gradient(left,
        ${styles.rangeFillColor} 0%,
        ${styles.rangeFillColor} ${percent}%,
        transparent ${percent}%)`;
    }
    setStyleProps(newStyles);
  }, [type, error, value, min, max]);
  return (
    <label htmlFor={id} className={styles.label}>
      {labelText && <span>{labelText}</span>}
      <input
        id={id}
        className={className ? `${baseClasses} ${className}` : baseClasses}
        max={max}
        min={min}
        placeholder={placeholderText}
        style={styleProps}
        type={type}
        value={value}
        {...rest}
      />
      {showErrorText && (
        // Always render this div so the UI doesn't shift once an error message exists
        <div className={styles.errorMessage}>
          {errorText && <small>{errorText}</small>}
        </div>
      )}
    </label>
  );
};

Input.displayName = displayName;

export default injectIntl(Input);
