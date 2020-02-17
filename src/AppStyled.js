import { createGlobalStyle } from 'styled-components';

const AppStyled = createGlobalStyle`
    /* @import 'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css';
    @import 'https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css'; */

    body {
        font-family: 'Helvetica Neue';
        font-size: 16px;
        color: #34283f;
    }
    
    .primary {
        color: #7faae4;
    }
    .secondary {
        color: #834db7;
    }
    .tertiary {
        color: #34283f;
    }
    .pointer {
        cursor: pointer;
    }
`;

export default AppStyled;
