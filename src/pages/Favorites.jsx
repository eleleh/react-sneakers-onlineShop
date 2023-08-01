import React from 'react';
import Card from '../components/Card';
import AppContext from '../context';

function Favorites() {
    const {favorites, onAddToFavorite} = React.useContext(AppContext)
    return (
        <div className="content">
            <h1>Meine Favoriten</h1>
            <div className="sneakers">
                {favorites.map((item, index) => (
                    <Card
                        key={index}
                        favorited={true}
                        onAddToFavorite={onAddToFavorite}
                        {...item}
                    />
                ))
                }
            </div>
        </div>
    )
}
export default Favorites;