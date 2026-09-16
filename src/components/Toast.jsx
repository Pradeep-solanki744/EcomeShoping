import React from 'react';
import { useShop } from '../context/ShopContext';

export const Toast = () => {
  const { toasts } = useShop();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-xs w-full">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="bg-gray-900 text-white text-xs px-3.5 py-2.5 rounded shadow border border-gray-700"
        >
          {t.message}
        </div>
      ))}
    </div>
  );
};
