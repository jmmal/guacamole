import React from 'react';

import {
  ReactComponent as ChevronLeft
} from 'bootstrap-icons/icons/chevron-left.svg';

import { Mapbox } from '../Mapbox/Mapbox';
import { useParams, useHistory } from 'react-router-dom';
import { FakeActivity } from '../Mapbox/activity';

export const DetailedActivity = () => {
  const { activityId } = useParams();
  const history = useHistory();

  const activity = FakeActivity;

  function goBack() {
    history.goBack();
  }
  
  return (
    <div className="activity-component" tabIndex={0}>
      <div className="header">
        <button type="button" className="btn btn-outline-dark btn-sm" onClick={goBack}><ChevronLeft /> Activities</button>
        <h4 className="activity-type mb-0">{ activity?.type ? activity.type : 'Loading' }</h4>
      </div>
      
      <div className="detail-activity">
        <p className="lead">{ activity.startTime.toISOString() } on { activity.startTime.toDateString() }</p>
        <Mapbox bounds={ activity.bounds } polyline={ activity.polyline } />

        {/* <h3 className="el-text mt-3">Elevation</h3>
        <h3 className="el-text mt-3">Pace</h3>
        <h3 className="el-text mt-3">Splits</h3> */}
      </div>
    </div>
  )
}