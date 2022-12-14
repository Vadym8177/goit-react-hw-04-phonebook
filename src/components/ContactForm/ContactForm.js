import { Component } from 'react';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import css from './ContactForm.module.css';

export class ContactForm extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onCheck: PropTypes.func.isRequired,
  };
  state = {
    name: '',
    number: '',
  };

  handleChange = e => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { name, number } = this.state;

    const validate = this.formValidate();
    if (!validate) return;

    this.props.onSubmit({ id: nanoid(), name, number });
    this.setState({ name: '', number: '' });
  };
  formValidate = () => {
    const { name, number } = this.state;
    const { onCheck } = this.props;
    if (!name || !number) {
      alert(`${name} is already in contacts`);
      return;
    }
    return onCheck(name);
  };
  render() {
    const { name, number } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
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
              onChange={this.handleChange}
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
              onChange={this.handleChange}
              className={css.formInput}
            />
          </label>
          <button type="submit" className={css.formBtn}>
            Add contact
          </button>
        </div>
      </form>
    );
  }
}
