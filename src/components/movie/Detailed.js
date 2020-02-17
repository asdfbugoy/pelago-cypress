import React from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
// import { getSnapshot } from 'mobx-state-tree';
import { observer } from 'mobx-react';
import styled from 'styled-components';

const StyledImg = styled.div`
    width: 100%;
    height: 200px;
    background-image: url(${props => props.url !== 'N/A' ? props.url : 'https://via.placeholder.com/150'});
    background-position: center center;
    background-size: cover;
    @media (min-width: 576px) {
        /* width: 150px; */
        width: 50%;
        height: 300px;
    }
`;

const Detailed = props => {
    const { id } = useParams();
    const { store } = props;
    const { detailed } = store;
    React.useEffect(() => {
        store.fetchDetail(id);
    }, [store, id]);
    return store.loading ? <div>...Loading <i className="fa fa-gear fa-spin fa-spinner"></i></div>
        : detailed.Response ? <React.Fragment>
            <div className="card border shadow" data-cy="detailed">
                <div className="card-body">
                    <div className="table-responsive">
                        <StyledImg url={detailed.Poster} className="card-img m-auto" />
                        <table className="table">
                            <tbody>
                                <tr>
                                    <td>imdbID: </td>
                                    <td>{detailed.imdbID}</td>
                                </tr>
                                <tr>
                                    <td>Title: </td>
                                    <td>{detailed.Title}</td>
                                </tr>
                                <tr>
                                    <td>Title: </td>
                                    <td>{detailed.Year}</td>
                                </tr>
                                <tr>
                                    <td>Rated: </td>
                                    <td>{detailed.Rated}</td>
                                </tr>
                                <tr>
                                    <td>Released: </td>
                                    <td>{detailed.Released}</td>
                                </tr>
                                <tr>
                                    <td>Runtime: </td>
                                    <td>{detailed.Runtime}</td>
                                </tr>
                                <tr>
                                    <td>Genre: </td>
                                    <td>{detailed.Genre}</td>
                                </tr>
                                <tr>
                                    <td>Director: </td>
                                    <td>{detailed.Director}</td>
                                </tr>
                                <tr>
                                    <td>Writer: </td>
                                    <td>{detailed.Writer}</td>
                                </tr>
                                <tr>
                                    <td>Actors: </td>
                                    <td>{detailed.Actors}</td>
                                </tr>
                                <tr>
                                    <td>Plot: </td>
                                    <td>{detailed.Plot}</td>
                                </tr>
                                <tr>
                                    <td>Language: </td>
                                    <td>{detailed.Language}</td>
                                </tr>
                                <tr>
                                    <td>Country: </td>
                                    <td>{detailed.Country}</td>
                                </tr>
                                <tr>
                                    <td>Awards: </td>
                                    <td>{detailed.Awards}</td>
                                </tr>
                                <tr>
                                    <td>Metascore: </td>
                                    <td>{detailed.Metascore}</td>
                                </tr>
                                <tr>
                                    <td>imdbRating: </td>
                                    <td>{detailed.imdbRating}</td>
                                </tr>
                                <tr>
                                    <td>imdbVotes: </td>
                                    <td>{detailed.imdbVotes}</td>
                                </tr>
                                <tr>
                                    <td>Type: </td>
                                    <td>{detailed.Type}</td>
                                </tr>
                                <tr>
                                    <td>DVD: </td>
                                    <td>{detailed.DVD}</td>
                                </tr>
                                <tr>
                                    <td>BoxOffice: </td>
                                    <td>{detailed.BoxOffice}</td>
                                </tr>
                                <tr>
                                    <td>Production: </td>
                                    <td>{detailed.Production}</td>
                                </tr>
                                <tr>
                                    <td>Website: </td>
                                    <td>{detailed.Website}</td>
                                </tr>
                                <tr>
                                    <td>Ratings: </td>
                                    <td>{detailed.Ratings.map((d, i) => <div key={i}>
                                        <span>{d.Source}</span> = <span>{d.Value}</span>
                                    </div>)}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </React.Fragment> : <div className="alert alert-danger">{detailed.Error}</div>;
};

Detailed.propTypes = {
    store: PropTypes.object
};

export default observer(Detailed);