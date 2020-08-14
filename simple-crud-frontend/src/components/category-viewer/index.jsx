import React from 'react';
import { FaPen, FaTrash } from 'react-icons/fa';

import './styles.css';

function CategoryViewer({ categoryList, updateCategory, deleteCategory }) {
  function renderRows() {
    categoryList.sort((current, next) => {
      if (current.id > next.id) return 1;
      if (current.id < next.id) return -1;
      return 0;
    });

    return categoryList.map(category => (
      <tr key={category.id}>
        <th scope="row">{category.id}</th>
        <td>{category.name}</td>
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

  return (
    <div className="card mt-2">
      <div className="card-header bg-white">
        <h5 className="card-title mb-0">Categorias Cadastradas</h5>
      </div>

      <div className="card-body">
        <table className="table table-sm table-striped table-hover">
          <thead className="thead-dark">
            <tr>
              <th className='category-viewer-table-ids'>#</th>
              <th>Nome</th>
              <th className='category-viewer-table-actions'>Ações</th>
            </tr>
          </thead>
          <tbody>
            {renderRows()}
          </tbody>
        </table>
      </div>

      <div className="card-footer bg-white">
        <nav className="mb-0" aria-label="Registered categories">
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

export default CategoryViewer;