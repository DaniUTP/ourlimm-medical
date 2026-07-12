import React from 'react';
import { DataTable as PrimeDataTable } from 'primereact/datatable';
import { Column as PrimeColumn } from 'primereact/column';

export interface MedicalDataTableColumn<T = any> {
  field?: string;
  header?: React.ReactNode;
  align?: 'left' | 'center' | 'right';
  body?: (rowData: T, options?: any) => React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  sortable?: boolean;
  filter?: boolean;
  filterPlaceholder?: string;
  filterField?: string;
  filterMatchMode?: string;
  showFilterMenu?: boolean;
  filterMenuStyle?: React.CSSProperties;
  filterElement?: (options: any) => React.ReactNode;
  filterClear?: (options: any) => React.ReactNode;
  filterApply?: (options: any) => React.ReactNode;
  filterFooter?: () => React.ReactNode;
  dataType?: 'text' | 'numeric' | 'date' | 'boolean';
  selectionMode?: 'single' | 'multiple';
  expander?: boolean | ((rowData: T) => boolean);
  rowEditor?: boolean;
  bodyStyle?: React.CSSProperties;
  headerStyle?: React.CSSProperties;
  headerClassName?: string;
  bodyClassName?: string;
  frozen?: boolean;
  colSpan?: number;
  rowSpan?: number;
  columnKey?: string;
  editor?: (options: any) => React.ReactNode;
}

export interface MedicalDataTableProps<T = any> {
  value?: T[];
  columns?: MedicalDataTableColumn<T>[];
  emptyMessage?: string;
  testId?: string;
  className?: string;
  tableStyle?: React.CSSProperties;
  loading?: boolean;
  sortField?: string;
  sortOrder?: 1 | -1 | 0;
  sortMode?: 'single' | 'multiple';
  removableSort?: boolean;
  showGridlines?: boolean;
  stripedRows?: boolean;
  size?: 'small' | 'normal' | 'large';
  selectionMode?: 'single' | 'multiple' | 'radiobutton' | 'checkbox' | null;
  selection?: any;
  onSelectionChange?: (e: any) => void;
  dataKey?: string;
  filters?: any;
  filterDisplay?: 'row' | 'menu';
  globalFilterFields?: string[];
  globalFilter?: string;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  scrollable?: boolean;
  scrollHeight?: string;
  frozenValue?: T[];
  rowClassName?: (data: any) => string | object | undefined;
  isDataSelectable?: (event: any) => boolean;
  rowExpansionTemplate?: (rowData: T) => React.ReactNode;
  expandedRows?: any;
  onRowToggle?: (e: any) => void;
  onRowExpand?: (e: any) => void;
  onRowCollapse?: (e: any) => void;
  onRowSelect?: (e: any) => void;
  onRowUnselect?: (e: any) => void;
  editMode?: 'row' | 'cell';
  onRowEditComplete?: (e: any) => void;
  rowHover?: boolean;
  headerColumnGroup?: React.ReactNode;
  footerColumnGroup?: React.ReactNode;
  onSort?: (e: any) => void;
  dragSelection?: boolean;
  metaKeySelection?: boolean;
}

export function MedicalDataTable<T = any>({
  value = [],
  columns = [],
  emptyMessage = 'No hay datos disponibles',
  testId = 'medical-data-table',
  className,
  tableStyle,
  loading = false,
  sortField,
  sortOrder,
  sortMode = 'single',
  removableSort = false,
  showGridlines = false,
  stripedRows = false,
  size,
  selectionMode,
  selection,
  onSelectionChange,
  dataKey = 'id',
  filters,
  filterDisplay,
  globalFilterFields,
  globalFilter,
  header,
  footer,
  scrollable = false,
  scrollHeight,
  frozenValue,
  rowClassName,
  isDataSelectable,
  rowExpansionTemplate,
  expandedRows,
  onRowToggle,
  onRowExpand,
  onRowCollapse,
  onRowSelect,
  onRowUnselect,
  editMode,
  onRowEditComplete,
  rowHover = true,
  headerColumnGroup,
  footerColumnGroup,
  onSort,
  dragSelection = false,
  metaKeySelection = true,
  ...rest
}: MedicalDataTableProps<T>) {
  // Container styles
  const containerStyle: React.CSSProperties = {
    width: '100%',
    overflow: 'hidden',
    borderRadius: 12,
    border: '1px solid #E5E7EB',
    background: '#FFFFFF',
    boxShadow: '0 2px 8px rgba(0,0,0,.06)',
  };

  // Asegurar que value sea un array
  const safeValue = Array.isArray(value) ? value : [];

  // Si no hay columnas, mostrar mensaje
  if (!columns || columns.length === 0) {
    return (
      <div data-testid={testId} style={containerStyle}>
        <p style={{ padding: '20px', textAlign: 'center' }}>No hay columnas definidas</p>
      </div>
    );
  }

  // Props para DataTable
  const dataTableProps: any = {
    value: safeValue,
    loading,
    sortField,
    sortOrder,
    sortMode,
    removableSort,
    showGridlines,
    stripedRows,
    size,
    selectionMode,
    selection,
    onSelectionChange,
    dataKey,
    filters,
    filterDisplay,
    globalFilterFields,
    globalFilter,
    header,
    footer,
    scrollable,
    scrollHeight,
    frozenValue,
    rowClassName,
    isDataSelectable,
    rowExpansionTemplate,
    expandedRows,
    onRowToggle,
    onRowExpand,
    onRowCollapse,
    onRowSelect,
    onRowUnselect,
    editMode,
    onRowEditComplete,
    rowHover,
    emptyMessage,
    headerColumnGroup,
    footerColumnGroup,
    onSort,
    dragSelection,
    metaKeySelection,
    className: ['medical-data-table', className].filter(Boolean).join(' '),
    style: { ...containerStyle, ...tableStyle },
    ...rest,
  };

  return (
    <div data-testid={testId} style={{ width: '100%' }}>
      <PrimeDataTable {...dataTableProps}>
        {columns.map((col, index) => {
          const columnKey = col.field || `col-${index}`;
          
          return (
            <PrimeColumn
              key={columnKey}
              field={col.field}
              header={col.header}
              align={col.align}
              body={col.body}
              style={{ textAlign: col.align || 'left', ...col.style }}
              className={col.className}
              sortable={col.sortable}
              filter={col.filter}
              filterPlaceholder={col.filterPlaceholder}
              filterField={col.filterField}
              filterMatchMode={col.filterMatchMode}
              showFilterMenu={col.showFilterMenu}
              filterMenuStyle={col.filterMenuStyle}
              filterElement={col.filterElement}
              filterClear={col.filterClear}
              filterApply={col.filterApply}
              filterFooter={col.filterFooter}
              dataType={col.dataType}
              selectionMode={col.selectionMode}
              expander={col.expander}
              rowEditor={col.rowEditor}
              bodyStyle={col.bodyStyle}
              headerStyle={col.headerStyle}
              headerClassName={col.headerClassName}
              bodyClassName={col.bodyClassName}
              frozen={col.frozen}
              colSpan={col.colSpan}
              rowSpan={col.rowSpan}
              columnKey={col.columnKey}
              editor={col.editor}
            />
          );
        })}
      </PrimeDataTable>
    </div>
  );
}

export default MedicalDataTable;