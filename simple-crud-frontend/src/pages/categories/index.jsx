import React, { useState, useEffect } from 'react';
import { FaList } from 'react-icons/fa';

import './styles.css';
import api from '../../services/api';
import AppLayout from '../../template/AppLayout';
import PageHeader from '../../components/page-header';
import CategoryRegister from '../../components/category-register';
import CategoryViewer from '../../components/category-viewer';

const CategoryInitialState = {
  id: 0,
  name: '',
  readOnly: false,
};

const modeInitialState = 'save';

function Categories() {
  const [category, setCategory] = useState(CategoryInitialState);
  const [categories, setCategories] = useState([]);
  const [mode, setMode] = useState(modeInitialState);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = () => api.get('/categories').then(response => setCategories(response.data));

  async function makeRequest(method, id) {
    await api[method](`/categories/${id ? id : ''}`, {
      name: category.name,
    });
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
  }

  const handleUpdate = selectedCategory => fillInFields(selectedCategory, 'update', false);
  const handleDelete = selectedCategory => fillInFields(selectedCategory, 'delete', true);

  return (
    <AppLayout>
      <div className="categories">
        <PageHeader icon={FaList} title="Categorias" />

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
          />
        </div>
      </div>
    </AppLayout>
  );
}

export default Categories;