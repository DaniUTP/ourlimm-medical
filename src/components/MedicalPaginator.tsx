import React from 'react';
import { Paginator as PrimePaginator, PaginatorProps as PrimePaginatorProps } from 'primereact/paginator';

export interface MedicalPaginatorProps {
  // Props de PrimeReact Paginator
  totalRecords?: number;
  rows?: number;
  first?: number;
  pageLinkSize?: number;
  rowsPerPageOptions?: number[];
  template?: any;
  leftContent?: React.ReactNode;
  rightContent?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onPageChange?: (event: any) => void;
  currentPageReportTemplate?: string;
  alwaysShow?: boolean;
  
  // Props personalizadas del wrapper
  testId?: string;
  pageCount?: number;
  itemsPerPage?: number;
  initialPage?: number;
}

export const MedicalPaginator: React.FC<MedicalPaginatorProps> = ({
  // Props de PrimeReact
  totalRecords,
  rows = 10,
  first = 0,
  pageLinkSize = 5,
  rowsPerPageOptions = [5, 10, 25, 50],
  template,
  leftContent,
  rightContent,
  className,
  style,
  onPageChange,
  currentPageReportTemplate = '{first} - {last} de {totalRecords}',
  alwaysShow = true,
  
  // Props personalizadas
  testId,
  pageCount,
  itemsPerPage = 1,
  initialPage = 1,
}) => {
  // Calcular totalRecords si se proporciona pageCount
  const finalTotalRecords = totalRecords ?? (pageCount ? pageCount * itemsPerPage : 0);
  
  // Calcular first basado en initialPage
  const finalFirst = initialPage > 1 ? (initialPage - 1) * rows : first;

  // Props para PrimePaginator
  const paginatorProps: PrimePaginatorProps = {
    totalRecords: finalTotalRecords,
    rows,
    first: finalFirst,
    pageLinkSize,
    rowsPerPageOptions,
    template: template || {
      layout: 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown CurrentPageReport'
    },
    leftContent,
    rightContent,
    className,
    style,
    onPageChange,
    currentPageReportTemplate,
    alwaysShow,
  };

  return (
    <div data-testid={testId}>
      <PrimePaginator {...paginatorProps} />
    </div>
  );
};

export default MedicalPaginator;