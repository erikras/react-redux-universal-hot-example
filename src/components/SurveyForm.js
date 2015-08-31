import React, {Component, PropTypes} from 'react';
import {connectReduxForm} from 'redux-form';
import surveyValidation from '../validation/surveyValidation';
import mapProps from 'map-props';

function asyncValidate(data) {
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

@connectReduxForm({
  form: 'survey',
  fields: ['name', 'email', 'occupation'],
  validate: surveyValidation,
  asyncValidate,
  asyncBlurFields: ['email']
})
export default
class SurveyForm extends Component {
  static propTypes = {
    asyncValidating: PropTypes.bool.isRequired,
    fields: PropTypes.object.isRequired,
    dirty: PropTypes.bool.isRequired,
    handleBlur: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
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
      fields: {name, email, occupation},
      handleBlur,
      handleChange,
      handleSubmit,
      invalid,
      resetForm,
      pristine,
      valid
      } = this.props;
    return (
      <div>
        <form className="form-horizontal" onSubmit={handleSubmit}>
          <div className={'form-group' + (name.error && name.touched ? ' has-error' : '')}>
            <label htmlFor="name" className="col-sm-2">
              Full Name
              {name.dirty && <span>*</span>}
            </label>

            <div className="col-sm-10">
              <input type="text"
                     className="form-control"
                     id="name"
                     value={name.value}
                     onChange={handleChange('name')}
                     onBlur={handleBlur('name')}/>
              {name.error && name.touched && <div className="text-danger">{name.error}</div>}
            </div>
          </div>
          <div className={'form-group' + (email.error && email.touched ? ' has-error' : '')}>
            <label htmlFor="email" className="col-sm-2">
              Email address
              {email.dirty && <span>*</span>}
            </label>

            <div className="col-sm-10">
              <input type="email"
                     className="form-control"
                     id="email"
                     value={email.value}
                     onChange={handleChange('email')}
                     onBlur={handleBlur('email')}/>
              {email.error && email.touched && <div className="text-danger">{email.error}</div>}
              {asyncValidating && <div>Validating...</div>}
            </div>
          </div>
          <div className={'form-group' + (occupation.error && occupation.touched ? ' has-error' : '')}>
            <label htmlFor="occupation" className="col-sm-2">
              Occupation
              {occupation.dirty && <span>*</span>}
            </label>

            <div className="col-sm-10">
              <input type="text"
                     className="form-control"
                     id="occupation"
                     value={occupation.value}
                     onChange={handleChange('occupation')}
                     onBlur={handleBlur('occupation')}/>
              {occupation.error && occupation.touched && <div className="text-danger">{occupation.error}</div>}
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-offset-2 col-sm-10">
              <button className="btn btn-success" onClick={handleSubmit}>
                <i className="fa fa-paper-plane"/> Submit
              </button>
              <button className="btn btn-warning" onClick={resetForm} style={{marginLeft:15}}>
                <i className="fa fa-undo"/> Reset
              </button>
            </div>
          </div>
        </form>

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

