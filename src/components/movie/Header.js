import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

const StyledHeader = styled.header`
    font-size: 18px;
`;

const Header = () => {
    const history = useHistory();
    const onClick = () => history.push('/');
    return <StyledHeader data-cy="header" className="mb-3 card border shadow pointer" onClick={onClick}>
        <div className="card-body">
            <div className="primary">Singtel-GO</div>
            <div className="secondary">Quote Sample List</div>
        </div>
    </StyledHeader>;
};

export default Header;