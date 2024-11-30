export function InputBox({ label, placeholder, onChange, value }) {
  return (
    <div>
      <div className="text-sm font-medium text-left py-2 text-gray-300">{label}</div>
      <input
        onChange={onChange}
        placeholder={placeholder}
        value={value}
        className="w-full px-2 py-1 border rounded border-gray-600 bg-gray-800 text-white placeholder-gray-400"
      />
    </div>
  );
}

