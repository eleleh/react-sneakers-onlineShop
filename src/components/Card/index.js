import styles from './Card.module.css';
import React, { useEffect } from 'react';

function Card(props) {

    const [isAdded, setIsAdded] = React.useState(false);

    const handlePlusClick = () => {
        setIsAdded(!isAdded);
    }

    React.useEffect(() => {
        console.log("change detected")
    },[isAdded]);

    return (


        <div className={styles.card}>
            <div className={styles.favorite} onClick={props.onClickFavorite}>
                <img src="/img/unliked.svg" alt="Unliked" />
            </div>

            <img width={133} height={112} src={props.imageURL} alt="Sneakers" />
            <h5>{props.title}</h5>
            <div className={styles.cardInfo}>
                <div className={styles.priceInfo}>
                    <span> Preis: </span>
                    <b>{props.price} €</b>
                </div>

                <img
                    className={styles.plus}
                    onClick={handlePlusClick}
                    src={isAdded ? 'img/btn-checked.svg' : 'img/btn-plus.svg'}
                    alt="plusbutton" />

            </div>
        </div>)

}

export default Card;