import React from 'react';
import PropTypes from 'prop-types';

const List = props => {
    const { data } = props;
    // return <div data-cy="list" className="row">
    //     {data.map((d, i) => <div key={i} className="col">
    //         <div className="card border shadow">
    //             {d.Title}
    //         </div>
    //     </div>)}
    // </div>;

    return <div className="row">
        {Array.from({ length: 5 }).map((d, i) => <div key={i} className="col-4 mb-3">
            <div className="card border shadow">
                <div className="row no-gutters">
                    <div className="col-auto">
                        <img className="card-img" src="https://via.placeholder.com/150" alt="" />
                    </div>
                    <div className="col">
                        <div className="card-body">
                            <div className="card-title">Title</div>
                            <div className="card-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, voluptates?</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>)}
    </div>;
};

List.propTypes = {
    data: PropTypes.array
};

export default List;