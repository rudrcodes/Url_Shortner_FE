import Header from "./Header/Header";
import UrlShortenArea from "./UrlShortenArea";

const HomePage = () => {
  return (
    <div className="flex justify-center items-center  h-[100vh] w-[100vw] gap-2    flex-col overflow-hidden">
      <Header />
      <UrlShortenArea />
    </div>
  );
};

export default HomePage;
