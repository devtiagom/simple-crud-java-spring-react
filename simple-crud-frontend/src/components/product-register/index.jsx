import React, { useState, useEffect } from 'react';
import { FaEraser, FaSave, FaTrash } from 'react-icons/fa';

import './styles.css';

import api from '../../services/api';

function ProductRegister({ savedNewProduct }) {
  const [categories, setCategories] = useState([]);

  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: 0.0,
    stock: 0,
    categoryId: 0
  });

  useEffect(() => {
    api.get('categories').then(response => setCategories(response.data));
  }, []);

  async function handleSubmit() {
    await api.post('products', newProduct);
    savedNewProduct();
  }

  const handleClean = () => {
    console.log("HandleClean");
  }

  const handleDelete = () => {
    console.log("HandleDelete");
  }

  function createNewProduct ({ target }) {
    const field = target.name;
    const value = target.value;

    switch (field) {
      case 'name':
        setNewProduct({ ...newProduct, name: value });
        break;
      case 'description':
        setNewProduct({ ...newProduct, description: value });
        break;
      case 'price':
        setNewProduct({ ...newProduct, price: value });
        break;
      case 'stock':
        setNewProduct({ ...newProduct, stock: value });
        break;
      case 'category':
        setNewProduct({ ...newProduct, categoryId: value });
        break;
      default:
        setNewProduct({ ...newProduct });
    }
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
                <div className="form-group mb-2">
                  <label htmlFor="name">Nome:</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-control form-control-sm"
                    value={newProduct.name}
                    placeholder="Nome do produto"
                    onChange={createNewProduct}
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
                    value={newProduct.description}
                    placeholder="Descrição do produto"
                    onChange={createNewProduct}
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
                    value={newProduct.price}
                    placeholder="Preço (R$)"
                    onChange={createNewProduct}
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
                    value={newProduct.stock}
                    placeholder="Quantidade em estoque"
                    onChange={createNewProduct}
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
                    value={newProduct.categoryId}
                    onChange={createNewProduct}
                  >
                    <option value="0">Selecione uma categoria</option>
                    {categories.map(category => {
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