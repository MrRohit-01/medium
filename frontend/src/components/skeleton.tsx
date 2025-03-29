export const Skeleton = () => {
  const skeletonItems = Array(6).fill(null); // Adjust the number of skeleton items as needed

  return (
    <>
      {skeletonItems.map((_, index) => (
        <div key={index} className="flex justify-center mt-8">
          <div className="flex flex-col px-2 max-sm:px-4 py-3 max-w-lg justify-center w-full space-y-4">
            <div className="flex gap-3 h-full pb-3">
              <div className="w-10 h-10 flex items-center justify-center bg-gray-200 rounded-lg text-sm font-bold text-gray-700">
                
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-700 font-medium mb-1 w-24 rounded-xl h-4 bg-slate-200"></p>
                <h2 className="mt-3 text-xl font-semibold text-gray-800 mb-4 rounded-xl h-7 bg-slate-200"></h2>
                <p className="text-sm text-gray-600 mb-2 w-4/5 rounded-xl h-5 bg-slate-200"></p>
                <p className="text-sm text-gray-600 mb-2 w-3/4 rounded-xl h-5 bg-slate-200"></p>
                <p className="text-sm text-gray-600 mb-2 w-2/4 rounded-xl h-5 bg-slate-200"></p>
                <div className="flex items-center text-xs text-gray-500 gap-2">
                  <p className="w-1/5 rounded-xl h-5 bg-slate-200"></p>
                  <p className="w-1/4 rounded-xl h-5 bg-slate-200"></p>
                  <p className="w-1/4 rounded-xl h-5 bg-slate-200"></p>
                </div>
              </div>
            </div>
            <hr className="mb-2" />
          </div>
        </div>
      ))}
    </>
  );
};
