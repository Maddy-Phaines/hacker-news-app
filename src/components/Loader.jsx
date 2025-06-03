/* Displays spinner while loading API data
Full-page or inline loaders */

const Loader = () => {
  return (
    <div className="flex justify-center py-8">
      <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;
