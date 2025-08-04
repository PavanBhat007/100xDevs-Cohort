const InputBox = ({ placeholder, label, type, onChange }) => {
  return (
    <>
      <p className="font-semibold">
        {label}
      </p>
      <input
        className="mb-3 w-full border-1 border-gray-200 rounded-sm px-2 py-1"
        type={type}
        placeholder={placeholder}
        onChange={onChange}
      />
    </>
  );
};

export default InputBox;
