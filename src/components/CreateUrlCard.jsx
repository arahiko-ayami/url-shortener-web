import { useRef, useState } from "react";
import { createShortenedUrl } from "../services/";
import { BASE_URL } from "../config/params";

function CreateUrlCard() {
  const urlInputRef = useRef();
  const passwordInputRef = useRef();
  const customUrlInputRef = useRef();
  const shortenedUrlRef = useRef();

  const [url, setUrl] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [customUrl, setCustomUrl] = useState("");
  const [showCustomUrl, setShowCustomUrl] = useState(false);
  const [errorCode, setErrorCode] = useState(null);
  const [shortenedUrl, setShortenedUrl] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleOnCreate(e) {
    setLoading(true);
    e.preventDefault();
    setErrorCode(null);
    setShortenedUrl("");
    const { data } = await createShortenedUrl(customUrl, url, password).catch(
      (error) => {
        setErrorCode(error.response.status);
      }
    );
    setShortenedUrl(`${BASE_URL}${data.id}`);
    setLoading(false);
  }

  function errorCodeToText() {
    if (errorCode === 409) {
      return "ID bạn chọn đã tồn tại, vui lòng chọn ID khác";
    }
  }

  async function handleOnCopy() {
    let success = true;
    try {
      // Using clipboard API
      if (navigator.clipboard)
        await navigator.clipboard.writeText(shortenedUrlRef.current.value);
      // Fallback function using old method
      else {
        shortenedUrlRef.current.select();
        success = document.execCommand("copy");
        if (!success) throw new Error("Unable to copy to clipboard");
      }
    } catch (err) {
      console.error(err.message);
    }
  }

  return (
    <div className="bg-white flex-col rounded-lg w-10/12 md:w-2/3 lg:w-2/5 text-neutral-600 space-y-1 shadow shadow-xl shadow-gray-500">
      <h1 className="font-bold p-5 text-neutral-800">Tạo link rút gọn</h1>
      <hr />
      <form onSubmit={handleOnCreate}>
        <div className="p-5">
          <p>URL</p>
          <input
            type="url"
            name="url"
            ref={urlInputRef}
            onChange={(e) => setUrl(e.target.value)}
            className="my-3 p-2.5 rounded-md w-full outline outline-1 outline-stone-400 focus:outline-blue-200"
            placeholder="Nhập đường link bạn muốn rút gọn"
            required
          />
          <p>Mật khẩu (Tùy chọn)</p>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            ref={passwordInputRef}
            onChange={(e) => setPassword(e.target.value)}
            className="my-3 p-2.5 rounded-md w-full outline outline-1 outline-stone-400 focus:outline-blue-200"
            placeholder="Mật khẩu"
          />
          <div
            className="flex items-baseline space-x-1 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            <input
              type="checkbox"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
              className="cursor-pointer"
            />
            <p>Hiển thị mật khẩu</p>
          </div>
          <div
            className="flex items-baseline space-x-1 cursor-pointer"
            onClick={() => setShowCustomUrl(!showCustomUrl)}
          >
            <input
              type="checkbox"
              className="cursor-pointer"
              checked={showCustomUrl}
              onChange={() => setShowCustomUrl(!showCustomUrl)}
            />
            <p>Tùy chỉnh ID của link</p>
          </div>
          {showCustomUrl ? (
            <div className="flex items-baseline outline outline-1 outline-stone-400 focus-within:outline-blue-200 my-3 p-2.5 rounded-md w-full">
              <span>
                <p>{BASE_URL}</p>
              </span>
              <input
                type="url"
                name="url"
                ref={customUrlInputRef}
                onChange={(e) => setCustomUrl(e.target.value)}
                className="w-full focus:outline-none"
                placeholder="your-custom-url"
              />
            </div>
          ) : null}
          {errorCode ? (
            <p className="text-red-600">{errorCodeToText()}</p>
          ) : null}
        </div>
        <div className="p-5 pt-0 text-white flex flex-col md:flex-row space-y-5 md:space-y-0 md:space-x-5">
          <button
            type="submit"
            className="py-4 bg-blue-500 font-bold md:w-1/3 rounded-lg shadow-lg shadow-blue-500 hover:-translate-y-1 duration-75 hover:bg-blue-400 flex items-center justify-center"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center px-2">
                <svg
                  className="animate-spin h-5 w-5 mr-1.5 text-white"
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
                Đang rút gọn...
              </div>
            ) : (
              "Rút gọn"
            )}
          </button>
          <button
            type="button"
            className="py-4 bg-neutral-100 font-bold md:w-1/3 rounded-lg text-neutral-600 shadow-lg hover:-translate-y-1 duration-75 hover:bg-neutral-200"
            onClick={() => {
              urlInputRef.current.value = "";
              passwordInputRef.current.value = "";
            }}
          >
            Nhập lại
          </button>
          <button
            type="button"
            className="py-4 bg-neutral-100 font-bold md:w-1/3 rounded-lg text-neutral-600 shadow-lg hover:-translate-y-1 duration-75 hover:bg-neutral-200"
            onClick={() => {
              passwordInputRef.current.value = "password";
              setShowPassword(true);
            }}
          >
            Đặt mật khẩu mặc định
          </button>
        </div>
      </form>
      {shortenedUrl ? (
        <>
          <hr />
          <h1 className="font-bold p-5 pb-0 text-neutral-800">Thành công!</h1>
          <div className="p-5">
            <p>URL rút gọn của bạn</p>
            <div className="flex my-3 p-2.5 rounded-md w-full outline outline-1 outline-stone-400 focus:outline-blue-200">
              <input
                type="url"
                name="url"
                ref={shortenedUrlRef}
                onChange={(e) => setUrl(e.target.value)}
                value={shortenedUrl}
                className="w-full focus:outline-none cursor-text"
                disabled
              />
              <button
                type="button"
                className="hover:text-blue-500 font-bold duration-100 px-2"
                onClick={handleOnCopy}
              >
                COPY
              </button>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}

export default CreateUrlCard;
