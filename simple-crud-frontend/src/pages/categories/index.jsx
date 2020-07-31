import React from 'react';
import { FaList } from 'react-icons/fa';

import './styles.css';
import AppLayout from '../../template/AppLayout';
import PageHeader from '../../components/page-header';

function Categories() {
  return (
    <AppLayout>
      <div className="categories">
        <PageHeader icon={FaList} title="Categorias" />
      </div>
    </AppLayout>
  );
}

export default Categories;