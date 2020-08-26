import React, { useState, useEffect } from 'react';
import { FaList } from 'react-icons/fa';

import api from '../../services/api';
import Page from '../../components/page';
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

function Categories({ showSideBar }) {
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

  function defineResponseAlert(requestType, response, success) {
    if (success) {
      const action = requestType === 'post'
        ? 'cadastrada'
        : requestType === 'put'
          ? 'atualizada'
          : 'excluída';
      const alertText = `Categoria ${action} com sucesso!`;
      return {
        ...defaultSuccessResponseAlert,
          alertText,
      }
    } else {
      return {
        ...defaultErrorResponseAlert,
        alertTitle: response.data.msg,
        alertList: response.data.errors.map(error => ({
          strong: error.fieldName,
          text: error.message,
        })),
      }
    }
  }

  async function makeRequest(method, id) {
    let response = {};
    let newResponseAlert = {};

    try {
      response = await api[method](
        `/categories/${id ? id : ''}`,
        method === 'delete' ? {} : {
        name: category.name,
      });
      window.scrollTo(0, document.body.scrollHeight);
    } catch (error) {
      response = error.response;
    }

    if (
      response.status === HTTP_STATUS_CREATED ||
      response.status === HTTP_STATUS_OK ||
      response.status === HTTP_STATUS_NO_CONTENT
    ) {
      newResponseAlert = defineResponseAlert(method, response, true);
    } else {
      newResponseAlert = defineResponseAlert(method, response, false);
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
    <Page>
      <PageHeader icon={FaList} title="Categorias" showSideBar={showSideBar} />

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
        <CategoryRegister
          currentCategory={category}
          updateCategoryField={setCategory}
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
    </Page>
  );
}

export default Categories;