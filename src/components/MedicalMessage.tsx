import React from 'react';
import { Message as PrimeMessage, MessageProps as PrimeMessageProps } from 'primereact/message';

export type MedicalMessageSeverity = 'info' | 'success' | 'warn' | 'error' | 'contrast';

export interface MedicalMessageProps extends Omit<PrimeMessageProps, 'severity' | 'text'> {
  // Props de PrimeReact Message
  severity?: MedicalMessageSeverity;
  text?: React.ReactNode;
  content?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  icon?: string;
  children?: React.ReactNode;
  
  // Props personalizadas del wrapper
  testId?: string;
  iconNode?: React.ReactNode; // Para iconos personalizados (ReactNode)
}

export const MedicalMessage: React.FC<MedicalMessageProps> = ({
  // Props de PrimeReact
  severity = 'contrast',
  text,
  content,
  className,
  style,
  icon,
  children,
  
  // Props personalizadas
  testId,
  iconNode,
  ...props
}) => {
  // Si hay iconNode, no usamos icon (string) de PrimeReact
  const finalIcon = iconNode ? undefined : icon;

  // Props para PrimeMessage
  const messageProps: PrimeMessageProps = {
    severity: severity as any,
    text,
    content,
    className,
    style,
    icon: finalIcon,
    ...props,
  };

  return (
    <div data-testid={testId}>
      <PrimeMessage {...messageProps}>
        {iconNode && (
          <span className="medical-message-icon" style={{ marginRight: '8px' }}>
            {iconNode}
          </span>
        )}
        {children}
      </PrimeMessage>
    </div>
  );
};

export default MedicalMessage;