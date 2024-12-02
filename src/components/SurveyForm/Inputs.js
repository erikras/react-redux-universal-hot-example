import React from 'react';

const styles = require('./SurveyForm.scss');

const flags = (field) =>
  <div className={styles.flags}>
    {field.dirty && <span className={styles.dirty} title="Dirty">D</span>}
    {field.active && <span className={styles.active} title="Active">A</span>}
    {field.visited && <span className={styles.visited} title="Visited">V</span>}
    {field.touched && <span className={styles.touched} title="Touched">T</span>}
  </div>;


export const input = (field, label, asyncValidating, showAsyncValidating) =>
  <div className={'form-group' + (field.error && field.touched ? ' has-error' : '')}>
    <label htmlFor={field.name} className="col-sm-2">{label}</label>
    <div className={'col-sm-8 ' + styles.inputGroup}>
      {showAsyncValidating && asyncValidating && <i className={'fa fa-cog fa-spin ' + styles.cog}/>}
      <input type="text" className="form-control" id={field.name} {...field}/>
      {field.error && field.touched && <div className="text-danger">{field.error}</div>}
      {flags(field)}
    </div>
  </div>;

export const textArea = (field, label, asyncValidating, showAsyncValidating) =>
  <div className={'form-group' + (field.error && field.touched ? ' has-error' : '')}>
    <label htmlFor={field.name} className="col-sm-2">{label}</label>
    <div className={'col-sm-8 ' + styles.inputGroup}>
      {showAsyncValidating && asyncValidating && <i className={'fa fa-cog fa-spin ' + styles.cog}/>}
      <textarea type="text" className="form-control" id={field.name} {...field}/>
      {field.error && field.touched && <div className="text-danger">{field.error}</div>}
      {flags(field)}
    </div>
  </div>;

export const selector = (inputs, field, label, asyncValidating, showAsyncValidating) =>
  <div className={'form-group' + (field.error && field.touched ? ' has-error' : '')}>
    <label htmlFor={field.name} className="col-sm-2">{label}</label>
    <div className={'col-sm-8 ' + styles.inputGroup}>
      {showAsyncValidating && asyncValidating && <i className={'fa fa-cog fa-spin ' + styles.cog}/>}
      <select className="form-control" id={field.name} {...field}>
         {
           inputs.map((data) => {
             return <option key={data.show} value={data.value}>{data.show}</option>;
           })
         }
      </select>
      {field.error && field.touched && <div className="text-danger">{field.error}</div>}
      {flags(field)}
    </div>
  </div>;
