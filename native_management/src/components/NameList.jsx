import { useState } from "react";

function NameList(){

    const [list, setList] = useState(["jack", "jill", "john"]);

    // const [name, setName] = useState("");
    const [name, setName] = useState(()=>"jack");

    const onAddName = () => {
        setList([...list, name]);
        setName("");
    };

    return(
        <>
            <ul>
                {list.map((name) => (
                    <li key={name}>{name}</li>
                ))}
            </ul>
            <input 
                type="text" 
                value={name}
                onChange = {(e)=>setName(e.target.value)}
            />
            <button
                onClick={onAddName}
            >
                Add Name
            </button>
        </> 
    )
};

export default NameList;