import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import reduxForm from 'redux-form';
import surveyValidation from '../validation/surveyValidation';

function asyncValidate(data) {
  // TODO: figure out a way to move this to the server. need an instance of ApiClient
  if (!data.email) {
    return Promise.resolve({valid: true});
  }
  return new Promise((resolve) => {
    setTimeout(() => {
      const errors = {valid:true};
      if (~['bobby@gmail.com', 'timmy@microsoft.com'].indexOf(data.email)) {
        errors.email = 'Email address already used';
        errors.valid = false;
      }
      resolve(errors);
    }, 1000);
  });
}

@connect(state => ({
  form: state.survey
}))
@reduxForm('survey', surveyValidation, {validate: asyncValidate, fields: ['email']})
export default
class Survey extends Component {
  static propTypes = {
    asyncValidating: PropTypes.bool.isRequired,
    data: PropTypes.object.isRequired,
    dirty: PropTypes.bool.isRequired,
    errors: PropTypes.object.isRequired,
    handleBlur: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    initializeForm: PropTypes.func.isRequired,
    invalid: PropTypes.bool.isRequired,
    pristine: PropTypes.bool.isRequired,
    touch: PropTypes.func.isRequired,
    touched: PropTypes.object.isRequired,
    touchAll: PropTypes.func.isRequired,
    untouch: PropTypes.func.isRequired,
    untouchAll: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired,
    valid: PropTypes.bool.isRequired
  }

  handleSubmit(event) {
    event.preventDefault();
    const {data, touchAll, resetForm, valid} = this.props;
    asyncValidate(data)
      .then(errors => {
        if (valid && !Object.keys(errors).length) {
          window.alert('Data submitted! ' + JSON.stringify(data));
          resetForm();
        } else {
          touchAll();
          window.alert('Form is invalid!');
        }
      })
  }

  handleInitialize() {
    const {initializeForm} = this.props;
    initializeForm({name: 'Little Bobby Tables', email: 'bobby@gmail.com', occupation: 'Redux Wizard'});
  }

  render() {
    const {
      data: {name, email, occupation},
      errors: {name: nameError, email: emailError, occupation: occupationError},
      touched: {name: nameTouched, email: emailTouched, occupation: occupationTouched},
      asyncValidating,
      handleBlur,
      handleChange,
      valid,
      invalid,
      pristine,
      dirty
      } = this.props;
    return (
      <div className="container">
        <h1>Survey</h1>

        <p>
          This is an example of a form in redux in which all the state is kept within the redux store.
          All the components are pure "dumb" components.
        </p>

        <p>
          Things to notice:
        </p>

        <ul>
          <li>No validation errors are shown initially.</li>
          <li>Validation errors are only shown onBlur</li>
          <li>Validation errors are hidden onChange when the error is rectified</li>
          <li><code>valid</code>, <code>invalid</code>, <code>pristine</code> and <code>dirty</code> flags
            are passed with each change
          </li>
          <li><em>Except</em> when you submit the form, in which case they are shown for all invalid fields.</li>
          <li>If you click the Initialize Form button, the form will be prepopupated with some values and
            the <code>pristine</code> and <code>dirty</code> flags will be based on those values.
          </li>
        </ul>

        <div style={{textAlign: 'center', margin: 15}}>
          <button className="btn btn-primary" onClick={::this.handleInitialize}>Initialize Form</button>
        </div>
        <form className="form-horizontal" onSubmit={::this.handleSubmit}>
          <div className={'form-group' + (nameError && nameTouched ? ' has-error' : '')}>
            <label htmlFor="name" className="col-sm-2">Full Name</label>

            <div className="col-sm-10">
              <input type="text"
                     className="form-control"
                     id="name"
                     value={name}
                     onChange={handleChange('name')}
                     onBlur={handleBlur('name')}/>
              {nameError && nameTouched && <div className="text-danger">{nameError}</div>}
            </div>
          </div>
          <div className={'form-group' + (emailError && emailTouched ? ' has-error' : '')}>
            <label htmlFor="email" className="col-sm-2">Email address</label>

            <div className="col-sm-10">
              <input type="email"
                     className="form-control"
                     id="email"
                     value={email}
                     onChange={handleChange('email')}
                     onBlur={handleBlur('email')}/>
              {emailError && emailTouched && <div className="text-danger">{emailError}</div>}
              {asyncValidating && <div>Validating...</div>}
            </div>
          </div>
          <div className={'form-group' + (occupationError && occupationTouched ? ' has-error' : '')}>
            <label htmlFor="occupation" className="col-sm-2">Occupation</label>

            <div className="col-sm-10">
              <input type="text"
                     className="form-control"
                     id="occupation"
                     value={occupation}
                     onChange={handleChange('occupation')}
                     onBlur={handleBlur('occupation')}/>
              {occupationError && occupationTouched && <div className="text-danger">{occupationError}</div>}
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-offset-2 col-sm-10">
              <button className="btn btn-success" onClick={::this.handleSubmit}>
                <i className="fa fa-paper-airplane"/> Submit
              </button>
            </div>
          </div>
        </form>

        <p>
          Pardon the use of <code>window.alert()</code>, but I wanted to keep this component stateless.
        </p>

        <h4>Props from redux-form</h4>

        <table className="table table-striped">
          <tbody>
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

