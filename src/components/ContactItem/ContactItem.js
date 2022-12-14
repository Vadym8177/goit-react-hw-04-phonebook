import css from './ContactItem.module.css';
import PropTypes from 'prop-types';

export function ContactItem({ name, id, number, onDeleteContact }) {
  return (
    <>
      <li className={css.item}>
        {name}: {number}
        <button
          type="button"
          className={css.itemBtn}
          onClick={() => onDeleteContact(id)}
        >
          Delete
        </button>
      </li>
    </>
  );
}
ContactItem.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};

export default ContactItem;
