import React from 'react';
import { useShop } from '../context/ShopContext';
import { CheckCircle2, Info, AlertCircle } from 'lucide-react';

export const Toast = () => {
  const { toasts } = useShop();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-center gap-3 bg-slate-900/95 text-white p-3.5 px-4 rounded-2xl shadow-xl border border-slate-700/60 backdrop-blur-md animate-in slide-in-from-bottom-5 fade-in duration-300"
        >
          {toast.type === 'success' && (
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          )}
          {toast.type === 'info' && (
            <Info className="w-5 h-5 text-blue-400 shrink-0" />
          )}
          {toast.type === 'error' && (
            <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
          )}

          <p className="text-xs sm:text-sm font-semibold flex-1 leading-snug">
            {toast.message}
          </p>
        </div>
      ))}
    </div>
  );
};
