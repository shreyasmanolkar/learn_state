import { useReducer } from "react";

function UserForm(){

    const [state, dispatch] = useReducer((state, action)=>{
        return{
            ...state,
            ...action
        };
    },{
        first: "",
        last: ""
    });

    return(
        <>
            <input 
                type="text" 
                value={state.first}
                onChange={(e)=> dispatch({first: e.target.value})}
                /> <br /> <br />
            <input 
                type="text" 
                value={state.last}
                onChange={(e)=> dispatch({last: e.target.value})}
            />
            <div>First: {state.first}</div>
            <div>Last: {state.last}</div>
        </>
    )
};

export default UserForm;