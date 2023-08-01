import React from 'react'
import Info from "./Card/Info";
import AppContext from '../context';
import axios from 'axios';

function Drawer({ onClose, onRemove, items = [] }) {
    const { cartItems, setCartItems } = React.useContext(AppContext)
    const [isOrderComplete, setIsOrderComplete] = React.useState(false);
    const [orderId, setOrderId] = React.useState(null)
    const [isLoading, setIsLoading] = React.useState(false)

    const onClickOrder = async () => {
        try {
            setIsLoading(true)
            const { data } = await axios.post('https://64c68a900a25021fde91bf23.mockapi.io/orders', { items: cartItems, })
            setOrderId(data.id)
            setIsOrderComplete(true)
            setCartItems([]);

            for (let i = 0; i < Array.length; i++) {
                const item = cartItems[i]
                await axios.delete('https://64c225eafa35860baea14113.mockapi.io/cart' + item.id)
            }
        } catch (error) {
            alert('Bestellumg fehlgeschlagen')
        }
        setIsLoading(false)
    }
    return (
        <div className="overlay">
            <div className="drawer">
                <h2 className="shoppingCart">
                    Warenkorb
                    <img className="removeBtn" src="/img/btn-remove.svg" alt="close" onClick={onClose} />

                </h2>

                {items.length > 0 ? <div className="items">
                    {items.map((v) => (

                        <div key={v.id} className="cart-item">
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
                        <button className="greenBtn" disabled={isLoading} onClick={onClickOrder}>
                            Bestellung abschließen
                            <img src="/img/arrow.svg" alt="arrow"></img>
                        </button>
                    </div>
                </div>
                    : (
                        <Info
                            title={isOrderComplete ? "Bestellung eingegangen" : "Warenkorb leer"}
                            description={isOrderComplete ? `Bestellung Nr.: ${orderId} ist bei uns eingegangen` : "Fügen Sie paar Sneakers hinzu"}
                            image={isOrderComplete ? "/img/complete-order.jpg" : "/img/empty-cart.jpg"}
                        />
                    )
                }


            </div>
        </div>
    )
}
export default Drawer;