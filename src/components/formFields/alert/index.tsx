import { Alert, AlertTitle } from '@mui/material';
import React from 'react';
import { AlertPrimary } from '../../styledComponents';

interface AlertTextProps {
  type: 'error' | 'warning' | 'info' | 'success';
  message: string;
}

const alert = ({ type, message }: AlertTextProps) => (
  <AlertPrimary>
    <Alert severity={type}>
      <AlertTitle>{type}</AlertTitle>
      {message}
    </Alert>
  </AlertPrimary>
);

const AlertText: React.FC<AlertTextProps> = ({ type, message }) => alert({ type, message });

export default AlertText;
