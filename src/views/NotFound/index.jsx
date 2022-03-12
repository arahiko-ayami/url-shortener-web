import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="py-5 flex flex-col items-center justify-center space-y-5">
      <div>
        <h1 className="font-bold pt-24 text-neutral-800 text-center text-5xl underline decoration-blue-500 underline-offset-4">
          URL Now
        </h1>
        <h2 className="p-5 text-neutral-500 text-center text-2xl">
          Trang bạn đang tìm kiếm không tồn tại
        </h2>
      </div>
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

export default NotFound;
