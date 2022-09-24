import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getProduct, productSelector, updateProduct } from '../features/productSlice';
import { useParams, useNavigate } from 'react-router-dom';

const EditProduct = () => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {id} = useParams();

  const singleProduct = useSelector((state) =>  productSelector.selectById(state, id));
  
  useEffect(()=>{
    dispatch(getProduct());
  }, [dispatch]);

  // mmen set single product saat halaman pertama kali dirender
  useEffect(()=>{
    if(singleProduct){
        setTitle(singleProduct.title);
        setPrice(singleProduct.price);
    }
  }, [singleProduct]);

  const handlerUpdate = async (e) => {
    e.preventDefault();
    await dispatch(updateProduct({id, title, price}));
    navigate('/');
  }
  
  return (
    <div>
        <form onSubmit={handlerUpdate} className='box mt-5'>
          <div className='field'>
            <label className='label'>Title</label>
            <div className='control'>
              <input  type='text'
                      className='input' 
                      placeholder='title'
                      value={title}
                      onChange={(e)=> setTitle(e.target.value)}
              />
            </div>
          </div>
          <div className='field'>
            <label className='label'>Price</label>
            <div className='control'>
              <input  type='text' 
                      className='input' 
                      placeholder='price'
                      value={price}
                      onChange={(e)=> setPrice(e.target.value)}
              />
            </div>
          </div>
          <div className='field'>
            <button className='button is-success'>Update</button>
          </div>
        </form>
    </div>
  )
}

export default EditProduct