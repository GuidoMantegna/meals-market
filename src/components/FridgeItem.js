import { Fragment } from 'react';
import FoodIcon from '../images/food-icon.png';
import Ice from '../images/left-bottom-ice.png'

function FridgeItem ( {item, qty, onClick, id} ) {

    return (
        <Fragment>
            <div className="fridge-item-container" data-id={id}  onClick={onClick}>
                <div className="food-pic-container">
                    <img className="food-pic" src={FoodIcon}></img>
                </div>
                <div className="item-info">
                    <h5>{item} x <span className="fridge-item-qty">{qty}</span></h5>
                </div>
                <div className="change-item">
                    <i className="bi bi-pencil" data-action="edit"></i>
                    <i className="bi bi-trash" data-action="delete"></i>
                </div>
                <img className="ice-pic" src={Ice}></img>
                <div className="edit-panel" data-id={id}>
                    <h5>{item}</h5>
                    <p className="item-qty">
                        <i className="bi bi-dash-circle less-item" id="less-item" data-action="select-qty"></i>
                        <span className="qty" id="item-qty">{qty}</span>
                        <i className="bi bi-plus-circle plus-item" id="plus-item" data-action="select-qty"></i>
                    </p>
                    <i className="bi bi-cart-check" data-action="add-new-qty" id="add-new-qty"></i>
                    <i className="bi bi-x-circle" data-action="close-edit-panel" id="close-edit-panel"></i>
                </div>
            </div>
        </Fragment>
    )
};

export default FridgeItem;