import Hall from "../../components/Hall/Hall";
import CreateOrder from "../../components/CreateOrder/CreateOrder";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <Hall />
      <CreateOrder />
    </div>
  );
};

export default Home;
