import React from 'react';
import styled from 'styled-components';

const StyledHeader = styled.header`
    font-size: 18px;
`;

const Header = () => {
    return <StyledHeader data-cy="header" className="mb-3 card border shadow">
        <div className="card-body">
            <div className="primary">Singtel-GO</div>
            <div className="secondary">Quote Sample List</div>
        </div>
    </StyledHeader>;
};

export default Header;