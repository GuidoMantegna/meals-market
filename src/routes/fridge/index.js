import { Fragment } from 'react';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FridgeContain from '../../components/FridgeContain';

function Fridge () {

    let allProductsInDB = [];   
    const [fridge, setFridge] = useState([]);
    let db;
    
    let dbReq = indexedDB.open('myFridge', 1);

    // CREATE THE OBJECT STORE
    dbReq.onupgradeneeded = function(event) {
        db = event.target.result;
        let cart = db.createObjectStore('cart', {keyPath: 'idIngredient'});
    };

    // RELOAD THE DB
    dbReq.onsuccess = function(event) {
        db = event.target.result;
        getAndDisplayItems(db);
    };
    dbReq.onerror = function(event) {
        console.error('error opening database ' + event.target.errorCode);
    };

    // READ THE DB
    const getAndDisplayItems = (db) => {
        let tx = db.transaction(['cart'], 'readonly');
        let store = tx.objectStore('cart');
        let req = store.openCursor();

        req.onsuccess = function(event) {
          let cursor = event.target.result;
          if (cursor != null) {
            allProductsInDB.push(cursor.value);
            cursor.continue();
          } else {
            // If we have a null cursor, it means we've gotten
            // all the items in the store, so display the notes we got
          };                 
        };
        req.onerror = function(event) {
          alert('error in cursor request ' + event.target.errorCode);
        };
    };

    // UPDATE DATA FROM THE DB
    const updateData = (data) => {
        const transaction = db.transaction(['cart'], 'readwrite');
        const objectStore = transaction.objectStore('cart');  
        const request = objectStore.put(data)
    
        request.onsuccess = () => {    
            getAndDisplayItems(db);           
        };     
    };

    // DELETE DATA FROM THE DB
    const deleteData = (key) => {
        const transaction = db.transaction(['cart'], 'readwrite');
        const objectStore = transaction.objectStore('cart');
        const request = objectStore.delete(key);
    
        request.onsuccess = () => {          
            getAndDisplayItems(db)            
        }; 
    };

    const selectQty = e => {
        if (e.target.id === 'plus-item') {
            e.target.previousSibling.innerText++;
        }
        if (e.target.id === 'less-item' && e.target.nextSibling.innerText > 0) {
            e.target.nextSibling.innerText--;
        }
    }

    // ALL FRIDGE CLICKS HANDLERS
    const handleFridgeClicks = (e) => {
        const fridgeItems = Array.from(document.querySelectorAll('.fridge-item-container')),
        editPanels = Array.from(document.querySelectorAll('.edit-panel')),
        action = e.target.dataset.action,
        selectedId = parseInt(e.target.offsetParent.dataset.id),
        addNewQtyBtn = e.target.offsetParent.childNodes[2],
        closePanelBtn = e.target.offsetParent.lastChild;

        // DELETE FRIDGE ITEM
        if(action === 'delete') {
            setFridge(
                fridge.filter(item => item.idIngredient !== selectedId)
                );

            deleteData(selectedId)
        };

        // EDIT FRIDGE ITEM
        if(action === 'edit') {

            editPanels.forEach(panel => {
                if(panel.dataset.id == selectedId) {
                    panel.style.transform = "translateX(0)"
                }
            });
        }; 
        
        // SELECT QTY
        if (action === 'select-qty') {
            selectQty(e);

            const selectedItem = fridgeItems.filter(item => item.dataset.id == selectedId);
            const startQty = parseInt(selectedItem[0].childNodes[1].childNodes[0].childNodes[2].innerText);
            const currentQty = parseInt(e.target.offsetParent.childNodes[1].childNodes[1].innerText);
            
            editPanels.forEach(() => {
                if(currentQty !== startQty) {
                    addNewQtyBtn.style.display = 'block';
                    closePanelBtn.style.display = 'none';
                } else {
                    addNewQtyBtn.style.display = 'none';
                    closePanelBtn.style.display = 'block';
                }
            });
        }
        
        // ADD NEW QTY TO DB
        if(action === 'add-new-qty') {
            allProductsInDB = []

            let product = e.target.parentElement.firstChild.innerText;
            let qty = parseInt(e.target.parentElement.childNodes[1].childNodes[1].innerText);  
            let id = parseInt(e.target.parentElement.dataset.id);

            const data = {strIngredient: product, qty: qty, idIngredient: id};
            
            if(data.qty > 0) {
                updateData(data)
            };

            editPanels.forEach(() => {
                addNewQtyBtn.style.display = 'none';
                closePanelBtn.style.display = 'block';
            });
        }

        // CLOSE PANEL AND SET FRIDGE
        if(action === 'close-edit-panel') {

            setFridge(allProductsInDB);

            editPanels.forEach(panel => {
                if(panel.dataset.id == selectedId) {
                    panel.style.transform = "translateX(120%)"
                };
            });
        }
        
    };

    const handleDoorClicks = () => {
        const fridgeDoor = document.querySelector('.fridge-door'),
        linkIcon = document.querySelector('.fridge-link > i'),
        linkDesc = document.querySelector('.fridge-link > p'),
        doorStatus = linkIcon.classList[1];

        switch (doorStatus) {
            case "bi-door-open":
                fridgeDoor.style.transform = 'translateX(-150%)';
                linkIcon.classList.remove("bi-door-open");
                linkIcon.classList.add("bi-door-closed");
                linkDesc.innerText = "Close";   
                break;
            case "bi-door-closed":
                fridgeDoor.style.transform = 'translateX(0%)';
                linkIcon.classList.remove("bi-door-closed");
                linkIcon.classList.add("bi-door-open");
                linkDesc.innerText = "Open";  
                break;
        }

        setFridge(allProductsInDB)
    }

    return (
        <Fragment>
        
            <div className="page-title-container">
                <h2 className="page-title"><i className="bi bi-door-closed ico-link"></i>- Fridge</h2>
            </div>

            <div className="fridge-header-container">
                <div className="small-title-container">
                    <h2 className="small-title"><i className="bi bi-door-closed ico-link"></i>- Fridge</h2>
                </div>
                {/* MENU */}
                <div className="fridge-menu">
                    <div className="fridge-link" onClick={handleDoorClicks}>
                        <i className="bi bi-door-open" data-action='open-fridge'></i>
                        <p id="fridge-link-desc" data-action='open-fridge'>Open</p>
                    </div>
                    <Link to="/market" className="fridge-link link">
                        <i className="bi bi-shop"></i>
                        <p id="fridge-link-desc">Market</p> 
                    </Link>
                </div>
            </div>
                
            <div className="fridge-content">
                {/* DOOR */}
                <div className="fridge-door">
                    <div className="fridge-temperature">
                        <p>4°C<i className="bi bi-thermometer-low"></i></p>
                    </div>
                    <div className="fridge-post">
                        <p>- Open and choice what to eat!</p>
                    </div>
                </div>
                {/* CONTAIN */}
                <FridgeContain fridge={fridge} onClick={handleFridgeClicks}/>
            </div>
            
        </Fragment>
    )
};

export default Fridge;