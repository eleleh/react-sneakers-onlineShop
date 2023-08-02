import { Link } from "react-router-dom";
import React from 'react'
import { useCart } from "../hooks/useCart";

function Header(props) {

  const { totalPrice } = useCart()
  const isTotalPriceOver0 = totalPrice > 0

  return (
    <header>

      <div className='headerLeft'>
        <Link to="/" >
          <img
            className="img-logo" src="/img/logo.png" width={60} height={60} />
        </Link>
        <div className='headerInfo'>
          <h3> React Sneakers</h3>
          <p>Die besten Sneakers findest du bei uns</p>
        </div>
      </div>

      <div className="headerRight">
        <ul >
          <li>
            <img
              width={18}
              height={18}
              src="/img/cart.svg"
              alt="cart"
              onClick={props.onClickCart}
            />
            {isTotalPriceOver0 &&
              <span>{totalPrice} €</span>}
          </li>
          <li>
            <Link to="/favorites">
              <img width={18} height={18} src="/img/heart.svg" alt="favorite" />
            </Link>
          </li>
          <li>
            <Link to="/orders">
              <img width={18} height={18} src="/img/user.svg" alt="user" />
            </Link>
          </li>
        </ul>
      </div >
    </header >
  )
}

export default Header;