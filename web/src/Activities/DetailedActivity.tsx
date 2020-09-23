import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import {
  ReactComponent as ChevronLeft
} from 'bootstrap-icons/icons/chevron-left.svg';
import { format } from 'date-fns';

import { Mapbox } from '../Shared';
import { ActivityService } from './ActivityService';
import { Activity, Point } from './models';
import { Loading } from '../Shared';
import { ElevationChart, PaceChart, SplitsChart } from '../Charts';

interface DetailedActivityParams {
  activityId: string;
}

const DetailedActivityContainer = () => {
  const history = useHistory();
  const { activityId } = useParams<DetailedActivityParams>();

  const [ activity, setActivity ] = useState<Activity>();
  const [ points, setPoints ] = useState<Point[]>([]);

  useEffect(() => {
    loadActivities(activityId);
  }, [ activityId ]);

  useEffect(() => {
    loadPoints(activityId);
  }, [activityId]);
  
  async function loadActivities(id: string) {
    const response = await ActivityService.getActivity(id);
    setActivity(response.data);
  }

  async function loadPoints(id: string) {
    const response = await ActivityService.getPoints(id);
    setPoints(response.data.points);
  }

  function goBack() {
    history.goBack();
  }

  return (
    <DetailedActivity
      points={points}
      activity={activity}
      handleGoBack={goBack}
    />
  )
}

type DetailedActivityProps = {
  points?: Point[];
  activity?: Activity;
  handleGoBack(): void;
}

const DetailedActivity = ({ points, activity, handleGoBack }: DetailedActivityProps) => { 
  return (
    <div className="activity-component">
      <div className="header-detail">
        <button type="button" className="btn btn-outline-dark btn-sm" onClick={handleGoBack}><ChevronLeft /> Activities</button>
        <h4 className="activity-type mb-0">{ activity?.type ? activity.type : 'Loading' }</h4>
      </div>
       
      { (activity && points) ? (
        <div className="detail-activity">
          <p className="lead">{ `${format(new Date(activity.startTime), 'HH:mm')} on ${format(new Date(activity.startTime), 'EEEE, LLLL d, yyyy')}`}</p>
          <Mapbox bounds={ activity.bounds } polyline={ activity.polyline } />

          <h3 className="el-text mt-3">Elevation</h3>
          <ElevationChart points={points} />

          <h3 className="el-text mt-3">Pace</h3>
          <PaceChart points={points} />   

          <h3 className="el-text mt-3">Splits</h3>
          <SplitsChart points={points} />        
        </div>
      ) : <Loading />}
    </div>
  )
}

export { DetailedActivityContainer as DetailedActivity };