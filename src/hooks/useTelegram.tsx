import { useEffect, useCallback } from 'react';
import WebApp from '@twa-dev/sdk';
import toast from 'react-hot-toast';

export function useTelegram() {
  const initializeWebApp = useCallback(() => {
    // Only initialize if we're in a Telegram WebApp environment
    if (!window.Telegram?.WebApp) return;

    try {
      // Set theme colors
      WebApp.setHeaderColor('#4f46e5');
      WebApp.setBackgroundColor('#f3f4f6');
    } catch (error) {
      console.warn('Telegram WebApp initialization failed:', error);
    }
  }, []);

  useEffect(() => {
    // Initialize after component mount
    initializeWebApp();
  }, [initializeWebApp]);

  const showAlert = (message: string) => {
    toast(message, {
      duration: 3000,
      position: 'top-center',
      className: 'bg-indigo-600 text-white rounded-lg',
    });
  };

  const showConfirm = async (message: string): Promise<boolean> => {
    return new Promise<boolean>((resolve) => {
      toast.custom(
        (t) => (
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <p className="text-gray-900 mb-4">{message}</p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => {
                  resolve(false);
                  toast.dismiss(t.id);
                }}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  resolve(true);
                  toast.dismiss(t.id);
                }}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
              >
                Confirm
              </button>
            </div>
          </div>
        ),
        { duration: Infinity }
      );
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