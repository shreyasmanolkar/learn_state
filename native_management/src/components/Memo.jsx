import { useState, useMemo, useCallback } from "react";

function SortedList({list, sortFunc}){
    const sortedList = useMemo(()=> {
        console.log("Running sort");
        return [...list].sort(sortFunc);
    }, [list, sortFunc]);
    return(
        <div>
            {sortedList.join(', ')};
        </div>
    )
}

function Memo(){

    const [numbers] = useState([10,20,30]);

    const total = useMemo(
        () => numbers.reduce((acc, num)=> acc + num, 0),
        [numbers]
    );

    const [names] = useState(["John", "Paul", "George", "Ringo"]);



    // const sortedNames = useMemo( 
    //     () => [...names].sort(),
    //     [names]
    // );

    const [count1, setCount1] = useState(0);
    const [count2, setCount2] = useState(0);

    const countTotal = count1 + count2;

    const sortFunc =  useCallback((a, b) => a.localeCompare(b) * -1, []);

    return(
        <>
            <div>Total: {total}</div>
            <div>Names: {names.join(', ')}</div>
            {/* <div>Sorted Names: {sortedNames.join(', ')}</div> */}
            <SortedList list={names} sortFunc={sortFunc}/><br />
            <button onClick={()=>setCount1(count1 + 1)}>Count 1: {count1}</button>
            <button onClick={()=>setCount2(count2 + 1)}>Count 2: {count2}</button>
            <div>Total: {countTotal}</div>
        </>
    )
};

export default Memo;