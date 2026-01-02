import React from 'react';

export const ProductSkeleton = () => {
  return (
    <div className="bg-white rounded-xl shadow-card overflow-hidden animate-pulse">
      <div className="h-64 bg-gray-200 w-full"></div>
      <div className="p-6 space-y-4">
        <div className="flex justify-between items-start">
          <div className="h-6 bg-gray-200 rounded w-2/3"></div>
          <div className="h-6 bg-gray-200 rounded w-1/4"></div>
        </div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
        <div className="pt-4 flex justify-between items-center">
          <div className="h-5 bg-gray-200 rounded w-1/4"></div>
          <div className="h-10 bg-gray-200 rounded-full w-1/3"></div>
        </div>
      </div>
    </div>
  );
};

export const ProductGridSkeleton = ({ count = 3 }: { count?: number }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: count }).map((_, i) => (
        <ProductSkeleton key={i} />
      ))}
    </div>
  );
};

