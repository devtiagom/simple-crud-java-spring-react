import React from 'react';
import { FaEraser, FaSave, FaPen, FaTrash } from 'react-icons/fa';

import './styles.css';
import Show from '../show';

function CategoryRegister({
  currentCategory,
  updateCategoryField,
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
        <h5 className="card-title mb-0">Cadastro de Categorias</h5>
      </div>

      <div className="card-body">
        <form className="container">
          <div className="row">
            <div className="col">
              <div className="form-group mb-2">
                <label htmlFor="name">Nome:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-control form-control-sm"
                  value={currentCategory.name}
                  placeholder="Nome da categoria"
                onChange={
                  event => updateCategoryField({
                    ...currentCategory,
                    name: event.target.value,
                  })
                }
                readOnly={currentCategory.readOnly}
                />
              </div>
            </div>
          </div>
        </form>
      </div>

      <div className="card-footer bg-white">
        <div className="category-register-actions">
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

export default CategoryRegister;