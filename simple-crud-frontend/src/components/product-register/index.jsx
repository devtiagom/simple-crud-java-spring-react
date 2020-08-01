import React from 'react';
import { FaEraser, FaSave, FaTrash } from 'react-icons/fa';

import './styles.css';

function ProductRegister() {
  const handleSubmit = () => {
    console.log("Handlesubmit");
  }

  const handleClean = () => {
    console.log("HandleClean");
  }

  const handleDelete = () => {
    console.log("HandleDelete");
  }

  return (
    <div className="products-register">
      <div className="card">
        <div className="card-header bg-white">
          <h5 className="card-title mb-0">Cadastro de Produtos</h5>
        </div>

        <div className="card-body">
          <form className="container">
            <div className="row">
              <div className="col-sm-12 col-md-12 col-lg-6 col-xl-4">
                <div className="form-group">
                  <label htmlFor="name">Nome:</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-control"
                    placeholder="Nome do produto"
                  />
                </div>
              </div>
              <div className="col-sm-12 col-md-12 col-lg-6 col-xl-5">
                <div className="form-group">
                  <label htmlFor="description">Descrição:</label>
                  <input
                    type="text"
                    id="description"
                    name="description"
                    className="form-control"
                    placeholder="Descrição do produto"
                  />
                </div>
              </div>
              <div className="col-sm-12 col-md-12 col-lg-6 col-xl-3">
                <div className="form-group">
                  <label htmlFor="price">Preço:</label>
                  <input
                    type="text"
                    id="price"
                    name="price"
                    className="form-control"
                    placeholder="Preço (R$)"
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-12 col-md-12 col-lg-6 col-xl-4">
                <div className="form-group">
                  <label htmlFor="stock">Quantidade:</label>
                  <input
                    type="number"
                    id="stock"
                    name="stock"
                    className="form-control"
                    placeholder="Quantidade em estoque"
                  />
                </div>
              </div>
              <div className="col-sm-12 col-md-12 col-lg-6 col-xl-8">
                <div className="form-group">
                  <label htmlFor="category">Categoria:</label>
                  <select name="category" id="category" className="form-control">
                    <option value="0">Selecione uma categoria</option>
                    <option value="1">Eletro</option>
                    <option value="2">Cama, mesa e banho</option>
                    <option value="3">Móveis</option>
                  </select>
                </div>
              </div>
            </div>
          </form>
        </div>

        <div className="card-footer bg-white">
          <div className="actions">
            <button
              type="reset"
              className="btn btn-sm btn-secondary"
              onClick={handleClean}
            >
              <FaEraser /> Limpar
          </button>

            <button
              type="submit"
              className="btn btn-sm btn-primary ml-2"
              onClick={handleSubmit}
            >
              <FaSave /> Salvar
          </button>

            <button
              type="button"
              className="btn btn-sm btn-danger ml-2"
              onClick={handleDelete}
            >
              <FaTrash /> Deletar
          </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default ProductRegister;