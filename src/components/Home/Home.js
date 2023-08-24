import React, { useEffect, useState } from 'react'
import { Container, CssBaseline, Typography } from '@material-ui/core'
import banner1 from '../../assets/images/banner1';
import './Home.css';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import { useNavigate } from 'react-router-dom';

function Home() {

  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/v1/products/categories', {
        method: 'GET',
      });
      const data = await response.json();
      console.log(data);
      setCategories(data);
    } catch (error) {
      console.error('Error fetching products:', error);

    }
  };

  const handleOnCLick= () => {
    navigate('/products');
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className='home__page'>
      <Typography variant='h5'>Welcome To Upgrad Eshop</Typography>
      <CssBaseline />
      <Container >
        <img src={banner1} alt="Banner Image" style={{ width: '85%',  }} />
        {/* Add other content or text below the image if needed */}
      </Container>
      <Container>
        <Typography variant='h6' className='h6'>
          <b>Shop By Categories</b>
        </Typography>
        <div className='button__class'> 
          <ToggleButtonGroup value={categories.name} exclusive onClick={handleOnCLick} >
            {categories.map((category) => (
              <ToggleButton color="primary" className='category__button' key={category} value={category}>
                {category}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </div>
      </Container>
    </div>
  )
}

export default Home