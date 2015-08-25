import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import reduxForm from 'redux-form';
import surveyValidation from '../validation/surveyValidation';
import mapProps from 'map-props';

function asyncValidator(data) {
  // TODO: figure out a way to move this to the server. need an instance of ApiClient
  if (!data.email) {
    return Promise.resolve({valid: true});
  }
  return new Promise((resolve) => {
    setTimeout(() => {
      const errors = {valid: true};
      if (~['bobby@gmail.com', 'timmy@microsoft.com'].indexOf(data.email)) {
        errors.email = 'Email address already used';
        errors.valid = false;
      }
      resolve(errors);
    }, 1000);
  });
}

@connect(state => ({
  form: state.form
}))
@reduxForm('survey', ['name','email','occupation'], surveyValidation).async(asyncValidator, 'email')
@mapProps({
  hasEmail: props => !!props.data.email
})
export default
class SurveyForm extends Component {
  static propTypes = {
    asyncValidating: PropTypes.bool.isRequired,
    data: PropTypes.object.isRequired,
    dirty: PropTypes.bool.isRequired,
    errors: PropTypes.object.isRequired,
    hasEmail: PropTypes.bool.isRequired,
    handleBlur: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    invalid: PropTypes.bool.isRequired,
    pristine: PropTypes.bool.isRequired,
    touched: PropTypes.object.isRequired,
    valid: PropTypes.bool.isRequired
  }

  render() {
    const {
      data: {name, email, occupation},
      errors: {name: nameError, email: emailError, occupation: occupationError},
      touched: {name: nameTouched, email: emailTouched, occupation: occupationTouched},
      asyncValidating,
      handleBlur,
      handleChange,
      handleSubmit,
      hasEmail,
      valid,
      invalid,
      pristine,
      dirty
      } = this.props;
    return (
      <div>
        <form className="form-horizontal" onSubmit={handleSubmit}>
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
              <button className="btn btn-success" onClick={handleSubmit}>
                <i className="fa fa-paper-airplane"/> Submit
              </button>
            </div>
          </div>
        </form>
        {hasEmail && <div>We have email data!</div>}

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

