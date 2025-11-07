export function SkeletonCard() {
  return (
    <div className="animate-pulse bg-white rounded-xl shadow-sm overflow-hidden h-full flex flex-col">
      <div className="h-40 bg-gray-200"></div>

      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        <div className="h-4 bg-gray-300 rounded w-full mt-2"></div>
      </div>
    </div>
  );
}
