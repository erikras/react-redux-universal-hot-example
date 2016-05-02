import React, { Component } from 'react';
import {DataTable} from 'react-data-components';
import { GsFilter } from 'components';

import Helmet from 'react-helmet';

export default class MyAgency extends Component {
  render() {
    const styles = require('./MyAgency.scss');
    const appStyles = require('containers/App/App.scss');

    const gsOptions = {
      accounts: {
        selected: 'Meridian Health Systems'
      },
      coverages: {
        selected: 'Work Comp'
      },
      policyYears: {
        selected: '2012, 2013, 2014, 2015, 2016'
      },
      dateRange: {
        selected: {
          start: '01/01/2012',
          end: 'Presentt'
        }
      }
    };

    const columns = [
      { title: 'Name', prop: 'name' },
      { title: 'City', prop: 'city' },
      { title: 'Address', prop: 'address' },
      { title: 'Phone', prop: 'phone' }
    ];

    const data = [
      { name: 'name value', city: 'city value', address: 'address value', phone: 'phone value' }
      // It also supports arrays
      // [ 'name value', 'city value', 'address value', 'phone value' ]
    ];

    return (
      <div className={styles['my-agency']}>
        <Helmet title="My Agency"/>

        <div className="">
          <div className="wrapper wrapper-content animated fadeInRight">
            <GsFilter gsOptions={gsOptions} />
            <div className="row">
              <div className="col-lg-12">
                <div className="ibox float-e-margins">

                  <div className={'.ibox-title ' + appStyles['gs-ibox-title']}>
                    <span>Accounts</span>
                    <a href="" className="btn btn-primary btn-sm pull-right" ng-click="addAccount()">
                      <i className="fa fa-plus"></i>
                      Add account
                    </a>
                  </div>

                  <div className="ibox-content">

                    <DataTable
                      className="container"
                      keys={[ 'name', 'address' ]}
                      columns={columns}
                      initialData={data}
                      initialPageLength={5}
                      initialSortBy={{ prop: 'city', order: 'descending' }}
                      pageLengthOptions={[ 5, 20, 50 ]}
                    />

                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <div className="ibox float-e-margins">

                  <div className={appStyles['gs-ibox-title']}>
                    <span>Chart</span>
                    <a href="" className="btn btn-primary btn-sm pull-right" ng-click="addAccount()">
                      <i className="fa fa-plus"></i>
                      Add account
                    </a>
                  </div>

                  <div className="ibox-content">
                    Chart Here

                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }
}
