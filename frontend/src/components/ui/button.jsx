export default function Button({ children, className = "", ...props }) {
    return (
      <button
        className={`rounded-xl bg-blue-600 text-white font-semibold px-6 py-3 shadow-md hover:bg-blue-700 transition-all duration-300 ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
  