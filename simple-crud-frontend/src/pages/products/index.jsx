import React, { useState, useEffect } from 'react';
import { FaShoppingCart } from 'react-icons/fa';

import './styles.css';
import api from '../../services/api';
import AppLayout from '../../template/AppLayout';
import PageHeader from '../../components/page-header';
import ProductRegister from '../../components/product-register';
import ProductViewer from '../../components/product-viewer';

const productInitialState = {
  name: '',
  description: '',
  price: '',
  stock: '',
  categoryId: 0
};

function Products() {
  const [product, setProduct] = useState(productInitialState);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getCategories();
    getProducts();
  }, []);

  function getCategories() {
    api.get('categories').then(response => setCategories(response.data));
  }
  
  function getProducts() {
    api.get('/products').then(response => setProducts(response.data));
  }

  function handleUpdateProductField({ target }) {
    const field = target.name;
    const value = target.value;

    switch (field) {
      case 'name':
        setProduct({ ...product, name: value });
        break;
      case 'description':
        setProduct({ ...product, description: value });
        break;
      case 'price':
        setProduct({ ...product, price: value });
        break;
      case 'stock':
        setProduct({ ...product, stock: value });
        break;
      case 'category':
        setProduct({ ...product, categoryId: value });
        break;
      default:
        setProduct({ ...product });
    }
  }

  async function handleSubmit() {
    await api.post('products', product);
    getProducts();
    handleClearFields();
  }

  function handleClearFields() {
    setProduct(productInitialState);
  }

  function handleCancelOperation() {
    console.log('handleCancelOperation');
  }

  function handleUpdate(productId) {
    console.log(`handleUpdate(${productId})`);
  }

  function handleConfirmUpdate() {
    console.log('handleConfirmUpdate');
  }

  function handleDelete(productId) {
    console.log(`handleDelete(${productId})`);
  }

  function handleConfirmDelete() {
    console.log('handleConfirmDelete');
  }

  return (
    <AppLayout>
      <div className="products">
        <PageHeader icon={FaShoppingCart} title="Produtos" />

        <div className="container products-body">
          <ProductRegister
            categoryList={categories}
            currentProduct={product}
            updateProductField={handleUpdateProductField}
            submit={handleSubmit}
            clearFields={handleClearFields}
            cancelOperation={handleCancelOperation}
            confirmUpdate={handleConfirmUpdate}
            confirmDelete={handleConfirmDelete}
          />

          <ProductViewer
            productList={products}
            updateProduct={handleUpdate}
            deleteProduct={handleDelete}
          />
        </div>
      </div>
    </AppLayout>
  );
}

export default Products;