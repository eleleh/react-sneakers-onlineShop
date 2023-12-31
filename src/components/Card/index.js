import styles from './Card.module.css';
import React from 'react';
import ContentLoader from 'react-content-loader';
import AppContext from '../../context';

function Card({ id,
    title,
    imageURL,
    price,
    onAddToFavorite,
    onClickPlus,
    favorited = false,
    loading = false
}) {

    const { isItemAdded } = React.useContext(AppContext)
    const [isFavorite, setIsFavorite] = React.useState(favorited);

    const handlePlusClick = () => {
        onClickPlus({ id, parentID: id, title, price, imageURL });
    }

    const handleFavoriteClick = () => {
        onAddToFavorite({ id, parentID: id, title, price, imageURL })
        setIsFavorite(!isFavorite);
    }

    return (
        <div className={styles.card}>
            {loading ? (
                <ContentLoader
                    speed={2}
                    width={155}
                    height={250}
                    viewBox="0 0 155 265"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb">
                    <rect x="1" y="0" rx="10" ry="10" width="155" height="155" />
                    <rect x="0" y="167" rx="5" ry="5" width="155" height="15" />
                    <rect x="0" y="187" rx="5" ry="5" width="100" height="15" />
                    <rect x="1" y="234" rx="5" ry="5" width="80" height="25" />
                    <rect x="124" y="230" rx="10" ry="10" width="32" height="32" />
                </ContentLoader>
            )
                :
                (<>
                    <div className={styles.favorite} onClick={handleFavoriteClick}>
                        {onAddToFavorite && <img src={isFavorite ? 'img/liked.svg' : 'img/unliked.svg'} alt="Unliked" />}
                    </div>

                    <img width={133} height={112} src={imageURL} alt="Sneakers" />
                    <h5>{title}</h5>
                    <div className={styles.cardInfo}>
                        <div className={styles.priceInfo}>
                            <span> Preis: </span>
                            <b>{price} €</b>
                        </div>

                        {onClickPlus && <img
                            className={styles.plus}
                            onClick={handlePlusClick}
                            src={isItemAdded(id) ? 'img/btn-checked.svg' : 'img/btn-plus.svg'}
                            alt="plusbutton" />}

                    </div>
                </>)
            }
        </div>
    )
}

export default Card;