function Drawer(props) {
    return (
        <div  className="overlay">
            <div className="drawer">
                <h2 className="shoppingCart">
                    Warenkorb
                    <img className="removeBtn" src="/img/btn-remove.svg" alt="close" onClick={props.onCloseCart}/>

                </h2>
                <div className="items">
                    <div className="cart-item">
                        <div className="cart-item-img"
                            style={{ backgroundImage: 'url(/img/sneakers/1.jpg)' }}>

                        </div>

                        <div className="cart-item-text">
                            <p>Männerschuhe Nike Blazer Mid Suede</p>
                            <b>95,95 €</b>
                        </div>
                        <img className="removeBtn" src="/img/btn-remove.svg" alt="remove" />
                    </div>
                </div>
                <div>
                    <ul className="cartTotalBlock">
                        <li>
                            <span>Summe</span>
                            <b>200 €</b>
                        </li>
                        <li>
                            <span>Mehrwertsteuer 19%</span>
                            <b>40 €</b>
                        </li>
                    </ul>
                    <button className="greenBtn">
                        Bestellung abschließen
                        <img src="/img/arrow.svg" alt="arrow"></img>
                    </button>
                </div>
            </div>
        </div>
    )
}
export default Drawer;