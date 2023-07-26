import Card from './components/Card';
import Header from './components/Header';
import Drawer from './components/Drawer';
import React from 'react';

function App() {
  const [cartOpened, setCartOpened] = React.useState(false);
  const arr = [
    {
      title: "Männerschuhe Nike Blazer Mid Suede",
      price: "89,95",
      imageURL: "/img/sneakers/1.jpg"
    },
    {
      title: "Männerschuhe Nike Blazer Mid Suede",
      price: "99,95",
      imageURL: "/img/sneakers/2.jpg"
    },
    {
      title: "Männerschuhe Nike Blazer Mid Suede",
      price: "119,95",
      imageURL: "/img/sneakers/3.jpg"
    },
    {
      title: "Männerschuhe Nike Blazer Mid Suede",
      price: "69,95",
      imageURL: "/img/sneakers/4.jpg"
    }
  ]
  return (
    <div className="wrapper">
      {cartOpened &&
        <Drawer
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
          {arr.map((v) => (
            <Card
              title={v.title}
              price={v.price}
              imageURL={v.imageURL}
              onClickFavorite={() => console.log("cheburek")}
              onClickPlus={() => console.log("check")} />
          ))
          }
        </div>
      </div>
    </div>
  );
}

export default App;
