import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';

import './styles.css';
import AppLayout from '../../template/AppLayout';
import PageHeader from '../../components/page-header';

function Products() {
  return (
    <AppLayout>
      <div className="products">
        <PageHeader icon={FaShoppingCart} title="Produtos" />
      </div>
    </AppLayout>
  );
}

export default Products;