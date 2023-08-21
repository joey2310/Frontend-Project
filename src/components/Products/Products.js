import React, { useState, useEffect } from 'react';
import { Card, CardContent, IconButton, Link, Switch, Typography } from '@material-ui/core';
import { ToggleButtonGroup, ToggleButton } from '@material-ui/lab';
import './Products.css';
import { AddShoppingCart } from '@material-ui/icons';
import { useNavigate } from 'react-router-dom';

function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortOption, setSortOption] = useState('default');
  const navigate = useNavigate();
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Fetch categories on component mount
  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/v1/products/categories', {
        method: 'GET',
      });
      const data = await response.json();
      console.log(data);
      setCategories(data);
      setSelectedCategory('all');
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      let url = 'http://localhost:3001/api/v1/products';
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      setProducts(data);
      setFilteredProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleCategoryChange = (event, newCategory) => {
    console.log(newCategory);
    setSelectedCategory(newCategory);
    const filteredItem = products.filter((item) => {
      return item.category === newCategory;
    })
    if (newCategory === 'all') {
      setFilteredProducts(products);
    }
    else {
      setFilteredProducts(filteredItem);
    }
  };

  const handleSortChange = (event, newSort) => {
    console.log(newSort);
    setSortOption(newSort);
    switch (newSort) {
      case "priceHighToLow":
        setFilteredProducts(filteredProducts.sort((a, b) => b.price - a.price));
        break;
      case "priceLowToHigh":
        setFilteredProducts(filteredProducts.sort((a, b) => a.price - b.price));
        break;
      case "newest":

        setFilteredProducts(filteredProducts.sort((a, b) => {
          const startTime = new Date(a.updatedAt).getTime();
          const endTime = new Date(b.updatedAt).getTime();

          return endTime - startTime
        }));
        break;
      case "default":
        setFilteredProducts(filteredProducts);
        break;

    }
  };

  const handleAddToCartClick = (productId) => {
    // Redirect to the product details page
    navigate(`/products/${productId}`);
  };

  const handleCardClicked = (productId) => {
    console.log(productId);
    navigate(`/products/${productId}`);
  }

  return (
    <div>
      <h2>Products Page</h2>
      <ToggleButtonGroup value={selectedCategory} exclusive onChange={handleCategoryChange}>
        <ToggleButton value="all">All</ToggleButton>
        {categories.map((category) => (
          <ToggleButton key={category} value={category}>
            {category}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>

      <ToggleButtonGroup value={sortOption} exclusive onChange={handleSortChange}>
        <ToggleButton value="default">Default</ToggleButton>
        <ToggleButton value="priceHighToLow">Price High to Low</ToggleButton>
        <ToggleButton value="priceLowToHigh">Price Low to High</ToggleButton>
        <ToggleButton value="newest">Newest</ToggleButton>
      </ToggleButtonGroup>

      <div className="products-container">
        {filteredProducts.map((product) => (
          <Card onClick={()=> handleCardClicked(product._id)} key={product._id} className="product-card">
            <CardContent>
              <div className="product-image">
                <img src={product.imageURL} alt={product.name} />
              </div>
              <div className='product__content'>
                  <Typography variant='h3'>{product.name}</Typography>
                  <Typography variant='inherit' className='price'>Price: ${product.price}</Typography>
                 
                  {/* Other product details */}
                {/* <div>
                  <IconButton aria-label="Add to Cart" className="icon-button"
                    onClick={() => handleAddToCartClick(product.id)} >
                    <AddShoppingCart className="icon__color" />
                  </IconButton>
                </div> */}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Products;
