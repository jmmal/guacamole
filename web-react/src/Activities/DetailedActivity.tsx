import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import {
  ReactComponent as ChevronLeft
} from 'bootstrap-icons/icons/chevron-left.svg';
import { format } from 'date-fns';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar
} from "recharts";

import { Mapbox } from '../Shared';
import { ActivityService } from './ActivityService';
import { Activity, PointResponse, Point } from './models';
import { Loading } from '../Shared';

export const DetailedActivity = () => {
  const history = useHistory();
  const { activityId } = useParams();

  const [ activity, setActivity ] = useState<Activity>();
  const [ elevationData, setElevationData ] = useState<object[]>();
  const [ paceData, setPaceData ] = useState<object[]>();
  const [ splitsData, setSplitsData ] = useState<object[]>();

  useEffect(() => {
    ActivityService
      .getActivity(activityId)
      .then(response => {
        setActivity(response.data)
      });
  }, [ activityId ]);

  useEffect(() => {
    ActivityService.getPoints(activityId)
      .then(response => {
        processPoints(response.data)
      })
  }, [activityId]);

  function processPoints(points: PointResponse) {
    const elevationData: object[] = [];
    const paceData: object[] = [];

    points.points.forEach((point, i) => {
      if (i % 5 !== 0) {
        return;
      }

      elevationData.push({
        // TODO: Maybe be better to label with time
        distance: Number(point.distanceFromStart / 1000).toFixed(1),
        elevation: Number(point.elevation).toFixed(1)
      });

      paceData.push({
        distance: Number(point.distanceFromStart / 1000).toFixed(1),
        pace: Number(point.pace).toFixed(2)
      });

    });
    
    const splitsData = buildSplits(points.points);

    setElevationData(elevationData);
    setPaceData(paceData);
    setSplitsData(splitsData);
  }

  function buildSplits(points: Point[]): any[] {
    const data: object[] = [];

    let currentSplit = 1; // 1st KM
    let startTime = points[0].time;

    points.forEach((point, i) => {
      if (point.distanceFromStart < (currentSplit * 1000)) {
        return;
      }

      const seconds = (new Date(point.time).getTime() - new Date(startTime).getTime()) / 1000;

      data.push({
        name: currentSplit,
        value: Number(1000 / seconds).toFixed(4)
      });
      currentSplit++;
      startTime = point.time;
    });

    const lastPoint = points[points.length - 1];
    const seconds = (new Date(lastPoint.time).getTime() - new Date(startTime).getTime()) / 1000;

    const dist = lastPoint.distanceFromStart - (1000 * (currentSplit - 1));

    // If the last split is less than 100m, ignore it
    if (dist < 100) {
      return data;
    }

    data.push({
      name: currentSplit,
      value: Number(seconds / dist).toFixed(2)
    });


    return data;
  }

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

          <h3 className="el-text mt-3">Elevation</h3>
          <ResponsiveContainer height={250} width='100%'>
            <AreaChart
              data={elevationData}
              margin={{
                top: 10, right: 30, left: 0, bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="distance" allowDecimals={false} tickCount={4} unit={'km'} minTickGap={20} />
              <YAxis allowDecimals={false} unit={'m'} />
              <Tooltip />
              <Area isAnimationActive={false} type="monotone" dataKey="elevation" stroke="#8884d8" fill="#8884d8" />
            </AreaChart>
          </ResponsiveContainer>
          
          <h3 className="el-text mt-3">Pace</h3>
          <ResponsiveContainer height={250} width='100%'>
            <AreaChart
              data={paceData}
              margin={{
                top: 10, right: 30, left: 0, bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="distance" allowDecimals={false} tickCount={4} unit={'km'} minTickGap={20} />
              <YAxis allowDecimals={false} unit={'m/s'} />
              <Tooltip />
              <Area isAnimationActive={false} type="monotone" dataKey="pace" stroke="#5293fa" fill="#5293fa" />
            </AreaChart>
          </ResponsiveContainer>

          <h3 className="el-text mt-3">Splits</h3>
          <ResponsiveContainer height={250} width='100%'>
            <BarChart data={splitsData} >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#6fd450" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : <Loading />}
    </div>
  )
}