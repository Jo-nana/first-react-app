import { Outlet, Link } from 'react-router-dom';

// fragment are using instead of a div principal parent element
import { Fragment, useContext } from 'react';

import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';


import { UserContext } from '../../contexts/user.context';
import { CartContext } from '../../contexts/cart.context';

import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import { signOutUser } from '../../utils/firebase/firebase.utils';



import { NavigationContainer, LogoContainer, NavLinks, NavLink } from'./navigation.styles.jsx';

// Navigation bar
const Navigation = () => {
  // Getting user from context
  const { currentUser } = useContext(UserContext);
  // getting cart hidden from context
  const { isCartOpen } = useContext(CartContext);

  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to='/'>
          <CrwnLogo className='logo' />
        </LogoContainer>
        <NavLinks>
          <NavLink to='/shop'> {/* Link works like anchor tag */}
            SHOP
          </NavLink>
          {currentUser ? ( // if user is logged in
              <NavLink as='span' onClick={signOutUser}>
                SIGN OUT
              </NavLink>
          ) : ( // if user is not logged in
              <NavLink to='/auth'>
                SIGN IN
              </NavLink>
          )}
          <CartIcon />
        </NavLinks>
        {isCartOpen && <CartDropdown />} {/* if cart is open, show cart dropdown */}
      </NavigationContainer>
      <Outlet />
    </Fragment>
  );
}

export default Navigation;
