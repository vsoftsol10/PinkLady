import React from 'react'

const AdminLogin = () => {
  const [state, setState] = React.useState("login");
  const [data, setData] = React.useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F18372]/20 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-90 h-90 max-w-md text-center border border-zinc-200/60 dark:border-zinc-700 rounded-2xl shadow-xl px-8 py-10 bg-white dark:bg-zinc-900 backdrop-blur-lg"
      >
        {/* Title */}
        <h1 className="text-zinc-900 dark:text-white text-3xl font-semibold">
          {state === "login" ? "Admin Login" : "Register Admin"}
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-2 mb-6">
          Please {state === "login" ? "sign in" : "sign up"} to continue
        </p>

        {/* Name Field (only in register mode) */}
        {state !== "login" && (
          <div className="flex items-center w-full mt-4 border border-zinc-300/80 dark:border-zinc-700 h-12 rounded-full overflow-hidden pl-6 gap-2 bg-zinc-50 dark:bg-zinc-800 focus-within:ring-2 focus-within:ring-indigo-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-zinc-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M20 21a8 8 0 0 0-16 0" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <input
              type="text"
              placeholder="Full Name"
              className="bg-transparent text-zinc-700 dark:text-zinc-200 placeholder-zinc-400 outline-none text-sm w-full"
              name="name"
              value={data.name}
              onChange={onChangeHandler}
              required
            />
          </div>
        )}

        {/* Email Field */}
        <div className="flex items-center w-full mt-4 border border-zinc-300/80 dark:border-zinc-700 h-12 rounded-full overflow-hidden pl-6 gap-2 bg-zinc-50 dark:bg-zinc-800 focus-within:ring-2 focus-within:ring-indigo-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-zinc-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <rect width="20" height="16" x="2" y="4" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
          <input
            type="email"
            placeholder="Email address"
            className="bg-transparent text-zinc-700 dark:text-zinc-200 placeholder-zinc-400 outline-none text-sm w-full"
            name="email"
            value={data.email}
            onChange={onChangeHandler}
            required
          />
        </div>

        {/* Password Field */}
        <div className="flex items-center mt-4 w-full border border-zinc-300/80 dark:border-zinc-700 h-12 rounded-full overflow-hidden pl-6 gap-2 bg-zinc-50 dark:bg-zinc-800 focus-within:ring-2 focus-within:ring-indigo-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-zinc-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          <input
            type="password"
            placeholder="Password"
            className="bg-transparent text-zinc-700 dark:text-zinc-200 placeholder-zinc-400 outline-none text-sm w-full"
            name="password"
            value={data.password}
            onChange={onChangeHandler}
            required
          />
        </div>

      

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-6 w-full h-12 rounded-full cursor-pointer text-white font-medium bg-[#F18372] hover:bg-[#f54328] transition-all shadow-md"
        >
          {state === "login" ? "Login" : "Create Account"}
        </button>

       
      </form>
    </div>
  );
};

export default AdminLogin;
