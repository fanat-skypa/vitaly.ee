'use client';

import { ReactNode } from 'react';
import { X } from 'lucide-react';
import { Button } from './button';

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
  className?: string;
}

export function Modal({ children, onClose, className = '' }: ModalProps) {
  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50 ${className}`}>
      <div className="bg-white rounded-lg shadow-lg p-6 relative w-full max-w-lg">
        <Button
          size="icon"
          variant="ghost"
          className="absolute top-3 right-3"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>
        {children}
      </div>
    </div>
  );
}
