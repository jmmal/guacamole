import React from 'react';
import { useHistory } from 'react-router-dom';

import { format } from 'date-fns';

import { ActivityV2 } from './models';
import { Helpers } from '../Shared';
import '../styles/styles.scss'

type ActivityPreviewProps = {
  activity: ActivityV2;
}

export const ActivityPreview = ({ activity }: ActivityPreviewProps) => {
  const history = useHistory();

  function openActivity() {
    history.push(`/activities/${activity._id}`);
  }

  function handleKeyDown(event: React.KeyboardEvent) {
    if (event.key === "ENTER") {
      openActivity()
    }
  }

  return (
    <div className="activity__preview focusable" tabIndex={0} onClick={openActivity} onKeyDown={handleKeyDown}>
      <div className="header">
        <h3 className="date mb-0">{ format(new Date(activity.startTime), "EEEE, LLLL d, yyyy") }</h3>
        <p className="title mb-0">{ activity.title }</p>
      </div>
      
      <img
        src={activity.imageURL}
        alt="Activity GPS preview"
        className="map-image"
      />

      <div className="stats-footer">
        <FooterColumn title='Distance' value={ `${Number(activity.distance / 1000).toFixed(2)} km`} />
        <FooterColumn title='Pace' value={ `${Helpers.pace(activity.pace.avg) } min / km`} />
        <FooterColumn title='Elevation' value={`${Number(activity.elevation.max - activity.elevation.min).toFixed(1)} m`} />
        <FooterColumn title='Elapsed Time' value={ Helpers.duration(activity.elapsedTime)} />
      </div>
    </div>
  )
}

type FooterColumnProps = {
  title: string;
  value: string;
}

const FooterColumn = ({title, value}: FooterColumnProps) => {
  return (
    <div className="col">
      <p className="title">{ title }</p>
      <p className="value mb-0">{ value }</p>
    </div>
  )
}