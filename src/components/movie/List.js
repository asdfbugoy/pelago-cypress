import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { observer } from 'mobx-react';

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
    const { Search, Error } = props;

    return Error ?
        <div data-cy="error">{Error}</div>
        : <div className="row" data-cy="list">
            {Search.map((d, i) => <div key={i} className="col-md-6 mb-3">
                <div className="card border shadow">
                    <div className="row no-gutters">
                        <div className="col-sm-auto">
                            <StyledImg url={d.Poster} className="card-img" />
                        </div>
                        <div className="col-sm">
                            <div className="card-body">
                                <div className="card-title primary">{d.Title}</div>
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
    Search: PropTypes.array,
    Error: PropTypes.string
};

export default observer(List);