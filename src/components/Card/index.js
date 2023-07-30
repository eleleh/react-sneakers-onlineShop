import styles from './Card.module.css';
import React, { useEffect } from 'react';

function Card({ id, title, imageURL, price, onAddToFavorite, onClickPlus, favorited}) {

    const [isAdded, setIsAdded] = React.useState(false);
    const [isFavorite, setIsFavorite] = React.useState(favorited);

    const handlePlusClick = () => {
        onClickPlus({title, price, imageURL});
        setIsAdded(!isAdded);
    }

    const handleFavoriteClick =() =>{
        onAddToFavorite({id, title, price, imageURL})
        setIsFavorite(!isFavorite);
    }

    React.useEffect(() => {
        console.log("change detected")
    },[isAdded]);

    return (


        <div className={styles.card}>
            <div className={styles.favorite} onClick={handleFavoriteClick}>
                <img src={isFavorite? 'img/liked.svg' : 'img/unliked.svg'} alt="Unliked" />
            </div>

            <img width={133} height={112} src={imageURL} alt="Sneakers" />
            <h5>{title}</h5>
            <div className={styles.cardInfo}>
                <div className={styles.priceInfo}>
                    <span> Preis: </span>
                    <b>{price} €</b>
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