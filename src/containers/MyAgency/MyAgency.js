import React, { Component } from 'react';

import Helmet from 'react-helmet';
import {DataTable} from 'react-data-components';

export default class Home extends Component {
  render() {
    const styles = require('./MyAgency.scss');

    var columns = [
      { title: 'Name', prop: 'name'  },
      { title: 'City', prop: 'city' },
      { title: 'Address', prop: 'address' },
      { title: 'Phone', prop: 'phone' }
    ];

    var data = [
      { name: 'name value', city: 'city value', address: 'address value', phone: 'phone value' }
      // It also supports arrays
      // [ 'name value', 'city value', 'address value', 'phone value' ]
    ];

    return (
      <div className={styles['my-agency']}>
        <Helmet title="My Agency"/>

        <div className="">
          <div className="wrapper wrapper-content animated fadeInRight">
            <div className="row">
              <div className="col-lg-12">
                <div className="ibox float-e-margins">

                  <div className="ibox-title">
                    <h5><strong>Accounts</strong></h5>
                    <a href="" className="btn btn-primary btn-sm pull-right" ng-click="addAccount()">
                      <i className="fa fa-plus"></i>
                      Add account
                    </a>
                  </div>

                  <div className="ibox-content">

                    <DataTable
                      className="containerr"
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
          </div>

        </div>
      </div>
    );
  }
}
