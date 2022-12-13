import CustomerData from "../data/CustomerData";

const Home = () => {
  const data = CustomerData;
  return (
    <div>
      {data.map((x) => (
        <div>{x.name}</div>
      ))}
      {data.map((x) =>
        x.chores.map((x) => (
          <div>
            <div>{x.name}</div>
            <div>{x.description}</div>
          </div>
        )),
      )}
    </div>
  );
};

export default Home;
