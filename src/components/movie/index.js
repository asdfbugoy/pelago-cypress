import React from 'react';
import Header from './Header';
import Search from './Search';
import List from './List';

const Movie = () => {

    // const [list, setList] = React.useState([]);
    // const [total, setTotal] = React.useState(0);
    // const [status, setStatus] = React.useState(false);

    const [data, setData] = React.useState({
        Search: [],
        totalResults: 0,
        Response: false
    });

    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        // fetchAPI('default');
    }, []);

    const fetchAPI = (s) => {
        setLoading(true);
        const apikey = '185c5ebb';
        const url = 'http://www.omdbapi.com/?';
        const params = {
            apikey: apikey,
            s: s
        };
        const query = Object.keys(params)
            .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
            .join('&');

        fetch(url + query, {
            // method: 'POST', // or 'PUT'
            // headers: {
            //     'Content-Type': 'application/json',
            // },
            // body: JSON.stringify(params),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);
                // setList(data.Search);
                // setTotal(data.totalResults);
                // setStatus(data.Response);
                data.totalResults = data.totalResults ? parseInt(data.totalResults, 10) : 0;
                data.Response = data.Response === 'True' ? true : false;

                setData(data.Response ? data : {
                    Response: false,
                    totalResults: 0,
                    Search: [],
                    Error: data.Error
                });
                setLoading(false)
                // setTimeout(() => setLoading(false), 2000);
            })
            .catch((error) => {
                console.log('Error:', error);
                setData({
                    Response: false,
                    totalResults: 0,
                    Search: [],
                    Error: error.message
                });
            });
    };

    return <section data-cy="movie">
        <Header />
        <Search loading={loading} fetchAPI={fetchAPI} />
        <List {...data} />
    </section>;
};

export default Movie;