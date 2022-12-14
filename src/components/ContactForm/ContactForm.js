import { useState } from 'react';
import { nanoid } from 'nanoid';
import css from './ContactForm.module.css';
import PropTypes from 'prop-types';

export const ContactForm = ({ onSubmit, onCheck }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = e => {
    const { name, value } = e.currentTarget;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        return;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    const validate = formValidate();
    if (!validate) return;

    onSubmit({ id: nanoid(), name, number });
    setName('');
    setNumber('');
  };
  const formValidate = () => {
    if (!name || !number) {
      alert(`${name} is already in contacts`);
      return;
    }
    return onCheck(name);
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className={css.formBox}>
        <label htmlFor={nanoid()} className={css.formLabel}>
          Name
          <input
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            id={nanoid()}
            value={name}
            onChange={handleChange}
            className={css.formInput}
          />
        </label>
        <label htmlFor={nanoid()} className={css.formLabel}>
          Number
          <input
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            id={nanoid()}
            value={number}
            onChange={handleChange}
            className={css.formInput}
          />
        </label>
        <button type="submit" className={css.formBtn}>
          Add contact
        </button>
      </div>
    </form>
  );
};

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onCheck: PropTypes.func.isRequired,
};
