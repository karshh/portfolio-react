import { Container, Nav, Navbar } from 'react-bootstrap'
import './NavBar.scss'

const NavBar = (): JSX.Element => {
  return (
    <Navbar>
      <Container>
        <Navbar.Brand>usharma</Navbar.Brand>
        <Nav>
          <Nav.Link href="/home">Home</Nav.Link>
          <Nav.Link href="/news">News</Nav.Link>
          <Nav.Link href="/sait">Sait</Nav.Link>
          <Nav.Link href="/contact">Contact</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  )
}

export default NavBar
