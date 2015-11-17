import React, { Component, PropTypes } from 'react';
import DocumentMeta from 'react-document-meta';
import {connect} from 'react-redux';
import * as areaActions from 'redux/modules/areas';
import { areaIsLoaded, loadArea } from 'redux/modules/areas';
import { Error, Loader, LandmarkList } from 'components';

@connect(
  state => ({
    areas: state.areas,
  }),
  {...areaActions})

export default
class Area extends Component {
  static propTypes = {
    changeHeader: PropTypes.func,
    areas: PropTypes.object,
    location: PropTypes.object,
    params: PropTypes.object,
    title: PropTypes.string
  }

  componentDidMount() {
    const headerTitle = 'Explore an area';
    this.props.changeHeader(headerTitle);
    //
    // TODO: store the snippets in the state
    //
  }

  static fetchDataDeferred(getState, dispatch) {
    const state = getState();
    const areaId = state.router.params.area;
    if (!areaIsLoaded(state, areaId)) {
      return dispatch(loadArea(areaId));
    }
  }

  render() {
    const styles = require('./Area.scss');
    const areaId = this.props.params.area;
    const areaItem = this.props.areas[areaId];
    const loading = !areaItem || areaItem.loading;
    const error = !areaItem || areaItem.error;
    if (loading) return (<Loader />);
    if (error) return (<Error error={error} />);
    const area = areaItem.payload;

    return (
      <div className={styles.area}>
        <DocumentMeta title="Area"/>
        <h1>{area.title}’s Landmarks</h1>
        {/* <div className={styles.description}>
          { area.image && <Image image={area.image} size="small" /> }
          <div dangerouslySetInnerHTML={{__html: area.description}} />
        </div> */}
        {
          area.landmarks.length ?
          <LandmarkList items={area.landmarks} />
          : <p>No landmarks for {area.title} yet.</p>
        }
      </div>
    );
  }
}
