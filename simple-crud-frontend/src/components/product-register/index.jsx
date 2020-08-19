import React from 'react';
import { FaEraser, FaSave, FaPen, FaTrash } from 'react-icons/fa';

import './styles.css';
import Show from '../show';

function ProductRegister({
  categoryList,
  currentProduct,
  updateProductField,
  submit,
  clearFields,
  cancelOperation,
  confirmUpdate,
  confirmDelete,
  registerMode
}) {
  return (
    <div className="card">
      <div className="card-header bg-white">
        <h5 className="card-title mb-0">Cadastro de Produtos</h5>
      </div>

      <div className="card-body">
        <form className="container">
          <div className="row">
            <div className="col-sm-12 col-md-12 col-lg-6 col-xl-4">
              <div className="form-group mb-2">
                <label htmlFor="name">Nome:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-control form-control-sm"
                  value={currentProduct.name}
                  placeholder="Nome do produto"
                  onChange={updateProductField}
                  readOnly={currentProduct.readOnly}
                />
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-lg-6 col-xl-5">
              <div className="form-group mb-2">
                <label htmlFor="description">Descrição:</label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  className="form-control form-control-sm"
                  value={currentProduct.description}
                  placeholder="Descrição do produto"
                  onChange={updateProductField}
                  readOnly={currentProduct.readOnly}
                />
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-lg-6 col-xl-3">
              <div className="form-group mb-2">
                <label htmlFor="price">Preço:</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  className="form-control form-control-sm"
                  value={currentProduct.price}
                  placeholder="Preço (R$)"
                  onChange={updateProductField}
                  readOnly={currentProduct.readOnly}
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-12 col-md-12 col-lg-6 col-xl-4">
              <div className="form-group mb-2">
                <label htmlFor="stock">Quantidade:</label>
                <input
                  type="number"
                  id="stock"
                  name="stock"
                  className="form-control form-control-sm"
                  value={currentProduct.stock}
                  placeholder="Quantidade em estoque"
                  onChange={updateProductField}
                  readOnly={currentProduct.readOnly}
                />
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-lg-6 col-xl-8">
              <div className="form-group mb-2">
                <label htmlFor="category">Categoria:</label>
                <select
                  name="category"
                  id="category"
                  className="form-control form-control-sm"
                  value={currentProduct.categoryId}
                  onChange={updateProductField}
                  readOnly={currentProduct.readOnly}
                >
                  <option value="0">Selecione uma categoria</option>
                  {categoryList.content && categoryList.content.map(category => {
                    return (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          </div>
        </form>
      </div>

      <div className="card-footer bg-white">
        <div className="product-register-actions">
          <Show condition={registerMode === 'save'}>
            <button
              type="button"
              className="btn btn-sm btn-secondary"
              onClick={clearFields}
            >
              <FaEraser />
              <span className="ml-2">Limpar</span>
            </button>
          </Show>

          <Show condition={registerMode === 'update' || registerMode === 'delete'}>
            <button
              type="button"
              className="btn btn-sm btn-secondary ml-2"
              onClick={cancelOperation}
            >
              <FaEraser />
              <span className="ml-2">Cancelar</span>
            </button>
          </Show>

          <Show condition={registerMode === 'save'}>
            <button
              type="button"
              className="btn btn-sm btn-primary ml-2"
              onClick={submit}
            >
              <FaSave />
              <span className="ml-2">Salvar</span>
            </button>
          </Show>

          <Show condition={registerMode === 'update'}>
            <button
              type="button"
              className="btn btn-sm btn-primary ml-2"
              onClick={confirmUpdate}
            >
              <FaPen />
              <span className="ml-2">Atualizar</span>
            </button>
          </Show>

          <Show condition={registerMode === 'delete'}>
            <button
              type="button"
              className="btn btn-sm btn-danger ml-2"
              onClick={confirmDelete}
            >
              <FaTrash />
              <span className="ml-2">Deletar</span>
            </button>
          </Show>
        </div>
      </div>
    </div>
  );
}

export default ProductRegister;