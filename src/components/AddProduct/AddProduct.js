import React, { useState, useEffect } from 'react';
import { Card, CardContent, Dialog, DialogTitle, DialogContent, DialogActions, Typography, Button, TextField, IconButton, Icon } from '@material-ui/core';
import Modal from 'react-modal';
import { useEventContext } from '../../common/EventContext/EventContext';
import './AddProduct.css';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';


function AddProduct() {
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState({
    name: '',
    category: '',
    price: 0,
    description: '',
    manufacturer: '',
    availableItems: 0,
    imageURL: '',
  });
  const Token = localStorage.getItem('Token');
  const { setEvent } = useEventContext();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  useEffect(() => {
    // Fetch the list of products when the component mounts
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/v1/products');
      if (!response.ok) {
        const errorText = 'Failed to fetch products';
        throw new Error(errorText);
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      setEvent({
        isEvent: true,
        type: 'error',
        message: error.message
      })
      console.error('Error fetching products:', error);
    }
  };

  const handleSave = async () => {
    try {
      let response;

      if (productId) {
        // If productId is set, it means we are editing an existing product
        response = await fetch(`http://localhost:3001/api/v1/products/${productId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(productToEdit),
        });
        if (!response.ok) {
          const errorText = 'Failed to update product';
          throw new Error(errorText);
        }
        const message = `Product ${productToEdit.name} modified successfully`;
        setEvent({
          isEvent: true,
          type: 'success',
          message: message
        })
        console.log('Product updated');
      } else {
        // If productId is not set, it means we are creating a new product
        response = await fetch('http://localhost:3001/api/v1/products', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': Token,
          },
          body: JSON.stringify(productToEdit),
        });

        if (!response.ok) {
          const errorText = 'Failed to create product';
          throw new Error(errorText);
        }
        const message = `Product ${productToEdit.name} added successfully`;
        setEvent({
          isEvent: true,
          type: 'success',
          message: message
        })
        console.log('Product created');
      }

      // Fetch the updated list of products
      fetchProducts();
      setIsModalOpen(false);
      setProductId(null);
      setProductToEdit({
        name: '',
        category: '',
        price: 0,
        description: '',
        manufacturer: '',
        availableItems: 0,
        imageURL: '',
      });
    } catch (error) {
      console.error('Error:', error);
      setEvent({
        isEvent: true,
        type: 'error',
        message: error.message
      })
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/api/v1/products/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorText = 'Failed to delete product';
        throw new Error(errorText);
      }
      // Handle success, maybe show a success message or redirect to a new page.
      console.log('Product deleted');
      const message = `Product ${productToEdit.name} deleted successfully`;
      setEvent({
        isEvent: true,
        type: 'success',
        message: message
      })
      // Fetch the updated list of products
      fetchProducts();
    } catch (error) {
      // Handle error, show an error message.
      console.error('Error deleting product:', error);
      setEvent({
        isEvent: true,
        type: 'error',
        message: error.message
      })
    }
  };

  const openModal = (product = null) => {
    setIsModalOpen(true);
    if (product) {
      // If a product is provided, it means we are in edit mode
      setProductId(product._id);
      setProductToEdit(product);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setProductId(null);
    setProductToEdit({
      name: '',
      category: '',
      price: 0,
      description: '',
      manufacturer: '',
      availableItems: 0,
      imageURL: '',
    });
  };

  const openDeleteDialog = (product) => {
    setProductToDelete(product);
    setDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setProductToDelete(null);
    setDeleteDialogOpen(false);
  };

  return (
    <div className="products-container">
      {products.map((product) => (
        <Card key={product._id} className="product-card">
          <CardContent>
            <div className="product-image">
              <img src={product.imageURL} alt={product.name} />
            </div>
            <div className='product__content'>
              <Typography variant='h3'>{product.name}</Typography>
              <Typography variant='inherit' className='price'>Price: &#x20B9;{product.price}</Typography>

            </div>
            <div className='add__product__button'>

              <Button onClick={() => openModal(product)}>
                <IconButton>
                  <EditOutlinedIcon color='action' />
                </IconButton>
              </Button>
              <Button onClick={() => openDeleteDialog(product)}>
                <IconButton>
                  <DeleteOutlineOutlinedIcon color='error' />
                </IconButton>
              </Button>
            </div>

          </CardContent>
        </Card>
      ))}

      <Button className="add__product" variant="outlined" onClick={() => openModal()}>Add Product</Button>

      {/* Add/Edit Product Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
      >
        <h2>{productId ? 'Edit Product' : 'Add Product'}</h2>
        <form className='add__product__form'>
          <TextField
            label="Name"
            name="name"
            value={productToEdit.name}
            onChange={(e) => setProductToEdit({ ...productToEdit, name: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Category"
            name="category"
            value={productToEdit.category}
            onChange={(e) => setProductToEdit({ ...productToEdit, category: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Price"
            name="price"
            value={productToEdit.price}
            onChange={(e) => setProductToEdit({ ...productToEdit, price: e.target.value })}
            type="number"
            fullWidth
            margin="normal"
          />
          <TextField
            label="Description"
            name="description"
            value={productToEdit.description}
            onChange={(e) => setProductToEdit({ ...productToEdit, description: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Manufacturer"
            name="manufacturer"
            value={productToEdit.manufacturer}
            onChange={(e) => setProductToEdit({ ...productToEdit, manufacturer: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Available Items"
            name="availableItems"
            value={productToEdit.availableItems}
            onChange={(e) => setProductToEdit({ ...productToEdit, availableItems: e.target.value })}
            type="number"
            fullWidth
            margin="normal"
            min='0'
          />
          <TextField
            label="Image URL"
            name="imageURL"
            value={productToEdit.imageURL}
            onChange={(e) => setProductToEdit({ ...productToEdit, imageURL: e.target.value })}
            fullWidth
            margin="normal"
          />
          <div>
          </div>
          <Button variant="outlined" onClick={handleSave}>
            {productId ? 'Save' : 'Add'}
          </Button>
          <Button variant="outlined" onClick={closeModal}>Cancel</Button>
        </form>
      </Modal>

      <Dialog
        open={deleteDialogOpen}
        onClose={closeDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Delete Product</DialogTitle>
        <DialogContent>
          <Typography variant="body2" id="alert-dialog-description">
            Are you sure you want to delete the product: {productToDelete?.name}?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleDelete(productToDelete?._id);
              closeDeleteDialog();
            }}
            color="primary"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AddProduct;