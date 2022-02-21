import { Navbar as BsNavbar, Nav, NavItem } from 'react-bootstrap';
import { logout, useGetAccountInfo } from '@elrondnetwork/dapp-core';

import { ReactComponent as ElrondLogo } from './../../../assets/img/elrond.svg';
import { Link } from 'react-router-dom';
import React from 'react';
import { dAppName } from 'config';
import { routeNames } from 'routes';

const Navbar = () => {
  const { address } = useGetAccountInfo();

  const handleLogout = () => {
    logout(`${window.location.origin}`);
  };

  const isLoggedIn = Boolean(address);

  return (
    <BsNavbar className='bg-white border-bottom px-4 py-3'>
      <div className='container-fluid'>
        <Link
          className='d-flex align-items-center navbar-brand mr-0'
          to={routeNames.home}
        >
          <ElrondLogo className='elrond-logo' />
          <span className='dapp-name text-muted'>{dAppName}</span>
        </Link>
        {isLoggedIn ? (
          <>
            <Link
              className='dapp-name text-muted d-flex align-items-center navbar-brand mr-0'
              to={routeNames.dashboard}
            >
              Dashboard
            </Link>
          </>
        ) : null}

        <Link
          className='dapp-name text-muted d-flex align-items-center navbar-brand mr-0'
          to={routeNames.info}
        >
          Info
        </Link>

        <Nav className='ml-auto'>
          {isLoggedIn && (
            <NavItem>
              <button className='btn btn-link' onClick={handleLogout}>
                Close
              </button>
            </NavItem>
          )}
        </Nav>
      </div>
    </BsNavbar>
  );
};

export default Navbar;
