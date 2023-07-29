import Card from './components/Card';
import Header from './components/Header';
import Drawer from './components/Drawer';
import React from 'react';
import axios from 'axios';

function App() {

  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");
  const [cartOpened, setCartOpened] = React.useState(false);

  React.useEffect(() => {
    axios.get('https://64c225eafa35860baea14113.mockapi.io/items').then(res => {
      setItems(res.data);
    });
    axios.get('https://64c225eafa35860baea14113.mockapi.io/cart').then(res => {
      setCartItems(res.data);
    });


  }, []);



  const onAddToCart = (obj) => {
    axios.post('https://64c225eafa35860baea14113.mockapi.io/cart', obj)
    setCartItems(prev => [...prev, obj]);
  };

  const onRemoveItem = (id) => {
    axios.delete(`https://64c225eafa35860baea14113.mockapi.io/cart/${id}`);
    setCartItems(prev => prev.filter((item) => item.id !== id));
  }

  const onAddToFavorite = (obj) => {
    setFavorites(prev => [...prev, obj])
  }

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  }

  return (
    <div className="wrapper">
      {cartOpened &&
        <Drawer
          items={cartItems}
          onCloseCart={() => setCartOpened(false)}
          onRemove={onRemoveItem}
        />}
      <Header
        onClickCart={() => setCartOpened(true)}

      />
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
                title={item.title}
                price={item.price}
                imageURL={item.imageURL}
                onClickFavorite={(obj) => onAddToFavorite(obj)}
                onClickPlus={(obj) => onAddToCart(obj)} />
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default App;

