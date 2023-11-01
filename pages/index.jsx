import Loading from "../components/Loading/Loading";
import EnvError from "./error";

const Home = () => {
  if (
    process.env == {} ||
    !process.env.mongodb_password ||
    !process.env.mongodb_username
  ) {
    return <EnvError />;
  }

  return (
    <div>
      <Loading />
    </div>
  );
};

export default Home;
