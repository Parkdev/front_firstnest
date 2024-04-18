import "./App.css";
import axios from "axios";
import { useState } from "react";
import FileUpload from "./components/popover";

function App() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [result, setResult] = useState("");
  const [token, setToken] = useState("");

  // useEffect(() => {
  //   console.log("token: ", token);
  // }, [token, setToken]);

  return (
    <div className="flex h-screen flex-col">
      <nav className="flex w-full items-center justify-between bg-teal-500 p-6">
        <div className="mr-6 flex flex-shrink-0 items-center text-white">
          <svg
            className="mr-2 h-8 w-8 fill-current"
            width="54"
            height="54"
            viewBox="0 0 54 54"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z" />
          </svg>
          <span className="text-xl font-semibold tracking-tight">
            Tailwind CSS
          </span>
          <div className="ml-3">
            <FileUpload />
          </div>
        </div>
        <div className="">
          <div>
            {token ? (
              <button
                href="/"
                className="mt-4 inline-block rounded border border-white bg-orange-500 px-4 py-2 text-sm leading-none text-white hover:border-transparent hover:bg-orange-300 hover:text-teal-500 lg:mt-0"
                onClick={() => {
                  setToken("");
                }}
              >
                Logout
              </button>
            ) : (
              <a
                href="/"
                className="mt-4 inline-block rounded border border-white px-4 py-2 text-sm leading-none text-white hover:border-transparent hover:bg-white hover:text-teal-500 lg:mt-0"
              >
                Login
              </a>
            )}
          </div>
        </div>
      </nav>

      {/* 로그인 */}
      <div className="flex flex-grow items-center justify-center">
        <div className="w-full max-w-md">
          <form className="mb-4 rounded bg-white px-8 pb-8 pt-6 shadow-md">
            <div className="mb-4">
              <label
                className="mb-2 block text-sm font-bold text-gray-700"
                for="email"
              >
                Username
              </label>
              <input
                className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                id="email"
                type="email"
                placeholder="test@abc.com"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                className="mb-2 block text-sm font-bold text-gray-700"
                for="username"
              >
                Username
              </label>
              <input
                className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                id="username"
                type="text"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label
                className="mb-2 block text-sm font-bold text-gray-700"
                for="password"
              >
                Password
              </label>
              <input
                className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                id="password"
                type="password"
                placeholder="***"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
                type="button"
                onClick={() => {
                  axios
                    .post("http://localhost:8000/cats/login", {
                      email: email,
                      password: password,
                    })
                    .then((res) => {
                      console.log("res", res);
                      setResult(JSON.stringify(res.data));
                      setToken(res.data.data.token);
                    });
                }}
              >
                Sign In
              </button>
              <button
                className="focus:shadow-outline rounded bg-gray-500 px-4 py-2 font-bold text-white hover:bg-gray-700 focus:outline-none"
                type="button"
                onClick={() => {
                  axios
                    .post("http://localhost:8000/cats/", {
                      email: email,
                      name: username,
                      password: password,
                    })
                    .then((res) => {
                      setResult(JSON.stringify(res.data));
                    })
                    .catch((err) => {
                      setResult(JSON.stringify(err.response.data));
                    });
                }}
              >
                Sign Up
              </button>
              <button
                className="focus:shadow-outline rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700 focus:outline-none"
                type="button"
                onClick={() => {
                  axios
                    .get("http://localhost:8000/cats/", {
                      headers: {
                        Authorization: `Bearer ${token}`,
                      },
                    })
                    .then((res) => {
                      setResult(JSON.stringify(res.data));
                    })
                    .catch((err) => {
                      setResult(JSON.stringify(err.response.data));
                    });
                }}
              >
                User Info (need auth)
              </button>
            </div>
          </form>
          <div className="max-w-md">
            <p className="truncate text-center text-xs text-gray-500">
              {result || `@2024 Test Corp. All rights reserved.`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
