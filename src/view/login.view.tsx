import Head from "next/head";
import Image from "next/image";

export default function LoginPage() {
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      {/* Entire page container */}
      <div className=" flex flex-col items-center justify-center min-h-screen w-full">
        {/* Background image */}
        <div className="fixed top-0 bottom-50  z-[-1]">
          <Image
            src={"/Background pattern decorative.png"}
            alt=""
            width={768}
            height={768}
          />
        </div>

        {/* Login contents container */}
        <div className="flex flex-col items-center max-w-[1280px] w-full ">
          {/* Smaller container for login */}
          <div className="flex flex-col items-center max-w-[360px] w-full ">
            {/* Header container */}
            <div className="flex flex-col items-center w-full">
              <h2 className="text-2xl font-bold text-center">
                Log in to your account
              </h2>
              <p className="text-center">
                Welcome back! Please enter your details.
              </p>
            </div>

            {/* Form container */}
            <form className="flex flex-col space-y-4 w-full p-8 ">
              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  className="w-full border-gray-300 rounded-lg p-2 border focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  className="w-full border-gray-300 rounded-lg p-2 border focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember"
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="remember" className="ml-2">
                    Remember for 30 days
                  </label>
                </div>
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
