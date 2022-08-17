import { Fragment } from 'react';
import React, { useState, useEffect } from 'react';
// import TipItem from '../../components/TipItem'
// import TipCard from '../../components/TipCard'

function FoodFacts () {

    let allProducts = [];

    const getApiData = async (url) => {
        try {
            const req = await fetch(url);
            const res = await req.json();
            allProducts = res.meals.filter(item => item.strDescription !== null);
        } catch (error) {
            console.error(error)
        }
    }

    getApiData('https://www.themealdb.com/api/json/v1/1/list.php?i=list');

    const [filteredData, setFilteredData] = useState([]);
    const [cardInfo, setCardInfo] = useState({product:'', info:''});

    const search = () => {
        const searchTab = document.getElementById('market-search-tab');
        let search = searchTab.value.toLowerCase();

        if(search === '') {
            searchTab.placeholder = "Type what you want to search";
        } else {
            setFilteredData(allProducts.filter(item => item.strIngredient.toLowerCase().includes(search)));
            searchTab.placeholder = "Search for your products";
            searchTab.value = '';  
        }         
    }; 

    function handleTipsClicks (e) {
        const action = e.target.dataset.action;
        const searchResults = document.querySelector('.tips-search-results');

        if (action === 'search') {
            search()
        };

        if (action === 'show-products') {
            let status = searchResults.style.display;

            if(status === 'none' && filteredData.length > 0) {
                searchResults.style.display = 'block';
            } else {
                searchResults.style.display = 'none'; 
            };
        };

        if (action === 'print-info') {
            
            let info = e.target.dataset.info;
            let product = e.target.innerText;

            setCardInfo({
                product,
                info             
            })

            searchResults.style.display = 'none';            
        };
    };

    useEffect(() => {
        const dropdownBtn = document.getElementById('dropdown-btn');

        if(filteredData.length > 0) {
            dropdownBtn.innerText = `Click and pick data of ${filteredData.length} different products ↓`;
            dropdownBtn.classList.remove('btn-danger')
            dropdownBtn.classList.add('btn-success')
        } else {
            dropdownBtn.innerText = `Search tips of your favourite food ↑`
        }
    });

    return (
        <Fragment>
            <div className="page-title-container">
                <h2 className="page-title"><i className="bi bi-journal-bookmark ico-link"></i>- Tips</h2>
            </div>

            <div className="tips-header-container">
                <div className="small-title-container">
                    <h2 className="page-title"><i className="bi bi-journal-bookmark ico-link"></i>- Tips</h2>
                </div>
            </div>

            <div className="tips-search-container">
                <div className="tips-search">
                    <input type="text" placeholder="Search for your products" id="market-search-tab"/>
                    <i className="bi bi-search" data-action="search" onClick={handleTipsClicks}></i>
                </div>
                <button 
                    type="button" 
                    className="btn btn-danger" 
                    id="dropdown-btn" 
                    data-action="show-products" 
                    onClick={handleTipsClicks}>
                </button>
            </div>          

            {/* <div className="tips-content">
                <ul className="tips-search-results">
                    {filteredData.map(item => {
                        return(
                            <TipItem
                                key={item.idIngredient} 
                                id={item.idIngredient} 
                                product={item.strIngredient}
                                info={item.strDescription}
                                onClick={handleTipsClicks}
                            />)
                    })}                
                </ul>

                <TipCard 
                    onClick={handleTipsClicks}
                    product={cardInfo.product || 'Find amazing tips!'} 
                    info={cardInfo.info || 'Look into over 100 items and fill your fridge'}/>
            </div>  */}
            
        </Fragment>
        
    )
};

export default FoodFacts;