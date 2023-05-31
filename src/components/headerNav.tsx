'use client';
import Link from 'next/link';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

export default function HeaderNav() {
  return (
    <Navbar collapseOnSelect bg='light' variant='light'>
      <Container>
        <Nav>
          <Nav.Item>
            <Link href='/' className='nav-link'>
              Home
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link href='/nba' className='nav-link'>
              NBA
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link href='/nfl' className='nav-link'>
              NFL
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link href='/mlb' className='nav-link'>
              MLB
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link href='/nhl' className='nav-link'>
              NHL
            </Link>
          </Nav.Item>
        </Nav>
        <Nav>
          <NavDropdown title='Account' id='sportsAppHeaderDropdown'>
            <NavDropdown.Item>
              <Link href='/sign-up' className='nav-link'>
                Sign Up
              </Link>
            </NavDropdown.Item>
            <NavDropdown.Item>
              <Link href='/login' className='nav-link'>
                Login
              </Link>
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Container>
    </Navbar>
  );
}
