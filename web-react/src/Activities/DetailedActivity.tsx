import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import {
  ReactComponent as ChevronLeft
} from 'bootstrap-icons/icons/chevron-left.svg';
import { format } from 'date-fns';

import { Mapbox } from '../Shared';
import { ActivityService } from './ActivityService';
import { Activity } from './models';
import { Loading } from '../Shared';

export const DetailedActivity = () => {
  const history = useHistory();
  const { activityId } = useParams();

  const [ activity, setActivity ] = useState<Activity>();

  useEffect(() => {
    ActivityService
      .getActivity(activityId)
      .then(response => {
        setActivity(response.data)
      });
  }, [ activityId ]);

  function goBack() {
    history.goBack();
  }
  
  return (
    <div className="activity-component">
      <div className="header-detail">
        <button type="button" className="btn btn-outline-dark btn-sm" onClick={goBack}><ChevronLeft /> Activities</button>
        <h4 className="activity-type mb-0">{ activity?.type ? activity.type : 'Loading' }</h4>
      </div>
       
      { activity ? (
        <div className="detail-activity">
          <p className="lead">{ `${format(new Date(activity.startTime), 'HH:mm')} on ${format(new Date(activity.startTime), 'EEEE, LLLL d, yyyy')}`}</p>
          <Mapbox bounds={ activity.bounds } polyline={ activity.polyline } />

          {/* <h3 className="el-text mt-3">Elevation</h3>
          <h3 className="el-text mt-3">Pace</h3>
          <h3 className="el-text mt-3">Splits</h3> */}
        </div>
      ) : <Loading />}
    </div>
  )
}