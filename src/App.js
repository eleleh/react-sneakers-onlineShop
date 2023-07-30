
import Home from './pages/Home';
import Header from './components/Header';
import Drawer from './components/Drawer';
import React from 'react';
import axios from 'axios';
import { Route, Routes } from 'react-router-dom';
import Favorites from './pages/Favorites';

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
    axios.get('https://64c68a900a25021fde91bf23.mockapi.io/Favorites').then(res => {
      setFavorites(res.data);
    });
  }, []);



  const onAddToCart = (obj) => {
    axios.post('https://64c225eafa35860baea14113.mockapi.io/cart', obj)
    setCartItems(prev => [...prev, obj]);
  };

  const onRemoveItem = (id) => {
    axios.delete(`https://64c225eafa35860baea14113.mockapi.io/cart/${id}`);
    setCartItems(prev => prev.filter((item) => item.id !== id));
  };

  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find((favObj) => favObj.id === obj.id)) {
        axios.delete(`https://64c68a900a25021fde91bf23.mockapi.io/Favorites/${obj.id}`)
      }
      else {
        const { data } = await axios.post('https://64c68a900a25021fde91bf23.mockapi.io/Favorites', obj,)
        setFavorites((prev) => [...prev, data])
      }
    } catch (error) {
      alert('Favorisieren fehlgeschlagen')
      console.error(error)
    }
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <div className="wrapper">
      {cartOpened &&
        <Drawer
          items={cartItems}
          onClose={() => setCartOpened(false)}
          onRemove={onRemoveItem}
        />}

      <Header
        onClickCart={() => setCartOpened(true)} />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              items={items}
              cartItems={cartItems}
              searchValue={searchValue}
              onChangeSearchInput={onChangeSearchInput}
              setSearchValue={setSearchValue}
              onAddToCart={onAddToCart}
              onAddToFavorite={onAddToFavorite}
            />
          }
          exact
        />
        <Route
          path='/favorites'
          element={
            <Favorites items={favorites}
              onAddToFavorite={onAddToFavorite} />
          }
          exact

        />
      </Routes>
    </div>
  );
};

export default App;

