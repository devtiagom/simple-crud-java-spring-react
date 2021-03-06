import React from 'react';
import { FaPen, FaTrash } from 'react-icons/fa';

import './styles.css';

function ProductViewer({
  productList,
  updateProduct,
  deleteProduct,
  filters,
  updateFilters
}) {
  function renderRows(products) {
    return products.map(product => (
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

  function renderPagination() {
    const { totalPages, number } = productList;
    const listItems = [];

    for (let page = 0; page < totalPages; page++) {
      listItems.push(
        <li
          className={`page-item ${page === number ? 'active' : ''}`}
          key={page}
        >
          <button
            type="button"
            className="page-link"
            onClick={() => updateFilters({ ...filters, page })}
          >
              {page + 1}
            </button>
        </li>
      );
    }

    return (
      <nav className="mb-0" aria-label="Registered products">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${number === 0 ? 'disabled' : ''}`}>
            <button
              type="button"
              className="page-link"
              tabIndex="-1"
              aria-disabled="true"
              onClick={() => updateFilters({ ...filters, page: number - 1 })}
            >
              Anterior
            </button>
          </li>

          {listItems}

          <li className={`page-item ${totalPages <= number + 1 ? 'disabled' : ''}`}>
            <button
              type="button"
              className="page-link"
              onClick={() => updateFilters({ ...filters, page: number + 1 })}
            >
              Próxima
            </button>
          </li>
        </ul>
      </nav>
    );
  }

  return (
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
            {productList.content && renderRows(productList.content)}
          </tbody>
        </table>
      </div>

      <div className="card-footer bg-white pb-0">
        {productList.totalPages && renderPagination()}    
      </div>
    </div>
  );
}

export default ProductViewer;