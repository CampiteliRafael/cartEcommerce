"use client";

import { SORT_OPTIONS } from '@/utils/constants';

export default function ProductSorter() {
  return (
    <select className="border border-gray-300 rounded-md px-3 py-1 text-sm bg-white">
      {SORT_OPTIONS.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}