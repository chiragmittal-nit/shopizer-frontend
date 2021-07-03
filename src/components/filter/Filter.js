import React from 'react';
import { connect } from 'react-redux';
import { setFilterOptions } from '../../redux/slices/product';

function Filter({ setFilterOptions }) {
  const [searchKey, setSearchKey] = React.useState('');
  const [sortBy, setSortBy] = React.useState('popular');
  const [category, setCategory] = React.useState('all');
  return (
    <div className="row justify-content-center shadow p-3 mb-5 bg-white rounded">
      <div className="col-md-3 ml-2">
        <input
          className="form-control"
          value={searchKey}
          onChange={(e) => {
            setSearchKey(e.target.value);
          }}
          type="text"
          placeholder="search products"
        />
      </div>

      <div className="col-md-2 ml-2">
        <select
          className="form-select"
          value={sortBy}
          onChange={(e) => {
            setSortBy(e.target.value);
          }}
        >
          <option value="popular">Popular</option>
          <option value="highToLow">high to Low</option>
          <option value="lowToHigh">Low To High</option>
        </select>
      </div>

      <div className="col-md-2 ml-2">
        <select
          className="form-select"
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
          }}
        >
          <option value="all">All</option>
          <option value="electronics">Electronics</option>
          <option value="fashion">fashion</option>
          <option value="mobiles">Mobiles</option>
          <option value="games">Games</option>
        </select>
      </div>

      <div className="col-md-2  ml-2">
        <button
          className="btn btn-dark"
          onClick={() => setFilterOptions(searchKey, sortBy, category)}
        >
          SEARCH
        </button>
      </div>
    </div>
  );
}
const mapDispatchToProps = (dispatch) => ({
  setFilterOptions: (searchKey, sortBy, category) =>
    dispatch(setFilterOptions({ searchKey, sortBy, category })),
});
export default connect(null, mapDispatchToProps)(Filter);
