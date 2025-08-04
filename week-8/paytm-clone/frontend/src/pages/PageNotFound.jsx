import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="bg-slate-100 shadow rounded-md p-4 mt-50">
        <h1 className="font-bold text-2xl">404 | Page not found</h1>
        <p className="text-sm font-semibold text-gray-700">
          Try using below links to navigate to the right page
        </p>

        <div className="flex justify-start space-x-3 items-center mt-4">
          <AltLink label={"Sign In"} route={"/signin"} />
          <AltLink label={"Sign Up"} route={"/signup"} />
          <AltLink label={"Dashboard"} route={"/dashboard"} />
        </div>
      </div>
    </div>
  );
};

const AltLink = ({ label, route }) => {
  return (
    <Link
      className="font-semibold cursor-pointer bg-gray-300 py-1 px-2 rounded-md"
      to={route}
    >
      {label}
    </Link>
  );
};

export default PageNotFound;
