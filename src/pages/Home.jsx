import Card from '../components/Card';

function Home({ items, cartItems, searchValue, setSearchValue, onChangeSearchInput, onAddToCart, onAddToFavorite }) {
    return (
        <div className="content">
            <div className="contentHeader">
                <h1>{searchValue ? `Suche nach: "${searchValue}"` : " Alle Sneakers"}</h1>
                <div className="search-block">
                    <img src="/img/search.svg" alt="Search" />
                    <input onChange={onChangeSearchInput} value={searchValue} placeholder="Suche..." />
                    {searchValue &&
                        <img
                            className="removeBtn"
                            src="/img/btn-remove.svg"
                            alt="remove"
                            onClick={() => setSearchValue("")} />
                    }
                </div>
            </div>
            <div className="sneakers">
                {items
                    .filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase()))
                    .map((item, index) => (
                        <Card
                            key={index}
                            onAddToFavorite={(obj) => onAddToFavorite(obj)}
                            onClickPlus={(obj) => onAddToCart(obj)} 
                            {...item}
                            />
                    ))
                }
            </div>
        </div>
    )
}
export default Home;