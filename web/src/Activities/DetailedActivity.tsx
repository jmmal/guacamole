import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import {
  ReactComponent as ChevronLeft
} from 'bootstrap-icons/icons/chevron-left.svg';
import { format } from 'date-fns';

import { Mapbox } from '../Shared';
import { Activity } from './models';
import { Loading } from '../Shared';
import { ElevationChart, PaceChart, SplitsChart } from '../Charts';
import * as mapboxPoly from '@mapbox/polyline';

interface DetailedActivityParams {
  activityId: string;
}

const DetailedActivityContainer = () => {
  const history = useHistory();
  const { activityId } = useParams<DetailedActivityParams>();

  const [ activity, setActivity ] = useState<Activity>();

  useEffect(() => {
    loadActivities(activityId);
  }, [ activityId ]);

  async function loadActivities(id: string) {
    const response = await fetch('/activities/' + id);
    const json = await response.json();

    setActivity(json);
  }

  function goBack() {
    history.goBack();
  }

  return (
    <DetailedActivity
      activity={activity}
      handleGoBack={goBack}
    />
  )
}

type DetailedActivityProps = {
  activity?: Activity;
  handleGoBack(): void;
}

const DetailedActivity = ({ activity, handleGoBack }: DetailedActivityProps) => { 
  return (
    <div className="activity-component">
      <div className="header-detail">
        <button type="button" className="btn btn-outline-dark btn-sm" onClick={handleGoBack}><ChevronLeft /> Activities</button>
        <h4 className="activity-type mb-0">{ activity?.type ? activity.type : 'Loading' }</h4>
      </div>
       
      { (activity && activity.streamData) ? (
        <div className="detail-activity">
          <p className="lead">{ `${format(new Date(activity.startTime), 'HH:mm')} on ${format(new Date(activity.startTime), 'EEEE, LLLL d, yyyy')}`}</p>
          { activity.polyline && <Mapbox polyline={ activity.polyline } />}

          <h3 className="el-text mt-3">Elevation</h3>
          <ElevationChart points={activity.streamData} />

          <h3 className="el-text mt-3">Pace</h3>
          <PaceChart points={activity.streamData} />   

          <h3 className="el-text mt-3">Splits</h3>
          <SplitsChart points={activity.streamData} />
        </div>
      ) : <Loading />}
    </div>
  )
}

export { DetailedActivityContainer as DetailedActivity };