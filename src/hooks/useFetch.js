import { useState,useEffect } from "react";
import { API_KEY,API_URL } from "../config";


const useFetch = () => {
    const [loader,setLoader] = useState(true);
    const [error,setError] = useState(false);


    const getShopData = async (url = `${API_URL}`,method = 'GET',headers = { 'Authorization': API_KEY },body = '') => {
        setError('');
        setLoader(true);

        try {
            const response = await fetch(url,{ method,headers }
            );

            const data = await response.json();
            setLoader(false);
            const dataFormatted = formatFetchRequestData(data.shop)
            return dataFormatted;
        } catch (err) {
            setLoader(false);
            setError('Fetch error: ',err,error);
            throw new Error('Error',err);
        }
    }

    return {
        loader,
        error,
        getShopData
    }

    function formatFetchRequestData (data) {
        return data.map(el => {
            return {
                id: el.mainId,
                name: el.displayName,
                descr: el.displayDescription ? el.displayDescription : "No description",
                pageCount: el.pageCount,
                image: el.displayAssets[0].background,
                price: el.price.regularPrice ? el.price.regularPrice : 'Not for sale'
            }
        })
    }
}

export default useFetch;



export const useMyQuery = (url: string,params: RequestInit = {}): MyQueryResponse => {
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(null);
    const [data,setData] = useState(null);

    useEffect(() => {
        const controller = new AbortController();
        // устанавливаем состояние загрузки
        setLoading(true);

        // отправляем запрос
        fetch(url,{ ...params,signal: controller.signal })
            // полученный ответ устанавливаем как данные
            .then(res => setData(res))
            // в случае ошибки устанавливаем ее
            .catch(err => setError(err))
            // в любом случае (успех/ошибка) убираем состояние загрузки
            .finally(() => setLoading(false));

        return () => {
            // в случае изменения параметров до нового запроса предотвращаем старый запрос
            controller.abort();
        }
    },[url,params]);

    // информацию об ошибке, загрузке и данные отправляем наружу
    return { data,error,loading };
};