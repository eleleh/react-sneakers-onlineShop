import { Link } from "react-router-dom";

function Header(props) {
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
            <span>193,67 €</span>
          </li>
          <li className="icons">
            <Link to="/favorites">
              <img width={18} height={18} src="/img/heart.svg" alt="favorite" />
            </Link>
            <img width={18} height={18} src="/img/user.svg" alt="user" />
          </li>
        </ul>
      </div >
    </header >
  )
}

export default Header;