import { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink,Link } from 'react-router-dom';
import { NavDropdown } from 'react-bootstrap';

function NavigationBar() {
  return (
    <Navbar className="bg-danger-subtle" expand="lg">
      <Container>
        <Navbar.Brand className = "fs-3"as={Link} to="/" >UdeBank</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">


          <Nav className="me-auto">
            <NavDropdown title="Clientes" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/clientes">
              Clientes
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/consultaClientes">
              Consultar Clientes
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Tranferencias" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/Transferir">
              Tranferir
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/ConsultarTransferencias">
              Consultar historico
              </NavDropdown.Item>
            </NavDropdown>
            </Nav>

            <Navbar.Text className="text-black fs-3 ">
                        El banco de la gente
                    </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;