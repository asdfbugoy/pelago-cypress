import React from 'react';
// import PropTypes from 'prop-types';

const Advanced = props => {
    const refForm = React.useRef();
    const onSubmit = e => {
        console.log(e);
    };
    return <React.Fragment>
        <form data-cy="advanced-search" className="row mb-3" onSubmit={onSubmit}>
            <div className="col-sm"><input type="text" name="type" className="form-control"/></div>
            <div className="col-sm"><input type="text" name="y" className="form-control"/></div>
            <div className="col-sm"><input type="text" name="page" className="form-control"/></div>
        </form>
    </React.Fragment>;
};
// Advanced.propTypes = {
// };

export default Advanced;