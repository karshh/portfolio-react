import { Container, Nav, Navbar } from 'react-bootstrap'
import './NavBar.scss'

const NavBar = (): JSX.Element => {
  return (
    <Navbar>
      <Container>
        <Navbar.Brand href="/">usharma</Navbar.Brand>
        <Nav>
          {
            ['Home', 'News', 'SAIT', 'Contact'].map((item, key) => (
              <Nav.Link key={key} href={'/' + item.toLowerCase()}>{item.toUpperCase()}</Nav.Link>)
            )
          }
        </Nav>
      </Container>
    </Navbar>
  )
}

export default NavBar
