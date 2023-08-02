
import Home from './pages/Home';
import Header from './components/Header';
import Drawer from './components/Drawer';
import React from 'react';
import axios from 'axios';
import { Route, Routes } from 'react-router-dom';
import Favorites from './pages/Favorites';
import AppContext from './context';
import { Orders } from './pages/Orders';

function App() {

  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");
  const [cartOpened, setCartOpened] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true)


  React.useEffect(() => {
    async function fetchData() {
      try {

        setIsLoading(true)

        const cartResponse = await axios.get('https://64c225eafa35860baea14113.mockapi.io/cart')
        const favoritesResponse = await axios.get('https://64c68a900a25021fde91bf23.mockapi.io/Favorites')
        const itemsResponse = await axios.get('https://64c225eafa35860baea14113.mockapi.io/items')

        setIsLoading(false)

        setCartItems(cartResponse.data);
        setFavorites(favoritesResponse.data);
        setItems(itemsResponse.data);

      } catch (error) {
        alert('Fehler beim LAden der Daten')
      }
    }
    fetchData();
  }, []);


  const onAddToCart = async (obj) => {
    const findItem = cartItems.find((item) => Number(item.parentID) === Number(obj.id))
    try {
      if (findItem) {
        setCartItems(prev => prev.filter(cartIt => Number(cartIt.parentID) !== Number(obj.id)))
        await axios.delete(`https://64c225eafa35860baea14113.mockapi.io/cart/${findItem.id}`);
      }
      else {
        setCartItems(prev => [...prev, obj]);
        const { data } = await axios.post('https://64c225eafa35860baea14113.mockapi.io/cart', obj)
        setCartItems((prev) => prev.map(item => {
          if (item.parentID === data.parentID) {
            return {
              ...item,
              id: data.id
            }
          }
          return item
        }))
      }

    } catch (error) {
      alert('Der Artikel konnte nicht hinzugefuegt werden')
    }
  };

  const onRemoveItem = async (id) => {
    try {
      setCartItems(prev => prev.filter((item) => Number(item.id) !== Number(id)));
      await axios.delete(`https://64c225eafa35860baea14113.mockapi.io/cart/${id}`);

    } catch (error) {
      alert('Der Artikel konnte nicht aus Warenkorb entfernt werden')
    }
  };

  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find((favObj) => Number(favObj.id) === Number(obj.id))) {
        setFavorites(prev => prev.filter(cartIt => Number(cartIt.id) !== Number(obj.id)))
        await axios.delete(`https://64c68a900a25021fde91bf23.mockapi.io/Favorites/${obj.id}`)
      }
      else {
        setFavorites((prev) => [...prev, data])
        const { data } = await axios.post('https://64c68a900a25021fde91bf23.mockapi.io/Favorites', obj,)
      }

    } catch (error) {
      alert('Der Artikel konnte nicht favorisiert werden')
    }
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  const isItemAdded = (id) => {
    return cartItems.some(obj => Number(obj.parentID) === Number(id))
  }

  return (
    <AppContext.Provider value={{ items, cartItems, favorites, isItemAdded, onAddToFavorite, setCartOpened, setCartItems }}>
      <div className="wrapper">

        <Drawer
          items={cartItems}
          onClose={() => setCartOpened(false)}
          onRemove={onRemoveItem}
          opened={cartOpened}
        />

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
              <Favorites />}
            exact
          />
          <Route
            path='/orders'
            element={
              <Orders />}
            exact
          />

        </Routes>
      </div>
    </AppContext.Provider>
  );
};

export default App;

