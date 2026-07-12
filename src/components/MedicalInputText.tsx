import React from 'react';
import { InputText as PrimeInputText} from 'primereact/inputtext';

export interface MedicalInputTextProps {
  // Props de PrimeReact InputText
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  invalid?: boolean;
  variant?: 'filled' | 'outlined';
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  name?: string;
  type?: string;
  maxLength?: number;
  minLength?: number;
  required?: boolean;
  autoFocus?: boolean;
  tabIndex?: number;
  keyfilter?: any; // Usar any para evitar problemas de tipado
  validateOnly?: boolean;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onInput?: (e: React.FormEvent<HTMLInputElement>) => void;
  onPaste?: (e: React.ClipboardEvent<HTMLInputElement>) => void;
  tooltip?: string;
  tooltipOptions?: any;
  inputRef?: React.Ref<HTMLInputElement>;
  children?: React.ReactNode;
  
  // Props personalizadas del wrapper
  size?: 'small' | 'normal' | 'large';
  testId?: string;
  label?: string;
  helper?: string;
  error?: boolean;
}

export const MedicalInputText: React.FC<MedicalInputTextProps> = ({
  // Props de PrimeReact
  value,
  defaultValue,
  placeholder,
  disabled = false,
  readOnly = false,
  invalid = false,
  variant,
  className,
  style,
  id,
  name,
  type = 'text',
  maxLength,
  minLength,
  required = false,
  autoFocus = false,
  tabIndex,
  keyfilter,
  validateOnly = false,
  onKeyDown,
  onKeyUp,
  onChange,
  onFocus,
  onBlur,
  onInput,
  onPaste,
  tooltip,
  tooltipOptions,
  inputRef,
  children,
  
  // Props personalizadas
  size = 'normal',
  testId,
  label,
  helper,
  error = false,
  ...props
}) => {
  // Determinar clases de tamaño
  const sizeClass = size === 'small' ? 'p-inputtext-sm' : size === 'large' ? 'p-inputtext-lg' : '';
  
  // Combinar clases
  const combinedClassName = [
    'medical-inputtext',
    sizeClass,
    error ? 'p-invalid' : '',
    className,
  ].filter(Boolean).join(' ');

  // Estilos adicionales para el wrapper
  const wrapperStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    width: '100%',
    ...style,
  };

  const labelStyle: React.CSSProperties = {
    fontSize: '14px',
    fontWeight: 500,
    color: '#333',
    display: 'block',
  };

  const helperStyle: React.CSSProperties = {
    fontSize: '12px',
    color: error ? '#f44336' : '#6b7280',
  };

  // Props para PrimeInputText
  const inputProps: any = {
    value,
    defaultValue,
    placeholder,
    disabled,
    readOnly,
    invalid: invalid || error,
    variant,
    className: combinedClassName,
    style,
    id,
    name,
    type,
    maxLength,
    minLength,
    required,
    autoFocus,
    tabIndex,
    keyfilter,
    validateOnly,
    onKeyDown,
    onKeyUp,
    onChange,
    onFocus,
    onBlur,
    onInput,
    onPaste,
    tooltip,
    tooltipOptions,
    ref: inputRef,
    ...props,
  };

  return (
    <div style={wrapperStyle} data-testid={testId}>
      {label && <label htmlFor={id} style={labelStyle}>{label}</label>}
      <PrimeInputText {...inputProps}>
        {children}
      </PrimeInputText>
      {helper && <small style={helperStyle}>{helper}</small>}
    </div>
  );
};

export default MedicalInputText;