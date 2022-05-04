import { useState, useEffect } from "react";

function StopWatch(){

    const [time, setTime] = useState(0);  

    useEffect(()=>{        
      const interval = setInterval(() => {
        setTime(t => t + 1);
      }, 1000);
      return () => clearInterval(interval);
    }, []);

    return(
        <div>
            Time: {time}
        </div>
    )
};

export default StopWatch;