import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navList = [
    {
      label: "Login/SignUp",
      navigateTo: "/auth",
      isLoggedIn: false,
    },
    {
      label: "Profile",
      navigateTo: "/profile",
      isLoggedIn: true,
    },
  ];

  //NOTE: get from Redux Store if the user is logged in or not , then show the Profile button accordingly
  const navigate = useNavigate();
  return (
    <div className="flex justify-between items-center bg-red-300 w-[95%] px-4">
      <div>ShortIt</div>
      <div>
        {navList.map((item) => {
          return (
            <div
              key={item.label}
              onClick={() => {
                navigate(item.navigateTo);
              }}
              style={{
                cursor: "pointer",
              }}
            >
              {item.label}
            </div>
          );
        })}
        {/* <Login />
        <SignUp /> */}
      </div>
    </div>
  );
};

export default Navbar;
