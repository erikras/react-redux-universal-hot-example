import React, {Component, PropTypes} from 'react';
import reduxForm from 'redux-form';
import surveyValidation from '../validation/surveyValidation';


@reduxForm('survey', surveyValidation)
export default
class Survey extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    visited: PropTypes.object.isRequired,
    handleChange: PropTypes.func.isRequired,
    showAll: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired
  }

  handleSubmit(event) {
    event.preventDefault();
    const {data, showAll, reset} = this.props;
    const errors = surveyValidation(data);
    if (Object.keys(errors).some(key => errors[key])) {
      showAll();
      window.alert('Form is invalid!');
    } else {
      window.alert('Data submitted! ' + JSON.stringify(this.props.data));
      reset();
    }
  }

  render() {
    const {
      data: {name, email, occupation},
      errors: {name: nameError, email: emailError, occupation: occupationError},
      visited: {name: nameVisited, email: emailVisited, occupation: occupationVisited},
      handleChange
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
          <li>Validation errors are only shown onChange and onBlur</li>
          <li><em>Except</em> when you submit the form, in which case they are shown for all invalid fields.</li>
        </ul>

        <form className="form-horizontal" onSubmit={::this.handleSubmit}>
          <div className={'form-group' + (nameError && nameVisited ? ' has-error' : '')}>
            <label htmlFor="name" className="col-sm-2">Full Name</label>

            <div className="col-sm-10">
              <input type="text"
                     className="form-control"
                     id="name"
                     value={name}
                     onChange={handleChange('name')}
                     onBlur={handleChange('name')}/>
              {nameError && nameVisited && <div className="text-danger">{nameError}</div>}
            </div>
          </div>
          <div className={'form-group' + (emailError && emailVisited ? ' has-error' : '')}>
            <label htmlFor="email" className="col-sm-2">Email address</label>

            <div className="col-sm-10">
              <input type="email"
                     className="form-control"
                     id="email"
                     value={email}
                     onChange={handleChange('email')}
                     onBlur={handleChange('email')}/>
              {emailError && emailVisited && <div className="text-danger">{emailError}</div>}
            </div>
          </div>
          <div className={'form-group' + (occupationError && occupationVisited ? ' has-error' : '')}>
            <label htmlFor="occupation" className="col-sm-2">Occupation</label>

            <div className="col-sm-10">
              <input type="text"
                     className="form-control"
                     id="occupation"
                     value={occupation}
                     onChange={handleChange('occupation')}
                     onBlur={handleChange('occupation')}/>
              {occupationError && occupationVisited && <div className="text-danger">{occupationError}</div>}
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
      </div>
    );
  }
}

