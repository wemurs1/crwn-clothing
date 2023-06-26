import { CartItemModel } from '../../models/cart-item';
import {
  CartItemContainer,
  ItemDetails,
  Name,
  Price,
} from './cart-item.styles';

interface Props {
  cartItem: CartItemModel;
}

const CartItem = ({ cartItem }: Props) => {
  const { name, quantity, imageUrl, price } = cartItem;

  return (
    <CartItemContainer>
      <img src={imageUrl} alt={name} />
      <ItemDetails>
        <Name>{name}</Name>
        <Price>
          {quantity} x {price}
        </Price>
      </ItemDetails>
    </CartItemContainer>
  );
};

export default CartItem;
