import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {initialize} from 'redux-form';
import {SurveyForm} from 'components';

@connect(
  () => ({}),
  {initialize})
export default class Survey extends Component {
  static propTypes = {
    initialize: PropTypes.func.isRequired
  }

  handleSubmit = (data) => {
    window.alert('Data submitted! ' + JSON.stringify(data));
    this.props.initialize('survey', {});
  }

  handleInitialize = () => {
    this.props.initialize('survey', {
      name: 'Little Bobby Tables',
      email: 'bobby@gmail.com',
      occupation: 'Redux Wizard',
      currentlyEmployed: true,
      sex: 'male'
    });
  }

  render() {
    return (
      <div className="container">
        <h1>Survey</h1>
        <Helmet title="Survey"/>

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

        <p>
          Pardon the use of <code>window.alert()</code>, but I wanted to keep this component stateless.
        </p>

        <div style={{textAlign: 'center', margin: 15}}>
          <button className="btn btn-primary" onClick={this.handleInitialize}>
            <i className="fa fa-pencil"/> Initialize Form
          </button>
        </div>

        <p>The circles to the left of the inputs correspond to flags provided by <code>redux-form</code>:
          Touched, Visited, Active, and Dirty.</p>

        <SurveyForm onSubmit={this.handleSubmit}/>
      </div>
    );
  }
}
