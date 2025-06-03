/* ErrorMessage.jsx Display API errors gracefully */
/* Centralized error handling */

const ErrorMessage = ({ message }) => {
  return (
    <div className="bg-red-100 text-red-700 border border-red-300 rounded-md p-4 my-4">
      <p className="font-semibold">Oops! Something went wrong.</p>
      {message && <p className="text-sm mt-2">{message}</p>}
    </div>
  );
};

export default ErrorMessage;
