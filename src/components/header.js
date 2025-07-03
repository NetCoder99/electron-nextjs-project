import Container  from "react-bootstrap/Container";
import Nav        from "react-bootstrap/Nav";
import Navbar     from "react-bootstrap/Navbar";
import Link from "next/link";
import { usePathname } from 'next/navigation'


const menuLinks = [
  { title: "Home", path: "/" },
  { title: "Students", path: "/students" },
  { title: "Attendance", path: "/attendance" },
  { title: "Ranks", path: "/ranks" },
  { title: "Classes", path: "/classes" },
  { title: "About", path: "/about" },
];

const MenuItem = ({ title, path }) => {
  return (
    <Nav.Link as={Link} href={path} >
      {title}
    </Nav.Link>
  );
};

const Header = () => {
  return (
    <Navbar expand="sm" className="bg-body-tertiary navbar navbar-expand-lg navbar-light bg-light">
      <Container fluid>
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {menuLinks.map((item, index) => (
              <MenuItem {...item} key={index}></MenuItem>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
