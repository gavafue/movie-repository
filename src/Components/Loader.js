import { HashLoader } from "react-spinners";
const Loader = () => {
  return (
    <div
      style={{
        position: "fixed",
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ display: "flex" }}>
        <HashLoader color="#212529" size={100} />
      </div>
    </div>
  );
};

export default Loader;
