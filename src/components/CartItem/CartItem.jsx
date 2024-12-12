  
  import '../../App.css'
  import React from 'react';
  import { useContext } from "react"
  import { CartContext } from '../../context/cartContext';
import { Link } from 'react-router-dom'
  
  const CartItem = ({ id,title, img, quantity, price}) => {
    const { removeItem } = useContext(CartContext)

    const handleRemoveItem = () => {
        removeItem(id)
    }
  
  return (
    
    <main>
      <div className="container">
        <div className="row mt-3">
          <div className="col">
          {/*   <h2 className="d-flex justify-content-center mb-3">
              Realizar Compra
            </h2> */}
            <form id="procesar-pago" method="POST">
              <div  className="form-group table-responsive">
                <table className="table" id="lista-compra">
                  <thead>
                    <tr>
                      <th scope="col">Imagen</th>
                      <th scope="col">Nombre</th>
                      <th scope="col">Precio</th>
                      <th scope="col">Cantidad</th>
                      <th scope="col">Sub Total</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <td >
                        <img width={"80px"} src={img} alt="" />
                      </td>
                      <td>{title}</td>
                      <td>$ {price}</td>
                      <td>{quantity}</td>
                      <td>$ {price * quantity}</td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={handleRemoveItem}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="row justify-content-center d-none" id="spinner">
                <div className="spinner">
                  <div className="dot1"></div>
                  <div className="dot2"></div>
                </div>
              </div>

              <div className="row justify-content-between">
                <div className="col-md-4 mb-2">
                  <Link
                    to="/"
                    className="btn btn-success btn-block "
                  >
                    Seguir comprando
                  </Link>
                </div>

                <div className="col-xs-12 col-md-4">
                  <div className="col-md-4 mb-2">
                    
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};
export default CartItem;