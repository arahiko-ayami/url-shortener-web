import CreateUrlCard from "../../components/CreateUrlCard";

function CreateUrl() {
  return (
    <div className="h-full w-full py-5 md:h-screen md:w-screen flex flex-col space-y-5 justify-center items-center">
      <h1 className="font-bold text-5xl text-neutral-800 underline decoration-blue-500 underline-offset-4">
        URL Now
      </h1>
      <h2>
        Tạo link rút gọn{" "}
        <span className="underline decoration-blue-500 underline-offset-2 decoration-2">
          {" "}
          nhanh chóng{" "}
        </span>{" "}
        và{" "}
        <span className="underline decoration-blue-500 underline-offset-2 decoration-2">
          dễ dàng
        </span>
      </h2>
      <CreateUrlCard />
    </div>
  );
}

export default CreateUrl;
