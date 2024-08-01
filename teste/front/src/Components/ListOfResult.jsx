import React, {useState, useEffect} from "react";
import {Link} from 'react-router-dom'
import '../Styles/ListOfResult.css'

function ListOfResult(){
    
    const [result, setResult] = useState([]);

    useEffect(()=>{
        fetch("http://localhost:3000")
        .then((res)=>res.json())
        .then((data)=>{
            setResult(data);
            console.log(data);
        }).catch((err)=>{
            console.error(err);
        });

    }, []);

    const handleDelete = (e) =>{
        console.log(e.target.name);
        if(confirm("Tem certeza que deseja excluir estas infomações:")){
            console.log('Informações excluídas');
            fetch("http://localhost:3000", {
                method: 'PUT',
                body: JSON.stringify({
                    ['id']: e.target.name,
                }),
                headers: {"Content-Type" : "application/json"},
            });
            window.location.reload();
        }else{
            console.log("Pedido de exclusão cancelado.");

        }
    };

    return (
        <div>ListOfResult</div>
    )
}

export default ListOfResult