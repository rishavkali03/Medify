export default function Textarea({ className = "", ...props }) {
    return (
      <textarea
        className={`w-full rounded-xl border border-gray-300 p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
        {...props}
      />
    );
  }
  