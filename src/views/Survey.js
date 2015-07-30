import React, {Component, PropTypes} from 'react';
import {formChange} from '../actions/formActions';
import reduxForm from 'redux-form';
import {relativeToSrc} from '../util';

@reduxForm('survey', formChange)
export default
class Survey extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    handleChange: PropTypes.func.isRequired
  }

  handleSubmit(event) {
    event.preventDefault();
    console.info('submitted', this.props.data);
  }

  render() {
    const {
      data: {name, email, occupation},
      errors: {name: nameError, email: emailError, occupation: occupationError},
      handleChange
      } = this.props;
    console.info('dog', this.props.errors, nameError, emailError);
    return (
      <div className="container">
        <h1>Survey</h1>

        <p>
          This is an example of a form in redux in which all the state is kept within the redux store.
          All the components are pure "dumb" components.
        </p>

        <div>
          <form className="form-horizontal" onSubmit={::this.handleSubmit}>
            <div className={'form-group' + (nameError ? ' has-error' : '')}>
              <label htmlFor="name" className="col-sm-2">Full Name</label>

              <div className="col-sm-10">
                <input type="text"
                       className="form-control"
                       id="name"
                       value={name}
                       onChange={handleChange('name')}/>
                {nameError && <div className="text-danger">{nameError}</div>}
              </div>
            </div>
            <div className={'form-group' + (emailError ? ' has-error' : '')}>
              <label htmlFor="email" className="col-sm-2">Email address</label>

              <div className="col-sm-10">
                <input type="email"
                       className="form-control"
                       id="email"
                       value={email}
                       onChange={handleChange('email')}/>
                {emailError && <div className="text-danger">{emailError}</div>}
              </div>
            </div>
            <div className={'form-group' + (occupationError ? ' has-error' : '')}>
              <label htmlFor="occupation" className="col-sm-2">Email address</label>

              <div className="col-sm-10">
                <input type="text"
                       className="form-control"
                       id="occupation"
                       value={occupation}
                       onChange={handleChange('occupation')}/>
                {occupationError && <div className="text-danger">{occupationError}</div>}
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
        </div>
        <div>Name: {name}</div>
      </div>
    );
  }
}

