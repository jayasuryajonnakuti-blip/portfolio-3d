import React from 'react';
import { CheckCircle2 } from 'lucide-react';

interface ToastProps {
  message: string;
  show: boolean;
}

export const Toast: React.FC<ToastProps> = ({ message, show }) => {
  if (!show) return null;

  return (
    <div className="toast-container" role="status">
      <CheckCircle2 size={18} color="#FF1A1A" />
      <span>{message}</span>
    </div>
  );
};
