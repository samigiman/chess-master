import { useEffect } from 'react';
import WebApp from '@twa-dev/sdk';
import toast from 'react-hot-toast';

export function useTelegram() {
  useEffect(() => {
    try {
      // Initialize WebApp only if we're in Telegram
      if (window.Telegram?.WebApp) {
        WebApp.ready();
        WebApp.expand();
        WebApp.setHeaderColor('#4f46e5');
        WebApp.setBackgroundColor('#f3f4f6');
      }
    } catch (error) {
      console.warn('Telegram WebApp initialization failed:', error);
    }
  }, []);

  const showAlert = (message: string) => {
    toast(message, {
      duration: 3000,
      position: 'top-center',
      style: {
        background: '#4f46e5',
        color: '#ffffff',
        borderRadius: '0.5rem',
      },
    });
  };

  const showConfirm = async (message: string): Promise<boolean> => {
    return new Promise<boolean>((resolve) => {
      const confirmed = window.confirm(message);
      resolve(confirmed);
    });
  };

  const closeApp = () => {
    try {
      if (window.Telegram?.WebApp) {
        WebApp.close();
      }
    } catch (error) {
      console.warn('Failed to close Telegram WebApp:', error);
    }
  };

  return {
    showAlert,
    showConfirm,
    closeApp,
    user: WebApp.initDataUnsafe?.user || null,
  };
}