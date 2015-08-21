import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import reduxForm from 'redux-form';
import widgetValidation, {colors} from '../validation/widgetValidation';
import * as widgetActions from '../ducks/widgets';

@connect(
  state => ({
    form: state.widgetForm,
    saveError: state.widgets.saveError
  }),
  dispatch => ({
    ...bindActionCreators(widgetActions, dispatch),
    dispatch
  })
)
@reduxForm('widgetForm', widgetValidation)
export default class WidgetForm extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    editStop: PropTypes.func.isRequired,
    handleBlur: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    invalid: PropTypes.bool.isRequired,
    pristine: PropTypes.bool.isRequired,
    save: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    saveError: PropTypes.string,
    sliceKey: PropTypes.string.isRequired,
    touched: PropTypes.object.isRequired
  };

  render() {
    const {sliceKey} = this.props;
    const { data, editStop, errors, handleBlur, handleChange, handleSubmit, invalid,
      pristine, save, submitting, saveError: { [sliceKey]: saveError }, touched } = this.props;
    const styles = require('../views/Widgets.scss');
    return (
      <tr className={submitting ? styles.saving : ''}>
        <td className={styles.idCol}>{data.id}</td>
        <td className={styles.colorCol}>
          <select name="color"
                  className="form-control"
                  value={data.color}
                  onChange={handleChange('color')}
                  onBlur={handleBlur('color')}>
            {colors.map(color => <option value={color} key={color}>{color}</option>)}
          </select>
          {errors.color && touched.color && <div className="text-danger">{errors.color}</div>}
        </td>
        <td className={styles.sprocketsCol}>
          <input type="text"
                 className="form-control"
                 value={data.sprocketCount}
                 onChange={handleChange('sprocketCount')}
                 onBlur={handleBlur('sprocketCount')}/>
          {errors.sprocketCount && touched.sprocketCount && <div className="text-danger">{errors.sprocketCount}</div>}
        </td>
        <td className={styles.ownerCol}>
          <input type="text"
                 className="form-control"
                 value={data.owner}
                 onChange={handleChange('owner')}
                 onBlur={handleBlur('owner')}/>
          {errors.owner && touched.owner && <div className="text-danger">{errors.owner}</div>}
        </td>
        <td className={styles.buttonCol}>
          <button className="btn btn-default"
                  onClick={() => editStop(sliceKey)}
                  disabled={submitting}>
            <i className="fa fa-ban"/> Cancel
          </button>
          <button className="btn btn-success"
                  onClick={handleSubmit(() => save(data))}
                  disabled={pristine || invalid || submitting}>
            <i className={'fa ' + (submitting ? 'fa-cog fa-spin' : 'fa-cloud')}/> Save
          </button>
          {saveError && <div className="text-danger">{saveError}</div>}
        </td>
      </tr>
    );
  }
}
