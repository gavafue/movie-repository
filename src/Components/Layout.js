import Header from "./Header";
import Footer from "./Footer";
import { Container } from "react-bootstrap";

const Layout = ({ children, user }) => {
  return (
    <>
      <Header user={user} />
      <Container>{children}</Container>
      <Footer />
    </>
  );
};

export default Layout;
