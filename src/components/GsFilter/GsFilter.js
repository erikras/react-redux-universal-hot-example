import React from 'react';

const GsFilter = (props) => {
  const {accounts, coverages, dateRange, policyYears} = props.gsOptions;

  return (
    <div className="row gs-transparent-row">
      <div className="col-lg-12">
        <div className="ibox float-e-margins">
          <div className="ibox-title">

          </div>

          <div className="ibox-content m-b-sm">
            <div className="row">
              <div className="col-sm-4">
                <div className="form-group">
                  <label className="control-label" htmlFor="account">Account:</label>
                  <select name="status" id="account" className="form-control">
                    <option value="1" selected="">{accounts.selected}</option>
                    <option value="0">Disabled</option>
                  </select>
                </div>
              </div>
              <div className="col-sm-4">
                <div className="form-group">
                  <label className="control-label" htmlFor="coverageType">Coverage Type:</label>
                  <select name="status" id="coverageType" className="form-control">
                    <option value="1" selected="">{coverages.selected}</option>
                    <option value="0">Disabled</option>
                  </select>
                </div>
              </div>
              <div className="col-sm-4">
                <div className="form-group">
                  <label className="control-label" htmlFor="dateRange">Date Range:</label>
                  <select name="status" id="dateRange" className="form-control">
                    <option value="1" selected="">{dateRange.selected.start + ' - ' + dateRange.selected.end}</option>
                    <option value="0">Disabled</option>
                  </select>
                </div>
              </div>
              <div className="col-sm-4">
                <div className="form-group">
                  <label className="control-label" htmlFor="dateRange">Policy Years:</label>
                  <select name="status" id="dateRange" className="form-control">
                    <option value="1" selected="">{policyYears.selected}</option>
                    <option value="0">Disabled</option>
                  </select>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

GsFilter.propTypes = {
  gsOptions: React.PropTypes.object,
  accounts: React.PropTypes.object,
  coverages: React.PropTypes.object,
  policyYears: React.PropTypes.object,
  // type: React.PropTypes.object.isRequired(['star', 'watch', 'fork', 'follow']).isRequired,
  dateRange: React.PropTypes.object
};

export default GsFilter;

