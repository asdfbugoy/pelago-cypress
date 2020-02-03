import React from 'react';
import styled from 'styled-components';

const StyledHeader = styled.header`
    font-size: 18px;
`;

const Header = () => {
    return <StyledHeader data-cy="header" className="mb-3">
        <div className="primary">Hey</div>
        <div className="secondary">Cinema</div>
    </StyledHeader>;
};

export default Header;