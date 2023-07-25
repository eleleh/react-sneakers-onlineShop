

function Card() {
    return (


        <div className="card">
            <div className="favorite">
                <img src="/img/unliked.svg" alt="Unliked" />
            </div>

            <img width={133} height={112} src="/img/sneakers/1.jpg" alt="Sneakers" />
            <h5>Männerschuhe Nike Blazer Mid Suede</h5>
            <div className="cardInfo">
                <div className="priceInfo">
                    <span> Preis: </span>
                    <b>89,95 €</b>
                </div>
                <button className="plusButton">
                    <img width={11} height={11} src="/img/plus.svg" alt="plusbutton" />
                </button>
            </div>
        </div>)

}

export default Card;