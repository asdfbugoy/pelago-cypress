import React from 'react';
import PropTypes from 'prop-types';

const Advanced = props => {
    const { params, setParams } = props;

    const onChange = e => setParams({ ...params, [e.target.name]: e.target.type === 'number' && e.target.value < 1 ? '' : e.target.value });

    const mType = ['movie', 'series', 'episode'];

    return <React.Fragment>
        <form data-cy="advanced-search" className="row mb-3">
            <div className="col-sm">
                <select data-cy="type" className="form-control" onChange={onChange} name="type" value={params.type}>
                    <option value="">select type</option>
                    {mType.map((d, i) => <option key={i} value={d}>{d}</option>)}
                </select>
            </div>
            <div data-cy="year" className="col-sm"><input type="number" name="y" value={params.y} className="form-control" onChange={onChange} /></div>
            <div data-cy="page" className="col-sm"><input type="number" name="page" value={params.page} className="form-control" onChange={onChange} /></div>
        </form>
    </React.Fragment>;
};

Advanced.propTypes = {
    params: PropTypes.object,
    setParams: PropTypes.func
};

export default Advanced;