import Container  from "react-bootstrap/Container";
import Nav        from "react-bootstrap/Nav";
import Navbar     from "react-bootstrap/Navbar";
import Link from "next/link";
import { usePathname } from 'next/navigation'


const menuLinks = [
  { title: "Home",       path: "/" },
  { title: "Students",   path: "/students" },
  { title: "Promotions",   path: "/promotions" },
  { title: "Attendance", path: "/attendance" },
  { title: "Ranks",      path: "/ranks" },
  { title: "Classes",    path: "/schedule" },
  { title: "About",      path: "/about" },
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
    <Navbar fixed="top" expand="sm" className="navbar navbar-header navbar-light bg-light">
      <Container fluid>
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
