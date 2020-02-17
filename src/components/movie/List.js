import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import { useHistory } from 'react-router-dom';

const StyledImg = styled.div`
    width: 100%;
    height: 150px;
    background-image: url(${props => props.url !== 'N/A' ? props.url : 'https://via.placeholder.com/150'});
    background-position: center center;
    background-size: cover;
    @media (min-width: 576px) {
        width: 150px;
    }
`;

const List = props => {
    const { store } = props;
    const { Search, Error } = store.data;
    const history = useHistory();
    const onClick = id => () => history.push(`/${id}`);
    return Error ?
        <div data-cy="error" className="alert alert-danger">{Error}</div>
        : <div className="row" data-cy="list">
            {Search.map((d, i) => <div key={i} className="col-md-6 mb-3">
                <div className="card border shadow" >
                    <div className="row no-gutters">
                        <div className="col-sm-auto">
                            <StyledImg url={d.Poster} className="card-img" />
                        </div>
                        <div className="col-sm">
                            <div className="card-body">
                                <div data-cy="click-to-detailed" className="card-title primary pointer" onClick={onClick(d.imdbID)}>{d.Title}</div>
                                <div className="card-text secondary">{d.imdbID}</div>
                                <div data-cy="year" className="card-text">{d.Year}</div>
                                <div data-cy="type" className="card-text">{d.Type}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>)}
        </div>;
};

List.propTypes = {
    store: PropTypes.object
};

export default observer(List);