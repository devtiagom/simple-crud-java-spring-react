import React from 'react';
import { FaPen, FaTrash } from 'react-icons/fa';

import './styles.css';

function CategoryViewer({
  categoryList,
  updateCategory,
  deleteCategory,
  filters,
  updateFilters
}) {
  function renderRows(categories) {
    return categories.map(category => (
      <tr key={category.id}>
        <th scope="row">{category.id}</th>
        <td className="category-viewer-table-name">{category.name}</td>
        <td>
          <button
            className="btn btn-sm btn-primary mr-1"
            onClick={() => updateCategory(category)}
          >
            <FaPen />
          </button>
          <button
            className="btn btn-sm btn-danger"
            onClick={() => deleteCategory(category)}
          >
            <FaTrash />
          </button>
        </td>
      </tr>
    ));
  }

  function renderPagination() {
    const { totalPages, number } = categoryList;
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
      <nav className="mb-0" aria-label="Registered categories">
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
        <h5 className="card-title mb-0">Categorias Cadastradas</h5>
      </div>

      <div className="card-body">
        <table className="table table-sm table-striped table-hover">
          <thead className="thead-dark">
            <tr>
              <th className="category-viewer-table-id">#</th>
              <th className="category-viewer-table-name">Nome</th>
              <th className="category-viewer-table-actions">Ações</th>
            </tr>
          </thead>
          <tbody>
            {categoryList.content && renderRows(categoryList.content)}
          </tbody>
        </table>
      </div>

      <div className="card-footer bg-white pb-0">
        {categoryList.totalPages && renderPagination()}
      </div>
    </div>
  );
}

export default CategoryViewer;