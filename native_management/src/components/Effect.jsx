import { useState, useEffect } from "react";

function Effect(){

    const [names, setNames] = useState([]);

    useEffect(() => {
        fetch("/names.json")
        .then(response => response.json())
        .then((data) => setNames(data));
    }, []);

    const [selectedNameDetail, setSelectedNameDetail] = useState(null);

    const onSelectNameChange = (name) => {
        fetch(`/${name}.json`)
        .then(response => response.json())
        .then(data => setSelectedNameDetail(data));
    }

    return(
        <div>
            {names.map((name)=>(
                <button
                    onClick={()=>onSelectNameChange(name)}
                >{name}</button>
            ))}
            <div>{JSON.stringify(selectedNameDetail)}</div>
        </div>
    )
};

export default Effect;