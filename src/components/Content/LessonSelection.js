import React, { Component } from 'react';
import createClass from 'create-react-class';
import PropTypes from 'prop-types';
import Select from 'react-select';
import fetch from 'isomorphic-fetch';
import * as lessonActions from 'redux/modules/lesson';
import {connect} from 'react-redux';

const { isLoaded, loadLessonsByName } = lessonActions;

@connect(
  state => ({
    lessons: state.lesson.lessons_by_name
  }),
  { ...lessonActions }
)

export default class LessonSelection extends Component{
	// displayName: 'GithubUsers'

	constructor(props) {
    super(props);
    this.state = {
			backspaceRemoves: true,
			multi: false,
			creatable: false,
		};
  }

	propTypes = {
		label: PropTypes.string,
		lessons: PropTypes.object,
	}

	onChange (value) {
		console.log(value);
		this.setState({
			value: value,
		});

		this.props.onChange(value);
	}

	switchToMulti () {
		this.setState({
			multi: true,
			value: [this.state.value],
		});
	}

	switchToSingle () {
		this.setState({
			multi: false,
			value: this.state.value ? this.state.value[0] : null
		});
	}

	getUsers (input) {

		if (!input) {
			return Promise.resolve({ options: [] });
		}

		// {"limit":10, "where":{"name":{"like":"%Present%","options":"i"}}} //for searching
		return fetch(`https://api.github.com/search/users?q=${input}`)
		// return fetch(`https://api.github.com/search/users?q=${encodeURI('{"limit":10, "where":{"name":{"like":"%Present%","options":"i"}}}')}`)
		.then((response) => response.json())
		.then((json) => {
			console.log(json.items);
			return { options: json.items };
		});
	}
	gotoUser (value, event) {
		window.open(value.html_url);
	}
	toggleBackspaceRemoves () {
		this.setState({
			backspaceRemoves: !this.state.backspaceRemoves
		});
	}
	toggleCreatable () {
		this.setState({
			creatable: !this.state.creatable
		});
	}
	render () {
		const AsyncComponent = this.state.creatable
			? Select.AsyncCreatable
			: Select.Async;

		return (
			<div className="section">
				<AsyncComponent
					multi={this.state.multi}
					value={this.state.value}
					onChange={this.onChange.bind(this)}
					onValueClick={(data) => {
						// this.gotoUser(data)
					}}
					valueKey="id"
					labelKey="name"
					loadOptions={(input) => {
						console.log(input);
						if (!input) {
							return Promise.resolve({ options: [] });
						}
						return this.props.loadLessonsByName(input)
						.then((response) => {
							console.log(JSON.stringify(response));

							// return {
							// 	options: [
							// 		{
							// 			"id": 12,
							// 			"login": "haha"
							// 		}
							// 	]
							// }
							return { options: response };
						})
						// .then((json) => {
						// 	console.log(json.items);
						// 	return { options: json.items };
						// });
						// this.getUsers(input);
					}}
					backspaceRemoves={this.state.backspaceRemoves} />
			</div>
		);
	}
}

// module.exports = LessonSelection;
