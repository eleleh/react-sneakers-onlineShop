

function Header(){
    return(
        <header>
        <div className='headerLeft'>
          <img
            className="img-logo" src="/img/logo.png" width={60} height={60} />
          <div className='headerInfo'>
            <h3> React Sneakers</h3>
            <p>Die besten Sneakers findest du bei uns</p>
          </div>
        </div>
        <div className="headerRight">
          <ul >
            <li>
              <img width={18} height={18} src="/img/cart.svg
              "/>
              <span>193,67 €</span>
            </li>
            <li className="icons">
              <img width={18} height={18} src="/img/heart.svg" />
              <img width={18} height={18} src="/img/user.svg
              "/>
            </li>
          </ul>
        </div>
      </header>
    )
}

export default Header;