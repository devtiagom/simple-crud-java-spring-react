import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';

import './styles.css';
import AppLayout from '../../template/AppLayout';
import PageHeader from '../../components/page-header';
import ProductRegister from '../../components/product-register';
import ProductViewer from '../../components/product-viewer';

function Products() {
  return (
    <AppLayout>
      <div className="products">
        <PageHeader icon={FaShoppingCart} title="Produtos" />
        <div className="container products-body">
          <ProductRegister />
          <ProductViewer />
        </div>
      </div>
    </AppLayout>
  );
}

export default Products;