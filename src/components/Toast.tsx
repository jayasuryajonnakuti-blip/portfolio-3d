import React from 'react';
import { CheckCircle2 } from 'lucide-react';

interface ToastProps {
  message: string;
  show: boolean;
}

export const Toast: React.FC<ToastProps> = ({ message, show }) => {
  return (
    <div className={`toast-message ${show ? 'show' : ''}`} role="status">
      <CheckCircle2 size={18} color="#38bdf8" />
      <span>{message}</span>
    </div>
  );
};
