import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

import "../Styles/FormData.css"

function FormData(){

    const [result, setResult] = useState([]);
    const [dataToInsert, setDataToInsert] = useState({
        product_name: '',
        id_supplier: '',
        id_category: '',
        unit: '',
        price: ''
    });

    const [redirected, setRedirected] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        console.log(e);
    }
    const handleSubmit = (e) => {
        const foundItem = data.find(
            (item) => window.location.pathname === `/modify/${item.id}`
        );
        if(foundItem){
            fetch("http://localhost:3000", {
                method: 'PUT',
                body: JSON.stringify(dataToInsert),
                headers: {"Content-Type": "application/json"},
            });
    
        }
        navigate("/");
    }
    useEffect(()=>{
        fetch("http://localhost:3000")
        .then((res)=>res.json())
        .then((data)=>{
            setResult(data);

            const foundItem = data.find(
                (item)=> window.location.pathname === `/modify/${item.id}`
            );

            if(foundItem){
                setDataToInsert((prevState)=>({
                    ...prevState,
                    ...foundItem
                }));
            }else{
                if(!redirected){
                    setRedirected(true);
                    navigate("/")
                }
            }
        })
    }, []);
    return (
        <div className='form_input' onSubmit={handleSubmit}>
            <form>
               <input 
                    className="form_input"
                    type="text" 
                    value={dataToInsert.product_name} 
                    name='product_name' 
                    onChange={handleChange} 
                    placeholder='Product Name' 
                    required 
                    autoComplete='none'
                />
               <input 
                    className="form_input"
                    type="number" 
                    value={dataToInsert.id_supplier} 
                    name='id_supplier' 
                    onChange={handleChange} 
                    placeholder='Supplier' 
                    required 
                    autoComplete='none'
                />
               <input 
                    className="form_input"
                    type="number" 
                    value={dataToInsert.id_category} 
                    name='id_category' 
                    onChange={handleChange} 
                    placeholder='Category' 
                    required 
                    autoComplete='none'
                />
               <input 
                    className="form_input"
                    type="number" 
                    value={dataToInsert.price} 
                    name='price' 
                    onChange={handleChange} 
                    placeholder='Price' 
                    required 
                    autoComplete='none'
                /> 
               <input 
                    className="form_input"
                    type="text" 
                    value={dataToInsert.unit} 
                    name='unit' 
                    onChange={handleChange} 
                    placeholder='Unit' 
                    required 
                    autoComplete='none'
                />
                <button className='form_button'>Save</button>
            </form>
        </div>
    );
}

export default FormData;