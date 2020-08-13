import React from 'react';
import { FaPen, FaTrash } from 'react-icons/fa';

import './styles.css';

function ProductViewer({ productList, updateProduct, deleteProduct }) {
  function renderRows() {
    productList.sort((current, next) => {
      if (current.id > next.id) return 1;
      if (current.id < next.id) return -1;
      return 0;
    });

    return productList.map(product => (
      <tr key={product.id}>
        <th scope="row">{product.id}</th>
        <td>{product.name}</td>
        <td>{product.description}</td>
        <td>{product.price}</td>
        <td>{product.stock}</td>
        <td>{product.categoryName}</td>
        <td>
          <button
            className="btn btn-sm btn-primary mr-1"
            onClick={() => updateProduct(product)}
          >
            <FaPen />
          </button>
          <button
            className="btn btn-sm btn-danger"
            onClick={() => deleteProduct(product)}
          >
            <FaTrash />
          </button>
        </td>
      </tr>
    ));
  }

  return (
    <div className="products-viewer">
      <div className="card mt-2">

        <div className="card-header bg-white">
          <h5 className="card-title mb-0">Produtos Cadastrados</h5>
        </div>

        <div className="card-body">
          <table className="table table-sm table-striped table-hover">
            <thead className="thead-dark">
              <tr>
                <th>#</th>
                <th>Nome</th>
                <th>Descrição</th>
                <th>Preço (R$)</th>
                <th>Quantidade</th>
                <th>Categoria</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {renderRows()}
            </tbody>
          </table>
        </div>

        <div className="card-footer bg-white"></div>
          <nav className="mb-0" aria-label="Registered peoducts">
            <ul className="pagination justify-content-center">
              <li className="page-item disabled">
                <a className="page-link" href="#" tabIndex="-1" aria-disabled="true">Anterior</a>
              </li>
              <li className="page-item active"><a className="page-link" href="#">1</a></li>
              <li className="page-item"><a className="page-link" href="#">2</a></li>
              <li className="page-item"><a className="page-link" href="#">3</a></li>
              <li className="page-item">
                <a className="page-link" href="#">Próxima</a>
              </li>
            </ul>
          </nav>
      </div>
    </div>
  );
}

export default ProductViewer;