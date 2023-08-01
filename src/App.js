
import Home from './pages/Home';
import Header from './components/Header';
import Drawer from './components/Drawer';
import React from 'react';
import axios from 'axios';
import { Route, Routes } from 'react-router-dom';
import Favorites from './pages/Favorites';
import AppContext from './context';

function App() {


  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");
  const [cartOpened, setCartOpened] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    async function fetchData() {

      setIsLoading(true)

      const cartResponse = await axios.get('https://64c225eafa35860baea14113.mockapi.io/cart')
      const favoritesResponse = await axios.get('https://64c68a900a25021fde91bf23.mockapi.io/Favorites')
      const itemsResponse = await axios.get('https://64c225eafa35860baea14113.mockapi.io/items')

      setIsLoading(false)

      setCartItems(cartResponse.data);
      setFavorites(favoritesResponse.data);
      setItems(itemsResponse.data);
    }
    fetchData();
  }, []);



  const onAddToCart = (obj) => {
    try {
      if (cartItems.find((item) => Number(item.id) === Number(obj.id))) {
        axios.delete(`https://64c225eafa35860baea14113.mockapi.io/cart/${obj.id}`);
        setCartItems(prev => prev.filter(cartIt => Number(cartIt.id) !== Number(obj.id)))
      }
      else {
        axios.post('https://64c225eafa35860baea14113.mockapi.io/cart', obj)
        setCartItems(prev => [...prev, obj]);
      }

    } catch (error) {

    }
  };

  const onRemoveItem = (id) => {
    axios.delete(`https://64c225eafa35860baea14113.mockapi.io/cart/${id}`);
    setCartItems(prev => prev.filter((item) => item.id !== id));
  };

  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find((favObj) => Number(favObj.id) === Number(obj.id))) {
        axios.delete(`https://64c68a900a25021fde91bf23.mockapi.io/Favorites/${obj.id}`)
        setFavorites(prev => prev.filter(cartIt => Number(cartIt.id) !== Number(obj.id)))
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

  const isItemAdded = (id) => {
    return cartItems.some(obj => Number(obj.id) === Number(id))
  }

  return (
    <AppContext.Provider value={{ items, cartItems, favorites, isItemAdded, onAddToFavorite, setCartOpened, setCartItems }}>
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
                isLoading={isLoading}
              />
            }
            exact
          />
          <Route
            path='/favorites'
            element={
              <Favorites onAddToFavorite={onAddToFavorite} />}
            exact

          />
        </Routes>
      </div>
    </AppContext.Provider>
  );
};

export default App;

