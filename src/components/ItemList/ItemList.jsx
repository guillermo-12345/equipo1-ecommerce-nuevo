import React from 'react';
import Item from '../Item/Item';

export const ItemList = ({ products }) => {
    return (
        <div className="container">
          <div className="d-flex justify-content-evenly flex-wrap">
            {products.map((prod) => (
                <Item key={prod.id} {...prod} />
            ))}
          </div>
        </div>
    );
};

export default ItemList;
