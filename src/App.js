import Card from './components/Card';
import Header from './components/Header';
import Drawer from './components/Drawer';
import React from 'react';

function App() {

  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [cartOpened, setCartOpened] = React.useState(false);

  React.useEffect(() => {

    fetch('https://64c225eafa35860baea14113.mockapi.io/items')
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        setItems(json);
      });
  }, []);


  const onAddToCart = (obj) => {
    setCartItems(prev => [...prev, obj]);
  };

  return (
    <div className="wrapper">
      {cartOpened &&
        <Drawer
          items={cartItems}
          onCloseCart={() => setCartOpened(false)}
        />}
      <Header
        onClickCart={() => setCartOpened(true)}

      />
      <div className="content">
        <div className="contentHeader">
          <h1>Alle Sneakers</h1>
          <div className="search-block">
            <img src="/img/search.svg" alt="Search" />
            <input placeholder="Suche..." />
          </div>
        </div>
        <div className="sneakers">
          {items.map((v) => (
            <Card
              title={v.title}
              price={v.price}
              imageURL={v.imageURL}
              onClickFavorite={() => console.log("cheburek")}
              onClickPlus={(obj) => onAddToCart(obj)} />
          ))
          }
        </div>
      </div>
    </div>
  );
}

export default App;

