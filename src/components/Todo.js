import React, { useEffect, useState } from 'react'
import "./style.css";

const getLocalData = () => {
    const list = localStorage.getItem('mytodolist');
    if (list) {
        return JSON.parse(list);
    } else {
        return [];
    }
}

const Todo = () => {
    const [inputData, setInputData] = useState("");
    const [item, setItem] = useState(getLocalData());
    const [edit, setEdit] = useState("");
    const [toggleButton, setToggleButton] = useState(false);
    const addItem = () =>{
        if(!inputData){
            alert('Please Add Item');
        }else if (inputData && toggleButton) {
            setItem(
                item.map((curElem) => {
          if (curElem.id === edit) {
            return { ...curElem, name: inputData };
          }
          return curElem;
        })
      );

      setInputData("");
      setEdit(null);
      setToggleButton(false);
    }
        else{
            const newInputData = {
                id: new Date().getTime().toString(),
                name:inputData,
            };
            setItem([...item, newInputData]);
            setInputData("");
        }
    };
    const editItem = (index) => {
        const editedItem = item.find((currElem)=>{
            return currElem.id === index;
        });
        console.log(editedItem.name);
        setInputData(editedItem.name);
        setEdit(index);
        setToggleButton(true);
    };

    const deleteItem = (index)=>{
        const updatedItem =item.filter((currElem)=>{
                return currElem.id !== index;
        });
        setItem(updatedItem);
    };
    const removeAll =()=>{
        setItem([]);
    };
    useEffect(() => {
      localStorage.setItem('mytodolist',JSON.stringify(item));
    }, [item])
    

    return (
    <>
        <div className="main-div">
            <div className="child-div">
                <figure>
                    <img src="./images/notepad-icon.png" alt="todologo" />
                    <figcaption>Add Your List Here</figcaption>
                </figure>
                <div className="addItems">
                    <input 
                    type="text" 
                    placeholder="✍ Add Item"
                    className="form-control"
                    value={inputData}
                    onChange={(event)=>setInputData(event.target.value)}
                    />
                    {toggleButton ? (
                        <i className="far fa-edit add-btn" onClick={addItem}></i>
                    ) : (
                        <i className="fa fa-plus add-btn" onClick={addItem}></i>
                    ) }
                </div>
                <div className="showItems">
                    {item.map((currElem)=>{
                        return(
                            <div className="eachItem" key={currElem.id}>
                                <h3>{currElem.name}</h3>
                                <div className="todo-btn">
                                    <i className="far fa-edit add-btn" onClick ={()=>editItem(currElem.id)}></i>
                                    <i className="far fa-trash-alt add-btn" onClick={()=>deleteItem(currElem.id)}></i>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className="showItems">
                    <button className="btn effect04" data-sm-link-text="Remove All" onClick={removeAll}>
                        <span>CHECK LIST</span>
                    </button>
                </div>
            </div>
        </div>
    </>
    )
}

export default Todo