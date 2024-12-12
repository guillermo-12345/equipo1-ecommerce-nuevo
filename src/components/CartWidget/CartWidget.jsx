import React,{ useContext } from 'react';
import  {CartContext}  from "../../context/cartContext"
import { Link } from 'react-router-dom';


const CartWidget = ()=> {
    const { totalQuantity } = useContext(CartContext)
  return (
    <Link
      to='/cart'
      className="bd-blue-100 rounded-5 text-lg-end mt-1 p-2"
      
    >
      <><span className="rounded-1 p-1 m-1 bg-body-tertiary">🛒 {totalQuantity}</span></>
    </Link>
    
  );
};

export default CartWidget;