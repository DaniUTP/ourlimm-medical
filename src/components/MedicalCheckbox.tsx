import React, { useState, useEffect, useRef } from 'react';
import { Checkbox as PrimeCheckbox, CheckboxChangeEvent } from 'primereact/checkbox';

export interface MedicalCheckboxProps {
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  inputId?: string;
  name?: string;
  value?: string | number | null | undefined;
  tooltip?: string;
  tooltipOptions?: any;
  invalid?: boolean;
  variant?: 'filled' | 'outlined';
  tabIndex?: number;
  onChange?: (e: CheckboxChangeEvent) => void;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  required?: boolean;
  readOnly?: boolean;
  indeterminate?: boolean;
  id?: string;
  label?: string;
  error?: boolean;
  testId?: string;
}

export const MedicalCheckbox: React.FC<MedicalCheckboxProps> = ({
  checked,
  defaultChecked,
  disabled = false,
  className,
  style,
  inputId,
  name,
  value,
  tooltip,
  tooltipOptions,
  invalid = false,
  variant,
  tabIndex,
  onChange,
  onFocus,
  onBlur,
  required = false,
  readOnly = false,
  indeterminate = false,
  id,
  label,
  error = false,
  testId = 'medical-checkbox',
}) => {
  const [internalChecked, setInternalChecked] = useState<boolean>(!!defaultChecked);
  const isControlled = typeof checked === 'boolean';
  const currentChecked = isControlled ? !!checked : internalChecked;

  const inputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  const handleChange = (e: CheckboxChangeEvent) => {
    const nextChecked = e.checked ?? false;
    
    if (!isControlled) {
      setInternalChecked(nextChecked);
    }
    
    if (onChange) {
      onChange(e);
    }
  };

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.6 : 1,
    ...style
  };

  const labelStyle: React.CSSProperties = {
    color: '#1a1a1a',
    fontSize: 14,
    lineHeight: '20px',
    marginLeft: 4
  };

  const checkboxClassName = [
    className,
    error ? 'p-invalid' : '',
    invalid ? 'p-invalid' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div 
      data-testid={testId} 
      style={containerStyle}
    >
      <PrimeCheckbox
        checked={currentChecked}
        defaultChecked={defaultChecked}
        disabled={disabled}
        className={checkboxClassName}
        style={style}
        inputId={inputId || id}
        name={name}
        value={value}
        tooltip={tooltip}
        tooltipOptions={tooltipOptions}
        invalid={invalid || error}
        variant={variant}
        tabIndex={tabIndex}
        inputRef={inputRef}
        onChange={handleChange}
        onFocus={onFocus}
        onBlur={onBlur}
        required={required}
        readOnly={readOnly}
      />
      
      {label && (
        <label 
          htmlFor={inputId || id} 
          style={labelStyle}
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default MedicalCheckbox;