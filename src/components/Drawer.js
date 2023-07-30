function Drawer({ onClose, onRemove, items = [] }) {
    return (
        <div className="overlay">
            <div className="drawer">
                <h2 className="shoppingCart">
                    Warenkorb
                    <img className="removeBtn" src="/img/btn-remove.svg" alt="close" onClick={onClose} />

                </h2>

                {items.length > 0 ? <div className="items">
                    {items.map((v) => (

                        <div className="cart-item">
                            <div className="cart-item-img"
                                style={{ backgroundImage: `url(${v.imageURL})` }}>

                            </div>

                            <div className="cart-item-text">
                                <p>{v.title}</p>
                                <b>{v.price} €</b>
                            </div>
                            <img
                                className="removeBtn"
                                src="/img/btn-remove.svg"
                                alt="remove"
                                onClick={() => onRemove(v.id)} />
                        </div>
                    ))}
                </div>
                    : <p>leer</p>
                }

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