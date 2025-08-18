import style from "./index.module.css";
export const CustomLoader = () => {
  return (
    <div className="absolute  h-screen flex justify-center items-center w-screen">
      <div className={`${style.loader1} ${style.loader}`}></div>
      <div className={`${style.loader2} ${style.loader}`}></div>
      <div className={`${style.loader3} ${style.loader}`}></div>
    </div>
  );
};
