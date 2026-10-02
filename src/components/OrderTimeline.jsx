import React from 'react';
import { Check } from 'lucide-react';

const STEPS = [
  'Order Placed',
  'Confirmed',
  'Packed',
  'Shipped',
  'Out for Delivery',
  'Delivered',
];

export default function OrderTimeline({ currentStatusCode = 4 }) {
  return (
    <div className="py-4">
      {/* Desktop Horizontal */}
      <div className="hidden sm:flex items-center justify-between relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-slate-200 dark:bg-slate-800 -z-0" />
        
        <div
          className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 bg-indigo-600 transition-all -z-0"
          style={{
            width: `${Math.min(100, Math.max(0, ((currentStatusCode - 1) / (STEPS.length - 1)) * 100))}%`
          }}
        />

        {STEPS.map((step, idx) => {
          const stepNum = idx + 1;
          const isDone = stepNum < currentStatusCode;
          const isCurrent = stepNum === currentStatusCode;

          return (
            <div key={step} className="relative z-10 flex flex-col items-center">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs transition-colors ${
                  isDone
                    ? 'bg-indigo-600 text-white'
                    : isCurrent
                    ? 'border-2 border-indigo-600 bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 font-bold'
                    : 'border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-400 dark:text-slate-600'
                }`}
              >
                {isDone ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : stepNum}
              </div>
              <span
                className={`text-[11px] mt-2 font-medium text-center ${
                  isCurrent
                    ? 'text-indigo-600 dark:text-indigo-400 font-bold'
                    : isDone
                    ? 'text-slate-800 dark:text-slate-200'
                    : 'text-slate-400 dark:text-slate-500'
                }`}
              >
                {step}
              </span>
            </div>
          );
        })}
      </div>

      {/* Mobile Vertical */}
      <div className="sm:hidden space-y-4 pl-4 border-l-2 border-slate-200 dark:border-slate-800">
        {STEPS.map((step, idx) => {
          const stepNum = idx + 1;
          const isDone = stepNum < currentStatusCode;
          const isCurrent = stepNum === currentStatusCode;

          return (
            <div key={step} className="flex items-center gap-3">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs shrink-0 ${
                  isDone
                    ? 'bg-indigo-600 text-white'
                    : isCurrent
                    ? 'border-2 border-indigo-600 bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 font-bold'
                    : 'border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-400 dark:text-slate-600'
                }`}
              >
                {isDone ? <Check className="w-3 h-3" /> : stepNum}
              </div>
              <span
                className={`text-xs ${
                  isCurrent
                    ? 'font-bold text-indigo-600 dark:text-indigo-400'
                    : isDone
                    ? 'font-medium text-slate-800 dark:text-slate-200'
                    : 'text-slate-400 dark:text-slate-500'
                }`}
              >
                {step}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
