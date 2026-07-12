import React from 'react';
import { Dialog as PrimeDialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

export type MedicalDialogPosition = 'center' | 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
export type MedicalDialogSize = 'sm' | 'md' | 'lg' | 'xl';

export interface MedicalDialogProps {
  // Props de PrimeReact Dialog
  visible?: boolean;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  position?: MedicalDialogPosition;
  modal?: boolean;
  resizable?: boolean;
  draggable?: boolean;
  closable?: boolean;
  closeOnEscape?: boolean;
  dismissableMask?: boolean;
  rtl?: boolean;
  maximizable?: boolean;
  maximized?: boolean;
  blockScroll?: boolean;
  baseZIndex?: number;
  appendTo?: 'self' | HTMLElement | null | undefined;
  breakpoints?: { [key: string]: string };
  transitionOptions?: any;
  onHide: () => void;
  onShow?: () => void;
  onMaximize?: (e: any) => void;
  children?: React.ReactNode;
  
  // Props personalizadas del wrapper para compatibilidad
  open?: boolean;
  title?: React.ReactNode;
  onClose?: () => void;
  type?: 'standard' | 'list' | 'custom';
  paragraph?: React.ReactNode;
  alignLeft?: boolean;
  closeButton?: boolean;
  closeOnClickOutside?: boolean;
  illustration?: React.ReactNode;
  showIllustration?: boolean;
  showButtons?: boolean;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  primaryButtonDisabled?: boolean;
  primaryButtonFunction?: () => void;
  secondaryButtonFunction?: () => void;
  primaryButtonId?: string;
  secondaryButtonId?: string;
  items?: React.ReactNode[];
  list?: React.ReactNode[];
  fullContent?: boolean;
  scroll?: boolean;
  size?: MedicalDialogSize | { width: string; height?: string };
  testId?: string;
}

const sizeMap: Record<MedicalDialogSize, string> = {
  sm: '24rem',
  md: '28rem',
  lg: '36rem',
  xl: '42rem',
};

export const MedicalDialog: React.FC<MedicalDialogProps> = ({
  // Props de PrimeReact
  visible,
  header,
  footer,
  style,
  className,
  position = 'center',
  modal = true,
  resizable = true,
  draggable = true,
  closable = true,
  closeOnEscape = true,
  dismissableMask = false,
  rtl = false,
  maximizable = false,
  maximized = false,
  blockScroll = true,
  baseZIndex = 1000,
  appendTo = 'self',
  breakpoints,
  transitionOptions,
  onHide,
  onShow,
  onMaximize,
  children,
  
  // Props personalizadas
  open,
  title,
  onClose,
  type = 'standard',
  paragraph,
  alignLeft = false,
  closeButton = true,
  closeOnClickOutside = true,
  illustration,
  showIllustration = false,
  showButtons = false,
  primaryButtonText,
  secondaryButtonText,
  primaryButtonDisabled = false,
  primaryButtonFunction,
  secondaryButtonFunction,
  primaryButtonId,
  secondaryButtonId,
  items,
  list,
  scroll = false,
  size = 'md',
  testId,
}) => {
  const isVisible = visible ?? open ?? false;
  const resolvedItems = items ?? list ?? [];
  
  const resolvedWidth = typeof size === 'string' ? sizeMap[size] : size.width;
  const resolvedHeight = typeof size === 'string' ? undefined : size.height;

  // Manejador de cierre - combina onHide y onClose
  const handleHide = () => {
    if (onHide) {
      onHide();
    }
    if (onClose) {
      onClose();
    }
  };

  // Construir footer con botones si showButtons es true
  const buildFooter = () => {
    if (footer) return footer;
    
    if (!showButtons) return undefined;
    
    return (
      <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
        {secondaryButtonText && (
          <Button
            id={secondaryButtonId}
            label={secondaryButtonText}
            icon="pi pi-times"
            onClick={secondaryButtonFunction ?? handleHide}
            className="p-button-text"
            type="button"
          />
        )}
        {primaryButtonText && (
          <Button
            id={primaryButtonId}
            label={primaryButtonText}
            icon="pi pi-check"
            onClick={primaryButtonFunction ?? handleHide}
            disabled={primaryButtonDisabled}
            autoFocus
            type="button"
          />
        )}
      </div>
    );
  };

  // Construir contenido
  const renderContent = () => {
    if (type === 'list' && resolvedItems.length > 0) {
      return (
        <div>
          {paragraph && (
            <p style={{ marginBottom: '1rem', fontSize: '0.95rem', color: '#374151', lineHeight: '1.5' }}>
              {paragraph}
            </p>
          )}
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, textAlign: alignLeft ? 'left' : 'center' }}>
            {resolvedItems.map((item, index) => (
              <li
                key={`medical-dialog-item-${index}`}
                style={{ marginBottom: '0.75rem', fontSize: '0.95rem', color: '#374151' }}
              >
                • {item}
              </li>
            ))}
          </ul>
        </div>
      );
    }

    if (type === 'custom' || type === 'standard') {
      return (
        <div>
          {showIllustration && illustration && (
            <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>
              {illustration}
            </div>
          )}
          {paragraph && (
            <p style={{ margin: '0 0 1rem 0', fontSize: '0.95rem', color: '#374151', lineHeight: '1.5' }}>
              {paragraph}
            </p>
          )}
          {children}
        </div>
      );
    }

    return children;
  };

  // Estilos del diálogo
  const dialogStyle: React.CSSProperties = {
    width: resolvedWidth,
    maxWidth: '90vw',
    ...(resolvedHeight && { height: resolvedHeight }),
    ...style,
  };

  // Clases personalizadas
  const dialogClassName = [
    className,
    alignLeft ? 'p-dialog-align-left' : '',
    scroll ? 'p-dialog-scrollable' : '',
  ].filter(Boolean).join(' ');

  const finalHeader = title || header;

  return (
    <PrimeDialog
      visible={isVisible}
      header={finalHeader}
      footer={buildFooter()}
      style={dialogStyle}
      className={dialogClassName}
      position={position}
      modal={modal}
      resizable={resizable}
      draggable={draggable}
      closable={closable && closeButton}
      closeOnEscape={closeOnEscape}
      dismissableMask={dismissableMask || closeOnClickOutside}
      rtl={rtl}
      maximizable={maximizable}
      maximized={maximized}
      blockScroll={blockScroll}
      baseZIndex={baseZIndex}
      appendTo={appendTo}
      breakpoints={breakpoints}
      transitionOptions={transitionOptions}
      onHide={handleHide}
      onShow={onShow}
      onMaximize={onMaximize}
      data-testid={testId}
    >
      {renderContent()}
    </PrimeDialog>
  );
};

export default MedicalDialog;