import { useState, useRef, useEffect } from "react";

function Ref(){

    const inputRef =useRef(null);

    useEffect(()=>{
        inputRef.current.focus();
    }, []);

    const idRef = useRef(1);

    const [names, setNames] = useState([]);

    const onAddName = () => {
        setNames([...names, { 
            id: idRef.current++,
            name: inputRef.current.value}
        ]);
        inputRef.current.value= "";
    };

    return(
        <>
            <div>
                {names.map((name)=>(
                    <div key={name.name}>{name.id} {name.name}</div>
                ))}
            </div>
            <input type="text" ref={inputRef} />
            <button
                onClick={onAddName}
            >Add Name</button>
        </>
    )
};

export default Ref;