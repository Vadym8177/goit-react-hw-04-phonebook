import css from './Filter.module.css';
import PropTypes from 'prop-types';

export const Filter = ({ value, onChange }) => {
  return (
    <label className={css.formLabel}>
      Find contacts by name
      <input
        type="text"
        value={value}
        onChange={onChange}
        className={css.formInput}
      ></input>
    </label>
  );
};

Filter.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};
