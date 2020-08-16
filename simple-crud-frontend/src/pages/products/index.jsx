import React, { useState, useEffect } from 'react';
import { FaShoppingCart } from 'react-icons/fa';

import './styles.css';
import api from '../../services/api';
import AppLayout from '../../template/AppLayout';
import PageHeader from '../../components/page-header';
import ProductRegister from '../../components/product-register';
import ProductViewer from '../../components/product-viewer';
import AlertToast from '../../components/alert-toast';
import Show from '../../components/show';

const HTTP_STATUS_OK = 200;
const HTTP_STATUS_CREATED = 201;
const HTTP_STATUS_NO_CONTENT = 204;

const ALERT_TOAST_TIMEOUT = 3000;

const productInitialState = {
  id: 0,
  name: '',
  description: '',
  price: '',
  stock: '',
  categoryId: 0,
  readOnly: false,
};

const modeInitialState = 'save';

function Products() {
  const [product, setProduct] = useState(productInitialState);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [mode, setMode] = useState(modeInitialState);
  const [serverResponseAlert, setServerResponseAlert] = useState({});
  const [showAlertToast, setShowAlertToast] = useState(false);

  useEffect(() => {
    getCategories();
    getProducts();
  }, []);

  const getCategories = () => api.get('/categories').then(response => setCategories(response.data));
  const getProducts = () => api.get('/products').then(response => setProducts(response.data));

  async function makeRequest(method, id) {
    const response = await api[method](`/products/${id ? id : ''}`, {
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      categoryId: product.categoryId,
    });

    const newResponseAlert = {};

    if (method === 'post') {
      if (response.status === HTTP_STATUS_CREATED) {
        newResponseAlert.alertType = 'success';
        newResponseAlert.alertText = 'Produto cadastrado com sucesso!';
      } else {
        newResponseAlert.alertType = 'error';
        newResponseAlert.alertText = 'Falha ao cadastrar produto!';
      }
    } else if (method === 'put') {
      if (response.status === HTTP_STATUS_OK) {
        newResponseAlert.alertType = 'success';
        newResponseAlert.alertText = 'Produto atualizado com sucesso!';
      } else {
        newResponseAlert.alertType = 'error';
        newResponseAlert.alertText = 'Falha ao atualizar os dados do produto!';
      }
    } else {
      if (response.status === HTTP_STATUS_NO_CONTENT) {
        newResponseAlert.alertType = 'success';
        newResponseAlert.alertText = 'Produto excluído com sucesso!';
      } else {
        newResponseAlert.alertType = 'error';
        newResponseAlert.alertText = 'Falha ao excluir produto!';
      }
    }

    setServerResponseAlert({ ...serverResponseAlert, ...newResponseAlert });
    setShowAlertToast(true);
    setTimeout(() => setShowAlertToast(false), ALERT_TOAST_TIMEOUT);
    
    getProducts();
    handleClearFields();
    setMode(modeInitialState);
  }

  const handleSubmit = () => makeRequest('post');
  const handleConfirmUpdate = () => makeRequest('put', product.id);
  const handleConfirmDelete = () => makeRequest('delete', product.id);

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

  const handleClearFields = () => setProduct(productInitialState);

  function handleCancelOperation() {
    handleClearFields();
    setMode(modeInitialState);
  }

  function fillInFields(selectedProduct, changeMode, readOnly) {
    const productCategory = categories.filter(category => {
      return category.name === selectedProduct.categoryName;
    });

    setProduct({
      ...product,
      id: selectedProduct.id,
      name: selectedProduct.name,
      description: selectedProduct.description,
      price: selectedProduct.price,
      stock: selectedProduct.stock,
      categoryId: productCategory[0].id,
      readOnly,
    });

    setMode(changeMode);
  }

  const handleUpdate = selectedProduct => fillInFields(selectedProduct, 'update', false);
  const handleDelete = selectedProduct => fillInFields(selectedProduct, 'delete', true);

  return (
    <AppLayout>
      <div className="products">
        <PageHeader icon={FaShoppingCart} title="Produtos" />

        <Show condition={showAlertToast}>
          <AlertToast
            alertType={serverResponseAlert.alertType}
            alertText={serverResponseAlert.alertText}
          />
        </Show>

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
            registerMode={mode}
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