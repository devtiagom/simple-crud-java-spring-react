import React from 'react';
import { FaList } from 'react-icons/fa';

import './styles.css';
import AppLayout from '../../template/AppLayout';
import PageHeader from '../../components/page-header';
import CategoryRegister from '../../components/category-register';
import CategoryViewer from '../../components/category-viewer';

function Categories() {
  return (
    <AppLayout>
      <div className="categories">
        <PageHeader icon={FaList} title="Categorias" />
        <CategoryRegister />
        <CategoryViewer />
      </div>
    </AppLayout>
  );
}

export default Categories;