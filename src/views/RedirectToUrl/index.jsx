import { getShortenedUrl, getInfo } from "../../services";
import { useEffect, useRef, useState } from "react";
import { Navigate, Link } from "react-router-dom";

function RedirectToUrl() {
  const passwordInputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isGettingData, setIsGettingData] = useState(true);
  const [url, setUrl] = useState(null);
  const [urlHasPassword, setUrlHasPasswords] = useState(true);
  const [truePassword, setTruePassword] = useState(false);
  const [error, setError] = useState(null);
  const [isExist, setIsExist] = useState(true);

  const getUrl = async (id, password) => {
    const { data } = await getShortenedUrl(id, password).catch((e) => {
      setError(e.message);
      throw e.message;
    });
    if (data) {
      setTruePassword(true);
      setTimeout(() => {
        setIsLoading(false);
        setUrl(data.url);
      }, 1500);
    }
  };

  const getIdInfo = async (id) => {
    const { data } = await getInfo(id).catch(() => {
      setIsExist(false);
      setIsGettingData(false);
    });
    if (data) {
      setUrlHasPasswords(data.hasPassword);
      setIsExist(true);
    } else {
      setIsExist(false);
    }
    setIsGettingData(false);
  };

  useEffect(async () => {
    const currUrl = window.location.href;
    const id = currUrl.split("/")[3];
    await getIdInfo(id);
  }, []);

  useEffect(async () => {
    const currUrl = window.location.href;
    const id = currUrl.split("/")[3];
    if (!urlHasPassword) await getUrl(id);
  }, [urlHasPassword]);

  const onSubmitHandle = async (e) => {
    e.preventDefault();
    setError(null);
    const currUrl = window.location.href;
    const id = currUrl.split("/")[3];
    const password = passwordInputRef.current.value;
    await getUrl(id, password);
  };

  if (isGettingData) {
    return (
      <div className="py-5 flex flex-col items-center space-y-5 h-screen w-screen justify-center items-center">
        <svg
          className="animate-spin h-10 w-10 mr-2.5 text-gray-700"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
        <h2 className="p-5 text-neutral-500 text-center text-2xl">
          Đang tìm kiếm link của bạn...
        </h2>
      </div>
    );
  }

  if (!isExist && !isGettingData) {
    return <Navigate to="/go/not-found" />;
  }

  if ((!urlHasPassword && !isGettingData) || (urlHasPassword && truePassword)) {
    return (
      <div className="py-5 flex flex-col items-center space-y-5">
        <div>
          <h1 className="font-bold pt-24 text-neutral-800 text-center text-5xl underline decoration-blue-500 underline-offset-4">
            URL Now
          </h1>
          <h2 className="p-5 text-neutral-500 text-center text-2xl">
            Click vào nút bên dưới để chuyển đến trang web của bạn
          </h2>
        </div>
        <a
          href={url}
          className="py-4 px-5 bg-blue-500 font-bold w-2/3 sm:w-2/5 md:w-1/3 lg:w-1/4 rounded-lg shadow-lg shadow-blue-500 hover:-translate-y-1 duration-75 hover:bg-blue-400 items-center text-white flex justify-center"
        >
          {isLoading ? (
            <>
              <svg
                className="animate-spin h-5 w-5 mr-2.5 text-white"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Đang tìm kiếm trang web của bạn...
            </>
          ) : (
            "Nhấn vào đây để tiếp tục"
          )}
        </a>
        <Link
          to="/"
          className="flex flex-col py-4 px-5 bg-neutral-600 w-2/3 sm:w-2/5 md:w-1/3 lg:w-1/4 rounded-lg shadow-lg shadow-neutral-500 hover:-translate-y-1 duration-75 hover:bg-neutral-700 items-center text-white"
        >
          <button type="button" className="font-bold">
            Tạo một link rút gọn mới
          </button>
        </Link>
      </div>
    );
  }

  if (urlHasPassword && !truePassword) {
    return (
      <div className="py-5 flex flex-col items-center space-y-5">
        <div>
          <h1 className="font-bold pt-24 text-neutral-800 text-center text-5xl underline decoration-blue-500 underline-offset-4">
            URL Now
          </h1>
          <h2 className="p-5 text-neutral-500 text-center text-2xl">
            Nhập mật khẩu và click vào nút bên dưới để chuyển đến trang web của
            bạn
          </h2>
        </div>
        <form
          className="flex flex-col w-2/3 sm:w-2/5 md:w-1/3 lg:w-1/4"
          onSubmit={onSubmitHandle}
        >
          {error && (
            <div className="text-red-500 text-center text-sm">{error}</div>
          )}
          <input
            type="password"
            name="password"
            ref={passwordInputRef}
            className="my-3 p-2.5 rounded-md w-full outline outline-1 outline-stone-400 focus:outline-blue-200 w-full"
            placeholder="Mật khẩu"
          />
          <button
            type="submit"
            className="py-4 px-5 bg-blue-500 font-bold w-full rounded-lg shadow-lg shadow-blue-500 hover:-translate-y-1 duration-75 hover:bg-blue-400 items-center text-white flex justify-center"
          >
            Tiếp tục
          </button>
        </form>
        <Link
          to="/"
          className="flex flex-col py-4 px-5 bg-neutral-600 w-2/3 sm:w-2/5 md:w-1/3 lg:w-1/4 rounded-lg shadow-lg shadow-neutral-500 hover:-translate-y-1 duration-75 hover:bg-neutral-700 items-center text-white"
        >
          <button type="button" className="font-bold">
            Tạo một link rút gọn mới
          </button>
        </Link>
      </div>
    );
  }
}

export default RedirectToUrl;
