import React from "react";
import { Link } from 'react-router-dom';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';

const Item = ({ id, title, img, price, description, purchasePrice, showDeleteButton, showEditButton, onDelete, onEdit }) => {
    return (
      <div className="card shadow" style={{ width: '20rem', margin: '.5rem' }}>
        <img src={img} className="card-img-top shadow rounded-2 object-fit-fill p-3" alt={title} />
        <div className="card-body">
          <p className=" text-uppercase card-title">{title}</p>
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="1">
              <Accordion.Header>
                Mostrar Descripcion
              </Accordion.Header>
              <Accordion.Body>
                {description}
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          <div className="collapse" id="collapseExample">
            <div className="card card-body">
              <p className=" text-body-secondary">
                {description}
              </p>
            </div>
          </div>
          {showDeleteButton || showEditButton ? (
            <div>
              <p className=" card-footer">
                Precio de compra: ${purchasePrice}
              </p>
              <p className=" card-footer">
                Precio: ${price}
              </p>
            </div>
          ) : (
            <p className=" card-footer">
              ${price}
            </p>
          )}

          <div className="d-flex justify-content-between mt-2">
            {!showDeleteButton && !showEditButton && (
              <Link to={`products/${id}`}>
                <Button variant="primary">Ver más</Button>
              </Link>
            )}
            {showEditButton && (
              <Button variant="warning" onClick={() => onEdit(id)}>Editar</Button>
            )}
            {showDeleteButton && (
              <Button variant="danger" onClick={() => onDelete(id)}>Eliminar</Button>
            )}
          </div>
        </div>
      </div>
    )
}

export default Item;
