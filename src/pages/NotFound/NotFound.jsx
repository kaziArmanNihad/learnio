import { Link } from "react-router";

const NotFound = () => {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-5 bg-white">
      <h1 className="text-center text-6xl font-bold">Page Not Found</h1>
      <Link to="/">
        <button
          type="button"
          className="btn hover:border-none hover:bg-blue-500 hover:text-white"
        >
          Please Go Back to Home Page
        </button>
      </Link>
    </div>
  );
};

export default NotFound;
