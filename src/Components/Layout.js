import Navbar from "./Navbar";
import Footer from "./Footer";
import { Container } from "react-bootstrap";

const Layout = ({ children, user }) => {
  return (
    <div
      style={{
        backgroundColor: "background-color: rgb(158 169 177 / 25%)",
      }}
    >
      <Navbar user={user} />
      <Container style={{ overflow: "auto" }}>{children}</Container>
      <Footer />
    </div>
  );
};

export default Layout;
