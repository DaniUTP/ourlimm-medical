import React from 'react';
import { PrimeReactProvider } from 'primereact/api';

export interface MedicalProviderProps {
  children: React.ReactNode;
}

export const MedicalProvider: React.FC<MedicalProviderProps> = ({
  children,
}) => {
  return (
    <PrimeReactProvider>
      {children}
    </PrimeReactProvider>
  );
};

export default MedicalProvider;