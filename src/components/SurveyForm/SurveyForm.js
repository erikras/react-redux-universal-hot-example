import React, { Component, PropTypes } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import surveyValidation from './surveyValidation';
import { isValidEmail } from 'redux/modules/survey';

function asyncValidate(data, dispatch) {
  if (!data.email) return Promise.resolve();
  return dispatch(isValidEmail(data));
}

@reduxForm({
  form: 'survey',
  validate: surveyValidation,
  asyncValidate,
  asyncBlurFields: ['email']
})
@connect(
  state => ({
    active: state.form.survey.active
  })
)
export default
class SurveyForm extends Component {
  static propTypes = {
    active: PropTypes.string,
    asyncValidating: PropTypes.bool.isRequired,
    dirty: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
    invalid: PropTypes.bool.isRequired,
    pristine: PropTypes.bool.isRequired,
    valid: PropTypes.bool.isRequired
  }

  renderInput = ({
    input, label, type, showAsyncValidating, className, styles,
    meta: { touched, error, dirty, active, visited, asyncValidating }
  }) =>
    <div className={`form-group ${error && touched ? 'has-error' : ''}`}>
      <label htmlFor={input.name} className="col-sm-2">{label}</label>
      <div className={`col-sm-8 ${styles.inputGroup}`}>
        {showAsyncValidating && asyncValidating && <i className={`fa fa-cog fa-spin ${styles.cog}`} />}
        <input {...input} type={type} className={className} id={input.name} />
        {error && touched && <div className="text-danger">{error}</div>}
        <div className={styles.flags}>
          {dirty && <span className={styles.dirty} title="Dirty">D</span>}
          {active && <span className={styles.active} title="Active">A</span>}
          {visited && <span className={styles.visited} title="Visited">V</span>}
          {touched && <span className={styles.touched} title="Touched">T</span>}
        </div>
      </div>
    </div>;

  render() {
    const {
      asyncValidating,
      dirty,
      active,
      handleSubmit,
      invalid,
      reset,
      pristine,
      valid
    } = this.props;
    const styles = require('./SurveyForm.scss');

    return (
      <div>
        <form className="form-horizontal" onSubmit={handleSubmit}>
          <Field name="name" type="text" component={this.renderInput} label="Full Name"
            className="form-control" asyncValidating={asyncValidating} styles={styles} />

          <Field name="email" type="text" component={this.renderInput} label="Email"
            className="form-control" asyncValidating={asyncValidating} styles={styles} showAsyncValidating />

          <Field name="occupation" type="text" component={this.renderInput} label="Occupation"
            className="form-control" asyncValidating={asyncValidating} styles={styles} />

          <Field name="currentlyEmployed" type="checkbox" component={this.renderInput}
            label="Currently Employed?" asyncValidating={asyncValidating} styles={styles} />

          <div className="form-group">
            <label className="col-sm-2" htmlFor="sex">Sex</label>
            <div className="col-sm-8">
              <label htmlFor="sex-male" className={styles.radioLabel}>
                <Field name="sex" component="input" type="radio" id="sex-male" value="male" /> Male
              </label>
              <label htmlFor="sex-female" className={styles.radioLabel}>
                <Field name="sex" component="input" type="radio" id="sex-female" value="female" /> Female
              </label>
            </div>
          </div>

          <div className="form-group">
            <div className="col-sm-offset-2 col-sm-10">
              <button className="btn btn-success" onClick={handleSubmit}>
                <i className="fa fa-paper-plane" /> Submit
              </button>
              <button className="btn btn-warning" type="button" onClick={reset} style={{ marginLeft: 15 }}>
                <i className="fa fa-undo" /> Reset
              </button>
            </div>
          </div>
        </form>

        <h4>Props from redux-form</h4>

        <table className="table table-striped">
          <tbody>
            <tr>
              <th>Active Field</th>
              <td>{active}</td>
            </tr>
            <tr>
              <th>Dirty</th>
              <td className={dirty ? 'success' : 'danger'}>{dirty ? 'true' : 'false'}</td>
            </tr>
            <tr>
              <th>Pristine</th>
              <td className={pristine ? 'success' : 'danger'}>{pristine ? 'true' : 'false'}</td>
            </tr>
            <tr>
              <th>Valid</th>
              <td className={valid ? 'success' : 'danger'}>{valid ? 'true' : 'false'}</td>
            </tr>
            <tr>
              <th>Invalid</th>
              <td className={invalid ? 'success' : 'danger'}>{invalid ? 'true' : 'false'}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
