// AdminPopup.tsx
'use client';
import { useState } from 'react';
import { Modal } from '@/components/ui/modal';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';

interface AdminPopupProps {
  hidden: boolean;
  onClose: () => void;
}

export function AdminPopup({ hidden, onClose }: AdminPopupProps) {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  if (hidden) return null; // <- если скрыт, ничего не рендерим

  const handleLogin = async () => {
    const success = await login(username, password);
    if (success) onClose();
    else alert('Wrong credentials');
  };

  return (
    <Modal onClose={onClose}>
      <div className="p-6 space-y-4">
        <h2 className="text-2xl font-bold">Admin Login</h2>
        <Input
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <div className="flex justify-end gap-4">
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button onClick={handleLogin}>Login</Button>
        </div>
      </div>
    </Modal>
  );
}
