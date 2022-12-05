import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Routes = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token === "" || token === null) {
      navigate("/");
    }
  });

  return <h2>I'm routes</h2>;
};

export default Routes;
