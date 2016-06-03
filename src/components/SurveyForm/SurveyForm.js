import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import surveyValidation from './surveyValidation';
import * as surveyActions from 'redux/modules/survey';

function asyncValidate(data, dispatch, {isValidEmail}) {
  if (!data.email) {
    return Promise.resolve({});
  }
  return isValidEmail(data);
}
@connect(() => ({}),
  dispatch => bindActionCreators(surveyActions, dispatch)
)
@reduxForm({
  form: 'survey',
  fields: ['name', 'email', 'occupation', 'currentlyEmployed', 'sex'],
  validate: surveyValidation,
  asyncValidate,
  asyncBlurFields: ['email']
})
export default
class SurveyForm extends Component {
  static propTypes = {
    active: PropTypes.string,
    asyncValidating: PropTypes.bool.isRequired,
    fields: PropTypes.object.isRequired,
    dirty: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired,
    invalid: PropTypes.bool.isRequired,
    pristine: PropTypes.bool.isRequired,
    valid: PropTypes.bool.isRequired
  }

  render() {
    const {
      asyncValidating,
      dirty,
      fields: {name, email, occupation, currentlyEmployed, sex},
      active,
      handleSubmit,
      invalid,
      resetForm,
      pristine,
      valid
      } = this.props;
    const styles = require('./SurveyForm.scss');
    const renderInput = (field, label, showAsyncValidating) =>
      <div class={'form-group' + (field.error && field.touched ? ' has-error' : '')}>
        <label htmlFor={field.name} class="col-sm-2">{label}</label>
        <div class={'col-sm-8 ' + styles.inputGroup}>
          {showAsyncValidating && asyncValidating && <i class={'fa fa-cog fa-spin ' + styles.cog}/>}
          <input type="text" class="form-control" id={field.name} {...field}/>
          {field.error && field.touched && <div class="text-danger">{field.error}</div>}
          <div class={styles.flags}>
            {field.dirty && <span class={styles.dirty} title="Dirty">D</span>}
            {field.active && <span class={styles.active} title="Active">A</span>}
            {field.visited && <span class={styles.visited} title="Visited">V</span>}
            {field.touched && <span class={styles.touched} title="Touched">T</span>}
          </div>
        </div>
      </div>;

    return (
      <div>
        <form class="form-horizontal" onSubmit={handleSubmit}>
          {renderInput(name, 'Full Name')}
          {renderInput(email, 'Email', true)}
          {renderInput(occupation, 'Occupation')}
          <div class="form-group">
            <label htmlFor="currentlyEmployed" class="col-sm-2">Currently Employed?</label>
            <div class="col-sm-8">
              <input type="checkbox" id="currentlyEmployed" {...currentlyEmployed}/>
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-2">Sex</label>
            <div class="col-sm-8">
              <input type="radio" id="sex-male" {...sex} value="male" checked={sex.value === 'male'}/>
              <label htmlFor="sex-male" class={styles.radioLabel}>Male</label>
              <input type="radio" id="sex-female" {...sex} value="female" checked={sex.value === 'female'}/>
              <label htmlFor="sex-female" class={styles.radioLabel}>Female</label>
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-offset-2 col-sm-10">
              <button class="btn btn-success" onClick={handleSubmit}>
                <i class="fa fa-paper-plane"/> Submit
              </button>
              <button class="btn btn-warning" onClick={resetForm} style={{marginLeft: 15}}>
                <i class="fa fa-undo"/> Reset
              </button>
            </div>
          </div>
        </form>

        <h4>Props from redux-form</h4>

        <table class="table table-striped">
          <tbody>
          <tr>
            <th>Active Field</th>
            <td>{active}</td>
          </tr>
          <tr>
            <th>Dirty</th>
            <td class={dirty ? 'success' : 'danger'}>{dirty ? 'true' : 'false'}</td>
          </tr>
          <tr>
            <th>Pristine</th>
            <td class={pristine ? 'success' : 'danger'}>{pristine ? 'true' : 'false'}</td>
          </tr>
          <tr>
            <th>Valid</th>
            <td class={valid ? 'success' : 'danger'}>{valid ? 'true' : 'false'}</td>
          </tr>
          <tr>
            <th>Invalid</th>
            <td class={invalid ? 'success' : 'danger'}>{invalid ? 'true' : 'false'}</td>
          </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
