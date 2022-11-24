import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { CartContext } from '../../contexts/cart.context';

import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';

import {CartDropdownContainer, EmptyMessage, CartItems} from './cart-dropdown.styles';

const CartDropdown = () => {
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  const goToCheckout = () => {
    navigate('/checkout');
  };

  return(
    <CartDropdownContainer>
      <CartItems>
        {/* mapping through the items added to the cart */}
        { cartItems.length ? ( // if cartItems is not empty
          cartItems.map((item) => <CartItem cartItem={item} key={item.id} />)
          ) : ( // if cartItems is empty
            <EmptyMessage>Your cart is empty</EmptyMessage>
          )}
        <Button onClick={goToCheckout}>GO TO CHECKOUT</Button>
      </CartItems>
    </CartDropdownContainer>
  );
};

export default CartDropdown;
