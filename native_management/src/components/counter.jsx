import {useState} from "react";

function Counter() {

    const [count, setCount] = useState(10);
  
    const addOne = () => {
      setCount(count + 1);
    }
  
    return (
      <div>
        <button
          onClick={addOne}
        >Count = {count}</button>
  
      </div> 
    );
}

export default Counter;