import React from 'react';
import Header from './Header';
import Search from './Search';
import List from './List';

const Movie = () => {
    const fetchAPI = (s) => {
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
                processData(data);
            })
            .catch((error) => {
                console.log('Error:', error);
            });
    };

    const processData = data => {
        setData(data);
    };

    const [data, setData] = React.useState({
        Search: [],
        totalResults: 0,
        Response: false
    });

    // React.useEffect(() => {
    //     fetchAPI();
    // }, []);

    return <section data-cy="movie">
        <Header />
        <Search fetchAPI={fetchAPI} />
        <List data={data.Search} />
    </section>;
};

export default Movie;