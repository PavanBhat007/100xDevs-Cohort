const Avatar = ({ letter, colour, text }) => {
  return (
    <p className={`p-2 rounded-full bg-${colour} text-${text} w-10 h-10 text-center font-bold`}>
      {letter}
    </p>
  );
};

export default Avatar;
