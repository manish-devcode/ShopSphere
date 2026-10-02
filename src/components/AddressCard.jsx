import React from 'react';

export default function AddressCard({
  address,
  isSelected = false,
  onSelect,
  onEdit,
  onDelete,
  selectable = false,
}) {
  return (
    <div
      onClick={selectable && onSelect ? () => onSelect(address) : undefined}
      className={`rounded-xl border p-4 transition-colors ${
        selectable ? 'cursor-pointer' : ''
      } ${
        isSelected
          ? 'border-indigo-600 bg-indigo-50/40 dark:bg-indigo-950/30'
          : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900'
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
          {address.tag || 'Home'}
        </span>
        {address.isDefault && (
          <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
            Default
          </span>
        )}
      </div>

      <div className="space-y-1 text-xs text-slate-600 dark:text-slate-300">
        <p className="font-semibold text-slate-900 dark:text-white">
          {address.fullName}
        </p>
        <p className="text-slate-400">
          {address.phone}
        </p>
        <p className="leading-relaxed">
          {address.house}, {address.street}
          <br />
          {address.city}, {address.state} — {address.pincode}
        </p>
      </div>

      {(onEdit || onDelete) && (
        <div className="flex items-center gap-3 pt-3 mt-3 border-t border-slate-100 dark:border-slate-800 text-xs font-semibold">
          {onEdit && (
            <button
              type="button"
              onClick={() => onEdit(address)}
              className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400"
            >
              Edit
            </button>
          )}
          {onDelete && !address.isDefault && (
            <button
              type="button"
              onClick={() => onDelete(address.id)}
              className="text-slate-400 hover:text-rose-600"
            >
              Delete
            </button>
          )}
        </div>
      )}
    </div>
  );
}
