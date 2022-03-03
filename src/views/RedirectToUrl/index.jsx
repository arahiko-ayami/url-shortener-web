import { getShortenedUrl, hasPassword, isIdExist } from "../../services";
import { useEffect, useRef, useState } from "react";
import { Navigate } from "react-router-dom";

function RedirectToUrl() {
  const passwordInputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
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

  useEffect(async () => {
    const currUrl = window.location.href;
    const id = currUrl.split("/")[3];
    const result = await isIdExist(id);
    setIsExist(result.isIdExist);
    const { data } = await hasPassword(id);
    setUrlHasPasswords(data.hasPassword);
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

  return (
    <>
      {!isExist ? (
        <Navigate to="/go/not-found" replace={true} />
      ) : (
        <div className="py-5 flex flex-col items-center space-y-5">
          <div>
            <h1 className="font-bold pt-24 text-neutral-800 text-center text-5xl underline decoration-blue-500 underline-offset-4">
              URL Now
            </h1>
            <h2 className="p-5 text-neutral-500 text-center text-2xl">
              Click vào nút bên dưới để chuyển đến trang web của bạn
            </h2>
          </div>
          {!urlHasPassword || (urlHasPassword && truePassword) ? (
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
          ) : (
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
          )}
          <button
            type="submit"
            className="py-4 px-5 bg-neutral-600 font-bold w-2/3 sm:w-2/5 md:w-1/3 lg:w-1/4 rounded-lg shadow-lg shadow-neutral-500 hover:-translate-y-1 duration-75 hover:bg-neutral-700 items-center text-white"
          >
            Tạo một link rút gọn mới
          </button>
        </div>
      )}
    </>
  );
}

export default RedirectToUrl;
