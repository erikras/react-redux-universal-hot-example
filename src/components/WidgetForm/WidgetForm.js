import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm, Field, getFormValues, SubmissionError } from 'redux-form';
import * as widgetActions from 'redux/modules/widgets';
import widgetValidation, { colors } from './widgetValidation';

/* eslint-disable react/prop-types */
const Input = ({ input, className, meta: { touched, error } }) => (
  <div>
    <input type="text" className={className} {...input} />
    {error && touched && <div className="text-danger">{error}</div>}
  </div>
);

const Select = ({ options, input, className, meta: { touched, error } }) => (
  <div>
    <select className={className} {...input}>
      {options.map(option => <option value={option} key={option}>{option}</option>)}
    </select>
    {error && touched && <div className="text-danger">{error}</div>}
  </div>
);
/* eslint-enable react/prop-types */

@reduxForm({
  form: 'widget',
  validate: widgetValidation
})
@connect(
  (state, props) => ({
    saveError: state.widgets.saveError,
    values: getFormValues(props.form)(state)
  }),
  { ...widgetActions }
)
export default class WidgetForm extends Component {
  static propTypes = {
    editStop: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    invalid: PropTypes.bool.isRequired,
    pristine: PropTypes.bool.isRequired,
    save: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    saveError: PropTypes.object.isRequired,
    form: PropTypes.string.isRequired,
    values: PropTypes.object.isRequired
  };

  render() {
    const {
      editStop, form, handleSubmit, invalid, pristine, save,
      submitting, saveError: { [form]: saveError }, values
    } = this.props;
    const styles = require('containers/Widgets/Widgets.scss');
    return (
      <tr className={submitting ? styles.saving : ''}>
        <td className={styles.idCol}>
          {values.id}
          <Field name="id" type="hidden" component="input" />
        </td>
        <td className={styles.colorCol}>
          <Field name="color" className="form-control" component={Select} options={colors} />
        </td>
        <td className={styles.sprocketsCol}>
          <Field name="sprocketCount" className="form-control" component={Input} />
        </td>
        <td className={styles.ownerCol}>
          <Field name="owner" className="form-control" component={Input} />
        </td>
        <td className={styles.buttonCol}>
          <button
            className="btn btn-default"
            onClick={() => editStop(form)}
            disabled={submitting}>
            <i className="fa fa-ban" /> Cancel
          </button>
          <button
            className="btn btn-success"
            onClick={handleSubmit(() => save(values)
              .catch(err => {
                if (typeof err === 'object') {
                  throw new SubmissionError(err);
                }
                return Promise.reject(err);
              })
            )}
            disabled={pristine || invalid || submitting}>
            <i className={`fa ${submitting ? 'fa-cog fa-spin' : 'fa-cloud'}`} /> Save
          </button>
          {saveError && <div className="text-danger">{saveError}</div>}
        </td>
      </tr>
    );
  }
}
