import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';

const Advanced = props => {
    const { store } = props;
    const { params, types } = store;

    const onChange = e => store.params.setParamsByField(e.target.name, e.target.value);

    return <React.Fragment>
        <form data-cy="advanced-search" className="row mb-3">
            <div className="col-sm mb-3 mb-sm-0">
                <select data-cy="type" className="form-control" onChange={onChange} name="type" value={params.type}>
                    <option value="">select type</option>
                    {types.map((d, i) => <option key={i} value={d}>{d}</option>)}
                </select>
            </div>
            <div data-cy="year" className="col-sm mb-3 mb-sm-0"><input placeholder="Enter year. ex 2015" type="number" name="y" value={params.y} className="form-control" onChange={onChange} /></div>
            <div data-cy="page" className="col-sm mb-3 mb-sm-0"><input placeholder="Enter page. ex 1/2/3/4/5" type="number" name="page" value={params.page} className="form-control" onChange={onChange} /></div>
        </form>
    </React.Fragment>;
};

Advanced.propTypes = {
    store: PropTypes.object
};

export default observer(Advanced);