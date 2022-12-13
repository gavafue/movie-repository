import Navbar from "./Navbar";
import Footer from "./Footer";
import { Container } from "react-bootstrap";

const Layout = ({ children, user }) => {
  return (
    <>
      <Navbar user={user} />
      <Container style={{ overflow: "auto" }}>{children}</Container>
      <Footer />
    </>
  );
};

export default Layout;
