import React, { useState, useEffect } from 'react';
import { FaShoppingCart } from 'react-icons/fa';

import api from '../../services/api';
import AppLayout from '../../template/AppLayout';
import Page from '../../components/page';
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

const filterParametersInitialState = {
  page: 0,
  size: 5,
  orderBy: 'id',
  direction: 'ASC',
};

const modeInitialState = 'save';

const defaultSuccessResponseAlert = {
  alertClass: 'alert-success',
  alertType: 'single',
  alertTitle: '',
  alertTextStrong: 'Ok',
};

const defaultErrorResponseAlert = {
  alertClass: 'alert-danger',
  alertType: 'multi',
};

function Products() {
  const [product, setProduct] = useState(productInitialState);
  const [products, setProducts] = useState({});
  const [categories, setCategories] = useState({});
  const [filterParameters, setFilterParameters] = useState(filterParametersInitialState);
  const [mode, setMode] = useState(modeInitialState);
  const [serverResponseAlert, setServerResponseAlert] = useState({});
  const [showAlertToast, setShowAlertToast] = useState(false);

  useEffect(() => {
    getCategories();
    getProducts();
  }, [filterParameters]);

  function getCategories() {
    api.get('/categories')
      .then(response => setCategories(response.data));
  }

  function getProducts() {
    const filters = `page=${filterParameters.page}`
      .concat(`&size=${filterParameters.size}`)
      .concat(`&orderBy=${filterParameters.orderBy}`)
      .concat(`&direction=${filterParameters.direction}`);

    api.get(`/products?${filters}`)
      .then(response => setProducts(response.data));
  }

  async function makeRequest(method, id) {
    let response = {};

    try {
      response = await api[method](`/products/${id ? id : ''}`, {
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
        categoryId: product.categoryId,
      });

      window.scrollTo(0, document.body.scrollHeight);
    } catch (error) {
      response = error.response;
    }

    if (response === undefined) return;

    let newResponseAlert = {};

    if (method === 'post') {
      if (response.status === HTTP_STATUS_CREATED) {
        newResponseAlert = { ...defaultSuccessResponseAlert };
        newResponseAlert.alertText = 'Produto cadastrado com sucesso!';
      } else {
        newResponseAlert = { ...defaultErrorResponseAlert };
        newResponseAlert.alertTitle = response.data.msg;
        newResponseAlert.alertList = response.data.errors.map(error => {
          return {
            strong: error.fieldName,
            text: error.message,
          };
        });
      }
    } else if (method === 'put') {
      if (response.status === HTTP_STATUS_OK) {
        newResponseAlert = { ...defaultSuccessResponseAlert };
        newResponseAlert.alertText = 'Produto atualizado com sucesso!';
      } else {
        newResponseAlert = { ...defaultErrorResponseAlert };
        newResponseAlert.alertTitle = response.data.msg;
        newResponseAlert.alertList = response.data.errors.map(error => {
          return {
            strong: error.fieldName,
            text: error.message,
          };
        });
      }
    } else {
      if (response.status === HTTP_STATUS_NO_CONTENT) {
        newResponseAlert = { ...defaultSuccessResponseAlert };
        newResponseAlert.alertText = 'Produto excluído com sucesso!';
      } else {
        newResponseAlert = { ...defaultErrorResponseAlert };
        newResponseAlert.alertTitle = response.data.msg;
        newResponseAlert.alertList = response.data.errors.map(error => {
          return {
            strong: error.fieldName,
            text: error.message,
          };
        });
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
    const productCategory = categories.content.filter(category => {
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

    window.scrollTo(0, 0);
  }

  const handleUpdate = selectedProduct => fillInFields(selectedProduct, 'update', false);
  const handleDelete = selectedProduct => fillInFields(selectedProduct, 'delete', true);

  return (
    <AppLayout>
      <Page>
        <PageHeader icon={FaShoppingCart} title="Produtos" />

        <Show condition={showAlertToast}>
          <AlertToast
            alertClass={serverResponseAlert.alertClass}
            alertType={serverResponseAlert.alertType}
            alertTitle={serverResponseAlert.alertTitle}
            alertTextStrong={serverResponseAlert.alertTextStrong}
            alertText={serverResponseAlert.alertText}
            alertList={serverResponseAlert.alertList}
          />
        </Show>

        <div className="container page-body">
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
            filters={filterParameters}
            updateFilters={setFilterParameters}
          />
        </div>
      </Page>
    </AppLayout>
  );
}

export default Products;