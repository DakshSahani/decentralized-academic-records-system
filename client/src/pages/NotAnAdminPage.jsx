import { ReactTyped } from "react-typed";

const NotAnAdminPage = () => {
  return (
    <div className="flex flex-col items-center">
      <ReactTyped 
        className="text-primary !text-4xl mb-4"
        strings={["Oops! You're not an admin."]} 
        typeSpeed={35}
        showCursor={false}
      />
      <p className="text-black text-base mb-8">
        Sorry, this page is only accessible to administrators. Please contact
        the site administrator for assistance.
      </p>
      <img
        src="/not-an-admin-error.svg"
        alt="Illustration"
        className="max-w-md w-full h-auto"
      />
    </div>
  );
};

export default NotAnAdminPage;