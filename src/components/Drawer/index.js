import React from 'react'
import Info from "./Info";
import axios from 'axios';
import { useCart } from '../../hooks/useCart';
import styles from './Drawer.module.css'

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

function Drawer({ onClose, onRemove, items = [], opened }) {
    const { cartItems, setCartItems, totalPrice } = useCart()
    const [isOrderComplete, setIsOrderComplete] = React.useState(false);
    const [orderId, setOrderId] = React.useState(null)
    const [isLoading, setIsLoading] = React.useState(false)

    const onClickOrder = async () => {
        try {
            setIsLoading(true)
            const { data } = await axios.post('https://64c68a900a25021fde91bf23.mockapi.io/orders', { items: cartItems })
            setOrderId(data.id)
            setIsOrderComplete(true)
            setCartItems([]);

            for (let i = 0; i < cartItems.length; i++) {
                const item = cartItems[i]
                await axios.delete('https://64c225eafa35860baea14113.mockapi.io/cart' + item.id)
                await delay(1000)
            }
        } catch (error) {
            alert('Fehler bei Uebergabe der Bestellungsdaten')
        }
        setIsLoading(false)
    }
    return (
        <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ""}`}>
            <div className={styles.drawer}>
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
                                <b>{totalPrice} €</b>
                            </li>
                            <li>
                                <span>Mehrwertsteuer 19%</span>
                                <b>{totalPrice / 100 * 19} €</b>
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