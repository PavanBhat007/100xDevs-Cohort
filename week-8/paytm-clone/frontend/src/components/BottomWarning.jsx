import { Link } from 'react-router-dom';

const BottomWarning = ({label, route, routeText}) => {
  return (
    <p className="border-t-1 pt-2 border-gray-300 w-full text-center ">
      {label}{" "}
      <Link className="underline cursor-pointer" to={route}>
        {routeText}
      </Link>
    </p>
  );
};

export default BottomWarning;
