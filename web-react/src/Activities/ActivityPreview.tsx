import React from 'react';

import { Activity } from './models';
import { Pipes } from './pipes';
import '../styles/styles.scss'

type ActivityPreviewProps = {
  activity: Activity;
}

export const ActivityPreview = ({ activity }: ActivityPreviewProps) => {
  const openActivity = () => {
    console.log('open');
  }

  return (
    <div className="activity__preview" onClick={openActivity}>
      <div className="header">
        <h3 className="date mb-0">{ activity.startTime.toDateString() }</h3>
        <p className="title mb-0">{ activity.title }</p>
      </div>
      
      <img
        src={'data:image/png;base64,' + activity.image}
        alt="Activity GPS preview"
        className="map-image"
      />

      <div className="stats-footer">
        <div className="col">
          <p className="title">Distance</p>
          <p className="value mb-0">{ Number(activity.distance / 1000).toFixed(2) }km</p>
        </div>
        <div className="col">
          <p className="title">Pace</p>
          <p className="value mb-0">{ Pipes.pace(activity.pace) } min / km</p>
        </div>
        <div className="col">
          <p className="title">Elevation</p>
          <p className="value mb-0">{ (activity.maxElevation - activity.minElevation) } m</p>
        </div>
        <div className="col">
          <p className="title">Elapsed Time</p>
          <p className="value mb-0">{ Pipes.duration(activity.elapsedTime) }</p>
        </div>
      </div>
    </div>
  )
}