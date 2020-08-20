import React, { useState, useEffect } from 'react';
import { FaList } from 'react-icons/fa';

import './styles.css';
import api from '../../services/api';
import AppLayout from '../../template/AppLayout';
import PageHeader from '../../components/page-header';
import CategoryRegister from '../../components/category-register';
import CategoryViewer from '../../components/category-viewer';
import AlertToast from '../../components/alert-toast';
import Show from '../../components/show';

const HTTP_STATUS_OK = 200;
const HTTP_STATUS_CREATED = 201;
const HTTP_STATUS_NO_CONTENT = 204;

const ALERT_TOAST_TIMEOUT = 3000;

const CategoryInitialState = {
  id: 0,
  name: '',
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

function Categories() {
  const [category, setCategory] = useState(CategoryInitialState);
  const [categories, setCategories] = useState({});
  const [filterParameters, setFilterParameters] = useState(filterParametersInitialState);
  const [mode, setMode] = useState(modeInitialState);
  const [serverResponseAlert, setServerResponseAlert] = useState({});
  const [showAlertToast, setShowAlertToast] = useState(false);

  useEffect(() => {
    getCategories();
  }, [filterParameters]);

  function getCategories() {
    const filters = `page=${filterParameters.page}`
      .concat(`&size=${filterParameters.size}`)
      .concat(`&orderBy=${filterParameters.orderBy}`)
      .concat(`&direction=${filterParameters.direction}`);

    api.get(`/categories?${filters}`)
      .then(response => setCategories(response.data));
  }

  async function makeRequest(method, id) {
    let response = {};

    try {
      response = await api[method](`/categories/${id ? id : ''}`, {
        name: category.name,
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
        newResponseAlert.alertText = 'Categoria cadastrada com sucesso!';
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
        newResponseAlert.alertText = 'Categoria atualizada com sucesso!';
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
        newResponseAlert.alertText = 'Categoria excluída com sucesso!';
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

    getCategories();
    handleClearFields();
    setMode(modeInitialState);
  }

  const handleSubmit = () => makeRequest('post');
  const handleConfirmUpdate = () => makeRequest('put', category.id);
  const handleConfirmDelete = () => makeRequest('delete', category.id);

  function handleUpdateCategoryField({ target }) {
    const field = target.name;
    const value = target.value;

    if (field === 'name') {
      setCategory({ ...category, name: value });
    } else {
      setCategory({ ...category });
    }
  }

  const handleClearFields = () => setCategory(CategoryInitialState);

  function handleCancelOperation() {
    handleClearFields();
    setMode(modeInitialState);
  }

  function fillInFields(selectedCategory, changeMode, readOnly) {
    setCategory({
      ...category,
      id: selectedCategory.id,
      name: selectedCategory.name,
      readOnly,
    });

    setMode(changeMode);

    window.scrollTo(0, 0);
  }

  const handleUpdate = selectedCategory => fillInFields(selectedCategory, 'update', false);
  const handleDelete = selectedCategory => fillInFields(selectedCategory, 'delete', true);

  return (
    <AppLayout>
      <div className="categories">
        <PageHeader icon={FaList} title="Categorias" />

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

        <div className="container categories-body">
          <CategoryRegister
            currentCategory={category}
            updateCategoryField={handleUpdateCategoryField}
            submit={handleSubmit}
            clearFields={handleClearFields}
            cancelOperation={handleCancelOperation}
            confirmUpdate={handleConfirmUpdate}
            confirmDelete={handleConfirmDelete}
            registerMode={mode}
          />

          <CategoryViewer
            categoryList={categories}
            updateCategory={handleUpdate}
            deleteCategory={handleDelete}
            filters={filterParameters}
            updateFilters={setFilterParameters}
          />
        </div>
      </div>
    </AppLayout>
  );
}

export default Categories;