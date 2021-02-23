import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Axios from 'axios';
import { detailsProduct, updateProduct } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';

export default function ProductEditScreen(props) {
  const productId = props.match.params.id;
  const [title, setTitle] = useState('');
  const [name, setName] = useState('');
  const [playersNum, setPlayersNum] = useState('');
  const [position, setPosition] = useState('');
  const [team, setTeam] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [style, setStyle] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState('');
  const [brand, setBrand] = useState('');
  const [description, setDescription] = useState('');

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  const dispatch = useDispatch();
  useEffect(() => {
    if (successUpdate) {
        props.history.push('/productlist');
      }
      if (!product || product._id !== productId || successUpdate) {
        dispatch({ type: PRODUCT_UPDATE_RESET });
      dispatch(detailsProduct(productId));
    } else {
      setTitle(product.title);
      setName(product.name);
      setPlayersNum(product.playersNum);
      setPrice(product.price);
      setImage(product.image);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setBrand(product.brand);
      setDescription(product.description);
    }
}, [product, dispatch, productId, successUpdate, props.history]);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
        updateProduct({
          _id: productId,
          title,
          name,
          playersNum,
          position,
          team,
          style,
          price,
          image,
          category,
          brand,
          countInStock,
          description,
        })
      );
  };

  const [loadingUpload, setLoadingUpload] = useState(false);
  const [errorUpload, setErrorUpload] = useState('');

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('image', file);
    setLoadingUpload(true);
    try {
      const { data } = await Axios.post('/api/uploads', bodyFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      setImage(data);
      setLoadingUpload(false);
    } catch (error) {
      setErrorUpload(error.message);
      setLoadingUpload(false);
    }
  };


  return (
    <div className="height">
      <form className="form product-form" onSubmit={submitHandler}>
        <div>
          <h1>Edit Product {productId}</h1>
        </div>
        {loadingUpdate && <LoadingBox></LoadingBox>}
        {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            <div className="full">
              <label htmlFor="title">Title</label>
              <input
                id="title"
                type="text"
                placeholder="Enter Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              ></input>
            </div>
            <div className="full">
              <label htmlFor="name">Player's Name</label>
              <input
                id="name"
                type="text"
                placeholder="Enter Player's Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></input>
            </div>
            <div className="halved">
              <label htmlFor="playerNum">Player's Number</label>
                <input
                  id="playerNum"
                  type="text"
                  placeholder="#"
                  value={playersNum}
                  onChange={(e) => setPlayersNum(e.target.value)}
                ></input>
            </div>
            <div className="halved">
              <label htmlFor="position">Position</label>
                <input
                  id="position"
                  type="text"
                  placeholder="Position"
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                ></input>
            </div>
            <div className="halved">
              <label htmlFor="team">Select Team</label>
              <select 
                id="team" 
                name="team" 
                placeholder="Select Team" 
                onChange={(e) => setTeam(e.target.value)}
                >
                <option value="penguins">Penguins</option>
                <option value="steelers">Steelers</option>
                <option value="pirates">Pirates</option>
                <option value="riverhounds">Riverhounds FC</option>
                <option value="panthers">Panthers</option>
                <option value="nonspecific">Pittsburgh Generic</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="halved">
              <label htmlFor="price">Price</label>
              <input
                id="price"
                type="text"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></input>
            </div>
            <div className="full">
              <label htmlFor="image">Image</label>
              <input
                id="image"
                type="text"
                placeholder="Enter image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></input>
            </div>
            <div className="full">
              <label htmlFor="imageFile">Image File</label>
              <input
                type="file"
                id="imageFile"
                label="Choose Image"
                onChange={uploadFileHandler}
              ></input>
              {loadingUpload && <LoadingBox></LoadingBox>}
              {errorUpload && (
                <MessageBox variant="danger">{errorUpload}</MessageBox>
              )}
            </div>
            <div className="halved">
              <label htmlFor="category">Category</label>
              <select 
                id="category" 
                name="category" 
                placeholder="Select Category" 
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="jersey">Jersey</option>
                <option value="shirt">Shirt</option>
                <option value="hat">Hat</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="halved">
              <label htmlFor="brand">Brand</label>
              <input
                id="brand"
                type="text"
                placeholder="Enter brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></input>
            </div>
            <div className="halved">
              <label htmlFor="countInStock">Quantity In Stock</label>
              <input
                id="countInStock"
                type="text"
                placeholder="Enter countInStock"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></input>
            </div>
            <div className="halved">
              <label htmlFor="style">Style</label>
              <select 
                id="style" 
                name="style" 
                placeholder="Select Style" 
                onChange={(e) => setStyle(e.target.value)}
              >
                <option value="home">Home</option>
                <option value="away">Away</option>
                <option value="third">Third</option>
                <option value="reverse-retro">Reverse Retro</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="full">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                rows="3"
                type="text"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div>
              <label></label>
              <button className="primary" type="submit">
                Update
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}

