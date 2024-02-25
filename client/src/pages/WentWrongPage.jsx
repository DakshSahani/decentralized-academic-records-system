import { Link } from "react-router-dom";

function WentWrongPage({children, condition}) {
  if(!condition) {
    return children;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-errorColor text-secondaryColor">
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-8">
          Oops! <span className="text-primary">Something Went Wrong</span>
        </h1>
        <p className="text-lg">We're sorry, but an unexpected error occurred.</p>
        <p className="text-lg mb-8">Check Your Internet Connection</p>
        <Link to="/" className="bg-white border border-primary text-primary font-semibold px-6 py-3 rounded-lg shadow-md">
          Go Back Home
        </Link>
      </div>
    </div>
  );
}


export default WentWrongPage;
