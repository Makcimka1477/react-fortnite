import { useState,useEffect } from "react";

const useFetchPost = () => {
    const [loader,setLoader] = useState(false);
    const [error,setError] = useState(false);

    const postCartData = async (body) => {
        setLoader(true);
        const url = 'https://jsonplaceholder.typicode.com/posts';
        const response = await fetch(url,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body),
        });

        try {
            if (response.ok) {
                let request = await response.json();
                setLoader(false);
                setError(false);
                return request;
            }
        } catch (err) {
            setError(true);
            console.log('Error: ',err,response);
        }
    }
    return ({
        loader,error,postCartData,
    });
}

export default useFetchPost;