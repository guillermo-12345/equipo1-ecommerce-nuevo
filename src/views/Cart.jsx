import { useContext } from "react";
import { Link } from "react-router-dom";
import  {CartContext}  from "../context/cartContext";
import CartItem from "../components/CartItem/CartItem";

export const Cart =()=> {

    const {cart, clearCart, totalQuantity, total, removeItem} = useContext(CartContext);
     if(totalQuantity===0) {
        return (
            <div>
            <h1>No hay productos en el carrito</h1>
        </div>
        )}

        const handleRemoveItem = (itemId) => {
            removeItem(itemId);
        }
    return (
    <div>
       <h2>Resumen de tu compra</h2>
            {cart.map(p =>  <CartItem key={p.id}{...p} handleRemoveItem={handleRemoveItem}/>)}
       
        <h3>Total: ${total}</h3>
        <div>
        
            <button onClick={()=>clearCart()} className="m-5 btn btn-close-white btn-outline-secondary">Limpiar carrito</button>
            <Link to={'/checkout'} className="btn btn-light  m-5">CheckOut</Link>
        </div>
    </div>
    )
}