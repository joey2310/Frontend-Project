import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './SingleProduct.css';
import { IconButton, Typography, Input } from '@material-ui/core';
import RemoveOutlinedIcon from '@material-ui/icons/RemoveOutlined';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import { useNavigate } from 'react-router-dom';

function SingleProduct() {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        fetchProductDetails(productId);
    }, [productId]);

    const fetchProductDetails = async (id) => {
        try {
            const response = await fetch(`http://localhost:3001/api/v1/products/${id}`);
            const data = await response.json();
            console.log(data);
            setProduct(data);
        } catch (error) {
            console.error('Error fetching product details:', error);
        }
    };

    // Function to handle adding quantity
    const handleAddQuantity = () => {
        setQuantity(quantity + 1);
    };

    // Function to handle subtracting quantity
    const handleRemoveQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handleOnClick = () => {
        navigate(`/create-order`);
    }

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div className="full-page">
            <div className="product-details-container">
                <div className="product-details-wrapper">
                    <div className="single__product-image">
                        <img src={product.imageURL} alt={product.name} />
                    </div>
                    <div className="product-details">
                        <Typography variant='h2'>
                            <b>
                                {product.name}
                            </b>
                        </Typography>
                        <p className="price">Price: ${product.price}</p>
                        <p>{product.description}</p>
                        <p>Manufacturer: {product.manufacturer}</p>
                        <div className='product__quantity'>
                            <IconButton onClick={handleRemoveQuantity}>
                                <RemoveOutlinedIcon />
                            </IconButton>
                            <Input
                                type="text"
                                label="Quantity"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                inputProps={{ min: 1 }}
                            />
                            <IconButton onClick={handleAddQuantity}>
                                <AddOutlinedIcon />
                            </IconButton>
                        </div>
                        {/* Other product details */}
                        <button onClick={handleOnClick}  className="buy-now-button">Place Order</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SingleProduct;
