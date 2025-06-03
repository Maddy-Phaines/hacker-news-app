/* Reusable for any empty list/search result */
/* Takes a customizable message prop */

const EmptyState = ({ text = "No results found" }) => {
  return (
    <div className="text-center text-gray-500 py-12">
      <p className="text-lg">{text}</p>
    </div>
  );
};

export default EmptyState;
