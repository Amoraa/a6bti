import React from 'react'
import { useRouter } from 'next/router'
import { useState } from 'react';
import { Navbar, Nav, Form , Button } from 'react-bootstrap';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {Container} from 'react-bootstrap';
import Link from 'next/link';
import { useAtom } from "jotai";
import { searchHistoryAtom } from '@/store'
import { addToHistory } from '@/lib/userDate';
import { readToken, removeToken } from "../lib/authenticate";


export default function MainNav() {
    const [search, setValue] = useState(); 
    const router = useRouter();
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
    let token = readToken();
    function logout() {
      removeToken();
      setExpanded(false)
      router.push("/login");
    }
  
    const [isExpanded, setExpanded] = useState(false); 
  console.log(isExpanded)
    async function submitForm(e) 
    {
        e.preventDefault(); // prevent the browser from automatically submitting the form
        setExpanded(false)
        setSearchHistory(await addToHistory(`title=true&q=${search}`))
        router.push(`/artwork?title=true&q=${search}`)
    }
    return (<>
        <Navbar bg="primary" expand="lg" className='fixed-top navbar-dark' expanded={isExpanded}>
          <Container>
            <Navbar.Brand >Tatiana Kashcheeva</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={()=>{setExpanded(!isExpanded)}}/>
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                
                <Link href="/" legacyBehavior  passHref><Nav.Link active={router.pathname === "/"} onClick={()=>{setExpanded(false)}}>Home</Nav.Link></Link>
                {token && <Link href="/search" legacyBehavior  passHref><Nav.Link active={router.pathname === "/search"}  onClick={()=>{setExpanded(false)}}>Advanced Search</Nav.Link></Link>}
                {token && <Link href="/like" legacyBehavior  passHref><Nav.Link active={router.pathname === "/like"} onClick={()=>{setExpanded(false)}}>Liked Artworks</Nav.Link></Link>}
              </Nav>
              &nbsp;
              {token && <Form className="d-flex" onSubmit={submitForm}>
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              onChange={e => { setValue(e.currentTarget.value); }}
              aria-label="Search" id ='search'/>
              
            <Button variant="outline-success" type='submit'>Search</Button>
           
                
          </Form>}
          &nbsp;
          <Nav> 
          {token && <NavDropdown title={token.userName} id="basic-nav-dropdown">
              
              <Link href="/favourites" legacyBehavior  passHref><NavDropdown.Item onClick={()=>{setExpanded(false)}}>
                Favourites
              </NavDropdown.Item></Link>
              <Link href="/history" legacyBehavior  passHref><NavDropdown.Item   onClick={()=>{setExpanded(false)}}>
              Search History
              </NavDropdown.Item></Link>

              <NavDropdown.Item  onClick={logout}>
              Logout
              </NavDropdown.Item>
              
            </NavDropdown>}
            </Nav>
            </Navbar.Collapse>
            {!token &&<Nav>
         <Link href="/register" legacyBehavior  passHref><Nav.Link active={router.pathname === "/register"}  onClick={()=>{setExpanded(false)}}>Register</Nav.Link></Link>
       <Link href="/login" legacyBehavior  passHref><Nav.Link active={router.pathname === "/login"}  onClick={()=>{setExpanded(false)}}>Log In</Nav.Link></Link>
        </Nav>}
          </Container>
        </Navbar>
        <br /><br />
        
        </>
      );
}
