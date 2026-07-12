import React from 'react';
import { Button as PrimeButton, ButtonProps as PrimeButtonProps } from 'primereact/button';
import {
  MEDICAL_ICONS,
  type MedicalIconName
} from '../constants/icons';

type MedicalButtonSeverity = 'secondary' | 'success' | 'info' | 'warning' | 'help' | 'danger' | 'contrast';

export interface MedicalButtonProps {
  label?: string;
  icon?: MedicalIconName | React.ReactElement | string;
  iconPos?: 'left' | 'right' | 'top' | 'bottom';
  severity?: MedicalButtonSeverity;
  outlined?: boolean;
  text?: boolean;
  raised?: boolean;
  rounded?: boolean;
  link?: boolean;
  loading?: boolean;
  loadingIcon?: string;
  disabled?: boolean;
  badge?: string;
  badgeClassName?: string;
  tooltip?: string;
  tooltipOptions?: any;
  size?: 'small' | 'normal' | 'large';
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  onFocus?: React.FocusEventHandler<HTMLButtonElement>;
  onBlur?: React.FocusEventHandler<HTMLButtonElement>;
  children?: React.ReactNode;
  ariaLabel?: string;
  
  variant?: 'primary' | 'secondary' | 'tertiary';
  iconAlign?: 'left' | 'right';
  testId?: string;
}

export const MedicalButton: React.FC<MedicalButtonProps> = ({
  label,
  icon,
  iconPos,
  severity,
  outlined = false,
  text = false,
  raised = false,
  rounded = false,
  link = false,
  loading = false,
  loadingIcon,
  disabled = false,
  badge,
  badgeClassName,
  tooltip,
  tooltipOptions,
  size = 'normal',
  type = 'button',
  className,
  style,
  id,
  onClick,
  onFocus,
  onBlur,
  children,
  ariaLabel,
  variant,
  iconAlign = 'left',
  testId,
  ...props
}) => {
  const variantToSeverity: Record<string, MedicalButtonSeverity | undefined> = {
    primary: undefined,
    secondary: 'secondary',
    tertiary: 'help',
  };

  const finalSeverity = severity || (variant ? variantToSeverity[variant] : undefined);

  // Obtener el icono como string para PrimeReact
  const getIconString = (iconProp: MedicalButtonProps['icon']): string | undefined => {
    if (!iconProp) return undefined;
    if (React.isValidElement(iconProp)) return undefined;
    if (typeof iconProp === 'string') {
      // Si es un MedicalIconName, obtener el icono de la librería
      if (iconProp in MEDICAL_ICONS) {
        return `pi pi-${iconProp}`;
      }
      // Si ya viene con 'pi pi-', usarlo directamente
      if (iconProp.startsWith('pi ')) {
        return iconProp;
      }
      return `pi pi-${iconProp}`;
    }
    return undefined;
  };

  const iconString = getIconString(icon);

  // Clases CSS personalizadas
  const rootClassName = [
    'medical-button',
    variant ? `medical-button--variant-${variant}` : undefined,
    size !== 'normal' ? `medical-button--${size}` : undefined,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  // Construir props para PrimeButton (solo props válidas)
  const primeButtonProps: PrimeButtonProps = {
    label,
    icon: iconString,
    iconPos: iconPos || (iconAlign === 'right' ? 'right' : 'left'),
    severity: finalSeverity,
    outlined,
    text,
    raised,
    rounded,
    link,
    loading,
    loadingIcon,
    disabled,
    badge,
    badgeClassName,
    tooltip,
    tooltipOptions,
    size: size === 'normal' ? undefined : size,
    type,
    className: rootClassName,
    style,
    id,
    onClick,
    onFocus,
    onBlur,
    'aria-label': ariaLabel || (label ? undefined : 'Button'),
    ...props,
  };

  // Si hay children o icon como elemento React, usarlos
  if (children || React.isValidElement(icon)) {
    return (
      <PrimeButton {...primeButtonProps} data-testid={testId}>
        {iconAlign === 'left' && React.isValidElement(icon) && icon}
        {children}
        {iconAlign === 'right' && React.isValidElement(icon) && icon}
      </PrimeButton>
    );
  }

  return <PrimeButton {...primeButtonProps} data-testid={testId} />;
};

export default MedicalButton;