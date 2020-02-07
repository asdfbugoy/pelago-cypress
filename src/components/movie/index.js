import React from 'react';
import Header from './Header';
import Search from './Search';
import List from './List';
import Advanced from './Advanced';
import Pagination from './Pagination';

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

    const [advanced, setAdvanced] = React.useState(false);

    const [params, setParams] = React.useState({
        y: '',
        type: '',
        page: ''
    });

    const [page, setPage] = React.useState(1);
    const [term, setTerm] = React.useState('');

    React.useEffect(() => {
        // fetchAPI('default');
    }, [advanced]);

    const fetchAPI = () => {
        setLoading(true);
        const apikey = '185c5ebb';
        const url = 'https://www.omdbapi.com/?';
        const p = {
            apikey: apikey,
            s: term,
            page: page,
            ...(advanced && { ...params }),
        };
        const query = Object.keys(p)
            .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(p[k]))
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
                setLoading(false);
                // setTimeout(() => setLoading(false), 2000);
            })
            .catch((error) => {
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
        <Search loading={loading} fetchAPI={fetchAPI} setAdvanced={setAdvanced} advanced={advanced} setPage={setPage} />
        {advanced && <Advanced params={params} setParams={setParams} />}
        <List {...data} />
        {data.totalResults && <Pagination total={data.totalResults} setPage={setPage} fetchAPI={fetchAPI} />}
    </section>;
};

export default Movie;