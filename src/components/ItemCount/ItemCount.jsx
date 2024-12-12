import { useState } from "react";
import './ItemCount.css';
import 'bootstrap';

const ItemCount=({stockDisponible,initial,onAdd})=>{
    const [counter, setCounter]=useState(initial)
   const handlerDecreaseCount=()=>{
      if(counter>0) setCounter(counter-1)
    }
    const handlerIncreaseCount=()=>{
      if(stockDisponible>counter) setCounter(counter+1)
    }
    
   
    return(
    <div className="p-2">
        <div className="Button btn-group mb-2" role="group">
            <button className="Button btn btn-outline-primary" onClick={handlerDecreaseCount}>-</button>
            <h4 className="Number">{counter}</h4>
            <button className="Button btn btn-outline-primary" type="submit" onClick={handlerIncreaseCount}>+</button>
        </div>
        <div >
          <button className="btn btn-primary" onClick={()=> onAdd(counter)} disabled={!stockDisponible}>
            Agregar al carrito
          </button>
        </div>
    </div>
    )
}
export default ItemCount