import { CartItemType } from "../../app/cartSlice";
import axios from "axios";
import { useAppDispatch } from "../../hooks/reduxHook";

import { removeItem } from "../../app/cartSlice";

interface CartItemProps {
  item: CartItemType;
}

const CartItem = ({
  item,
}: CartItemProps) => {
  const dispatch = useAppDispatch();

  const img: string = new URL(`${item.imgUrl}`, import.meta.url).href;

  const lineTotal: number = item.qty * item.price;

  const onRemoveFromCart = async () => {
    // dispatch({ type: REDUCER_ACTIONS.REMOVE, payload: item });

    dispatch(removeItem(item))
    await axios.delete(`/api/v1/carts/${item._id}`);
  };

  const content = (
    <li className="cartItem">
      <img src={img} alt={item.name} className="cart__img" />
      <div aria-label="Item name">{item.name}</div>
      <div className="itemAmount">Quantity: {item.qty}</div>
      {/* <div aria-label="Price per item">
        {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(item.price)}
      </div> */}
      {/* <label htmlFor="itemQty" className="offscreen">
        Item Quantity
      </label> */}
      {/* <select
        name="itemQty"
        id="itemQty"
        className="cart__select"
        value={item.qty}
        aria-label="Item quantity"
        onChange={onChangeQty}
      >
        {options}
      </select> */}
      <div className="cart__item-subtotal" aria-label="Line item subtotal">
        total:{" "}
        {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(lineTotal)}
      </div>
      <button
        className="button-6"
        aria-label="Remove item from cart"
        title="Remove item from cart"
        onClick={onRemoveFromCart}
      >
        Remove
      </button>
    </li>
  );
  return content;
};

export default CartItem;
