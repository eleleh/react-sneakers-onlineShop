import Card from './components/Card';
import Header from './components/Header';
import Drawer from './components/Drawer';

function App() {
  return (
    <div className="wrapper">
      <Drawer />
      <Header />
      <div className="content">
        <div className="contentHeader">
          <h1>Alle Sneakers</h1>
          <div className="search-block">
            <img src="/img/search.svg" alt="Search" />
            <input placeholder="Suche..." />
          </div>
        </div>
        <div className="sneakers">
          <Card />
          <Card />
          <Card/>
          <Card/>
          <Card/>


        </div>
      </div>
    </div>
  );
}

export default App;
