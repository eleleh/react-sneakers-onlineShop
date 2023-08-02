import React from 'react';
import Card from '../components/Card';
import AppContext from '../context';
import axios from 'axios';

export function Orders() {

    const [orders, setOrders] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(true)

    React.useEffect(() => {
        (async () => {
          try {
            const { data } = await axios.get('https://64c68a900a25021fde91bf23.mockapi.io/orders');
            setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
            setIsLoading(false);
          } catch (error) {
            alert('Fehler beim Laden der Bestellungen');
            console.error(error);
          }
        })();
      }, []);
    

    //const { } = React.useContext(AppContext)
    return (
        <div className="content">
            <h1>Meine Bestellungen</h1>
            <div className="sneakers">
            {(isLoading ? [...Array(8)] : orders).map((item, index) => (
          <Card key={index} loading={isLoading} {...item} />
        ))}
            </div>
        </div>
    )
}