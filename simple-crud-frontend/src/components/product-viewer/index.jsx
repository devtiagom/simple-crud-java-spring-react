import React from 'react';
import { FaPen, FaTrash } from 'react-icons/fa';

import './styles.css';

function ProductViewer() {
  const handleEdit = (id) => {
    console.log("HandleEdit " + id);
  }

  const handleDelete = (id) => {
    console.log("HandleDelete " + id);
  }

  return (
    <div className="products-viewer">
      <div className="card mt-2">

        <div className="card-header bg-white">
          <h5 className="card-title mb-0">Produtos Cadastrados</h5>
        </div>

        <div className="card-body">
          <table className="table table-striped">
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
              <tr>
                <th scope="row">1</th>
                <td>TV</td>
                <td>Televisão</td>
                <td>2345,67</td>
                <td>10</td>
                <td>Eletro</td>
                <td>
                  <button
                    className="btn btn-sm btn-success mr-1"
                    onClick={() => handleEdit(1)}
                  >
                    <FaPen />
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(1)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Micro-ondas</td>
                <td>Forno micro-ondas</td>
                <td>456,78</td>
                <td>11</td>
                <td>Eletro</td>
                <td>
                <button
                    className="btn btn-sm btn-success mr-1"
                    onClick={() => handleEdit(2)}
                  >
                    <FaPen />
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(2)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td>Sofá</td>
                <td>Sofá 5 lugares</td>
                <td>1234,56</td>
                <td>12</td>
                <td>Móveis</td>
                <td>
                <button
                    className="btn btn-sm btn-success mr-1"
                    onClick={() => handleEdit(3)}
                  >
                    <FaPen />
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(3)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="card-footer bg-white"></div>
          <nav aria-label="Registered peoducts">
            <ul className="pagination justify-content-center">
              <li className="page-item disabled">
                <a className="page-link" href="#" tabindex="-1" aria-disabled="true">Anterior</a>
              </li>
              <li className="page-item active"><a class="page-link" href="#">1</a></li>
              <li className="page-item"><a class="page-link" href="#">2</a></li>
              <li className="page-item"><a class="page-link" href="#">3</a></li>
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