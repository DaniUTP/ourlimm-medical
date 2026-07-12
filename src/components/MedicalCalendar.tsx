import React, { useState } from 'react';
import { Calendar as PrimeCalendar, CalendarSelectionMode } from 'primereact/calendar';
import { addLocale } from 'primereact/api';

// Configurar locale en español
addLocale('es', {
  firstDayOfWeek: 1,
  dayNames: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
  dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
  dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
  monthNames: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
  monthNamesShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
  today: 'Hoy',
  clear: 'Limpiar',
  chooseDate: 'Seleccionar fecha',
  chooseMonth: 'Seleccionar mes',
  chooseYear: 'Seleccionar año',
  prevMonth: 'Mes anterior',
  nextMonth: 'Mes siguiente',
  prevYear: 'Año anterior',
  nextYear: 'Año siguiente',
});

export interface MedicalCalendarProps {
  // Props de PrimeReact Calendar (todas las que soporta)
  value?: Date | Date[] | null;
  defaultValue?: Date | Date[] | null;
  onChange?: (e: { value: Date | Date[] | null; target?: any }) => void;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onSelect?: (e: { originalEvent: React.SyntheticEvent; value: Date | Date[] | null }) => void;
  onClear?: (e: React.SyntheticEvent) => void;
  onShow?: () => void;
  onHide?: () => void;
  onTodayClick?: (e: React.SyntheticEvent) => void;
  onMonthChange?: (e: { month: number; year: number }) => void;
  
  // Props de configuración
  id?: string;
  name?: string;
  placeholder?: string;
  disabled?: boolean;
  readOnlyInput?: boolean;
  showIcon?: boolean;
  showButtonBar?: boolean;
  showTime?: boolean;
  timeOnly?: boolean;
  hourFormat?: '12' | '24';
  showSeconds?: boolean;
  stepHour?: number;
  stepMinute?: number;
  stepSecond?: number;
  dateFormat?: string;
  locale?: string;
  selectionMode?: 'single' | 'multiple' | 'range';
  minDate?: Date;
  maxDate?: Date;
  numberOfMonths?: number;
  view?: 'date' | 'month' | 'year';
  inline?: boolean;
  showWeek?: boolean;
  touchUI?: boolean;
  className?: string;
  style?: React.CSSProperties;
  inputClassName?: string;
  panelClassName?: string;
  panelStyle?: React.CSSProperties;
  appendTo?: 'self' | HTMLElement | null | undefined;
  dateTemplate?: (date: any) => React.ReactNode;
  headerTemplate?: () => React.ReactNode;
  footerTemplate?: () => React.ReactNode;
  disabledDates?: Date[];
  disabledDays?: number[];
  hideOnDateTimeSelect?: boolean;
  keepInvalid?: boolean;
  maxDateCount?: number;
  selectOtherMonths?: boolean;
  showOnFocus?: boolean;
  transitionOptions?: any;
  required?: boolean;
  inputId?: string;
  inputRef?: React.RefObject<HTMLInputElement>;
  invalid?: boolean;
  variant?: 'filled' | 'outlined';
  
  // Props personalizadas del wrapper
  label?: string;
  helper?: string;
  testId?: string;
}

export const MedicalCalendar: React.FC<MedicalCalendarProps> = ({
  // Props de PrimeReact
  value,
  defaultValue,
  onChange,
  onFocus,
  onBlur,
  onSelect,
  onClear,
  onShow,
  onHide,
  onTodayClick,
  onMonthChange,
  id,
  name,
  placeholder = 'Selecciona una fecha',
  disabled = false,
  readOnlyInput = false,
  showIcon = true,
  showButtonBar = false,
  showTime = false,
  timeOnly = false,
  hourFormat = '24',
  showSeconds = false,
  stepHour = 1,
  stepMinute = 1,
  stepSecond = 1,
  dateFormat = 'yy-mm-dd',
  locale = 'es',
  selectionMode = 'single',
  minDate,
  maxDate,
  numberOfMonths = 1,
  view = 'date',
  inline = false,
  showWeek = false,
  touchUI = false,
  className,
  style,
  inputClassName,
  panelClassName,
  panelStyle,
  appendTo = 'self',
  dateTemplate,
  headerTemplate,
  footerTemplate,
  disabledDates,
  disabledDays,
  hideOnDateTimeSelect = false,
  keepInvalid = false,
  maxDateCount,
  selectOtherMonths = false,
  showOnFocus = true,
  transitionOptions,
  required = false,
  inputId,
  inputRef,
  invalid = false,
  variant,
  
  // Props personalizadas
  label,
  helper,
  testId,
}) => {
  const [internalValue, setInternalValue] = useState<Date | Date[] | null>(defaultValue || null);

  const handleChange = (e: any) => {
    const newValue = e.value;
    setInternalValue(newValue);
    if (onChange) {
      onChange(e);
    }
  };

  // Determinar el valor a usar
  const currentValue = value !== undefined ? value : internalValue;

  // Construir props para PrimeCalendar usando type assertion
  const calendarProps: any = {
    id,
    name,
    placeholder,
    disabled,
    readOnlyInput,
    showIcon,
    showButtonBar,
    showTime,
    timeOnly,
    hourFormat,
    showSeconds,
    stepHour,
    stepMinute,
    stepSecond,
    dateFormat,
    locale,
    selectionMode: selectionMode as CalendarSelectionMode,
    minDate,
    maxDate,
    numberOfMonths,
    view,
    inline,
    showWeek,
    touchUI,
    className,
    style,
    inputClassName,
    panelClassName,
    panelStyle,
    appendTo,
    dateTemplate,
    headerTemplate,
    footerTemplate,
    disabledDates,
    disabledDays,
    hideOnDateTimeSelect,
    keepInvalid,
    maxDateCount,
    selectOtherMonths,
    showOnFocus,
    transitionOptions,
    required,
    inputId: inputId || id,
    inputRef,
    invalid,
    variant,
    value: currentValue,
    onChange: handleChange,
    onFocus,
    onBlur,
    onSelect,
    onClear,
    onShow,
    onHide,
    onTodayClick,
    onMonthChange,
  };

  return (
    <div data-testid={testId} style={{ display: 'flex', flexDirection: 'column', gap: '4px', width: '100%' }}>
      {label && (
        <label 
          htmlFor={id} 
          style={{ 
            display: 'block', 
            marginBottom: 6, 
            fontSize: 14, 
            fontWeight: 500, 
            color: '#1a1a1a' 
          }}
        >
          {label}
        </label>
      )}
      
      <PrimeCalendar {...calendarProps} />
      
      {helper && (
        <div style={{ marginTop: 6, fontSize: 13, color: '#6b7280' }}>
          {helper}
        </div>
      )}
    </div>
  );
};

export default MedicalCalendar;