import React, { useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';

import './styles.css';
import AppLayout from '../../template/AppLayout';
import PageHeader from '../../components/page-header';
import ProductRegister from '../../components/product-register';
import ProductViewer from '../../components/product-viewer';

function Products() {
  const [updateProductList, setUpdateProductList] = useState(false);
  
  const handleSavedNewProduct = () => setUpdateProductList(true);
  const handleUpdatedProductList = () => setUpdateProductList(false);

  return (
    <AppLayout>
      <div className="products">
        <PageHeader icon={FaShoppingCart} title="Produtos" />

        <div className="container products-body">
          <ProductRegister savedNewProduct={handleSavedNewProduct} />
          <ProductViewer
            refresh={updateProductList}
            updatedProductList={handleUpdatedProductList}
          />
        </div>
      </div>
    </AppLayout>
  );
}

export default Products;