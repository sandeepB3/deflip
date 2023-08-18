import React, { useState,useContext } from 'react';
import axios from 'axios';
import './AddItemForm.css'; // Import your custom CSS for styling
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
const AddItemForm = () => {
  const navigate=useNavigate()
  const auth=useContext(AuthContext)
  const [itemName, setItemName] = useState('');
  const [category, setCategory] = useState('');
  const [itemPrice, setItemPrice] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const [brandName,setBrandName]=useState("")
  const [description,setDescription]=useState("")

  const handleAddItem = async(e) => {
    
    e.preventDefault();
    try{
      const formData = new FormData();
      formData.append('image', selectedFile);
      axios.post('http://localhost:8000/product/add',{
        "productName":itemName,
        "cost":itemPrice,
        category,
        "supplierID":auth.state.supplier.supplierID,
        quantity,
        brandName,
        description
    }).then((res)=>{
      console.log(res.data.productID)
const response= axios.post(`http://localhost:8000/product/addImage/${res.data.productID}`,formData)
console.log(res)
    })
    
    setItemName('');
    setCategory('');
    setItemPrice(0);
    setBrandName('');
    setDescription('');
    setQuantity(0);
    setSelectedFile(null)
    navigate('/')
  }catch(err){
    console.log(err);
  }
    // Implement the logic to send the item details to your backend for processing
    // This is where you would make an API call to add the item to your database
   
    // Clear the form fields after adding
    
  };
  const handleFileChange=async(e)=>{
    setSelectedFile(e.target.files[0]);
  }

  return (
    <div style={{width:'100%'}}>
   
    <div className="add-item-form">
      <h2>Add a New Item</h2>
      <form onSubmit={handleAddItem} style={{ alignItems:'center'}}>
        <div style={{display:'flex',flexDirection:'row'}}>
          <div style={{flex:1, padding:10}}>
            <label>
          Item Name:
          <input
            type="text"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            required
          />
        </label>
        <label>
          Category:
          <textarea
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </label>
        <label>
          Price:
          <input
            type="number"
            value={itemPrice}
            onChange={(e) => setItemPrice(e.target.value)}
            required
          />
        </label>
        <label>
          Quantity:
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </label>
        </div>
        <div style={{flex:1, padding:10}}>
           
        <label>
          Brand Name:
          <input
            type="text"
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
            required
          />
        </label>
        <label>
          Description:
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>
        <label>
          Upload Image:
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            // required
          />
        </label>
        </div>
        </div>
        
       
        <button type="submit" className="button">
          Add Item
        </button>
      </form>
    </div>
    </div>
  );
};

export default AddItemForm;
