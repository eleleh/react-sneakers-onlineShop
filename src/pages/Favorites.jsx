import Card from '../components/Card';

function Favorites({ items, onAddToFavorite}) {
    return (
        <div className="content">
            <h1>Meine Favoriten</h1>
            <div className="sneakers">
                {items.map((item, index) => (
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