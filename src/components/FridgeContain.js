import { Fragment } from 'react';
import FridgeItem from '../components/FridgeItem';

function FridgeContain ( {fridge, onClick} ) {
    if(fridge.length === 0) {
        return (
            <Fragment>
                <div className="empty-fridge">
                    <h2>Your fridge is empty :(</h2>
                </div>
            </Fragment>
        )
    } else {
        return (
            <Fragment>
                <ul className="fridge-list">
                    {fridge.map(item => {
                        return (
                        <FridgeItem 
                            key={item.idIngredient} 
                            id={item.idIngredient} 
                            item={item.strIngredient}
                            qty={item.qty}
                            onClick={onClick}/>)
                        })
                    }
                </ul>
            </Fragment>
        )
    }
};

export default FridgeContain;