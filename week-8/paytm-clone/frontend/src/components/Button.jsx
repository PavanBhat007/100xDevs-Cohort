const Button = ({ label, onClick }) => {
  return (
    <button
      className="bg-gray-900 my-2 cursor-pointer text-white font-semibold w-full rounded-md py-1"
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
