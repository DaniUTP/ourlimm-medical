import { ProgressBar } from 'primereact/progressbar';
import * as React from 'react';

export interface MedicalProgressbarProps {
    value?: number;
    showValue?: boolean;
    mode?: 'determinate' | 'indeterminate';
    displayValueTemplate?: (value: number | string | null | undefined) => React.ReactNode;
    style?: React.CSSProperties;
    color?: string;
    unit?: string;
    className?: string;
    label?: string;
}

export const MedicalProgressbar: React.FC<MedicalProgressbarProps> = ({
    value = 0,
    showValue = false,
    mode = 'determinate',
    displayValueTemplate,
    style,
    color,
    unit = '%',
    className,
    label,
}) => {
    // Asegurar que value sea un número válido
    const safeValue = typeof value === 'number' && !isNaN(value) ? Math.min(Math.max(value, 0), 100) : 0;

    // Template por defecto para mostrar el valor correctamente
    const defaultTemplate = (val: number | string | null | undefined) => {
        const numVal = typeof val === 'number' ? val : Number(val) || 0;
        return `${numVal}${unit}`;
    };

    // Si showValue es true y no hay template personalizado, usar el default
    const finalTemplate = showValue
        ? (displayValueTemplate || defaultTemplate)
        : displayValueTemplate;

    // Para indeterminado, no pasamos value
    const progressValue = mode === 'indeterminate' ? undefined : safeValue;

    return (
        <div className={className}>
            {label && <div style={{ marginBottom: '8px' }}>{label}</div>}
            <ProgressBar
                value={progressValue}
                mode={mode}
                displayValueTemplate={finalTemplate}
                style={style}
                color={color}
                unit={unit}
            />
        </div>
    );
};

export default MedicalProgressbar;