import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import { Previous } from 'grommet-icons';
import { format } from 'date-fns';

import { Mapbox } from '../Shared';
import { Activity } from './models';
import { Loading } from '../Shared';
import { ElevationChart, PaceChart, SplitsChart } from '../Charts';
import { createUseStyles } from 'react-jss';
import { Button, Heading } from 'grommet';

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

const useStyles = createUseStyles({
  header: {
    position: 'sticky',
    top: 0,
    borderBottom: '1px solid #e0e0e0',
    zIndex: 1000,
    backgroundColor: 'white',
    padding: '1rem',
    display: 'flex',
    justifyContent: 'center'
  },
  headerLayout: {
    display: 'grid',
    gridTemplateColumns: '1fr auto 1fr',
    justifyContent: 'center',
    maxWidth: '55rem',
    width: '100%'
  },
  marginAuto: {
    margin: 'auto',
    marginRight: 0
  },
  statsHeader: {
    padding: '0rem 1rem',
  }
})

const DetailedActivity = ({ activity, handleGoBack }: DetailedActivityProps) => { 
  const css = useStyles();

  return (
    <div className="activity-component">
      <div className={css.header}>
        <div className={css.headerLayout}>
          <div>
            <Button
              onClick={handleGoBack}
              icon={<Previous />}
              label='Activities'
              size='small'
            />
          </div>
          <Heading level='4' className={css.marginAuto}>{ activity?.type ? activity.type : 'Loading' }</Heading>
        </div>
      </div>
       
      { activity?.polyline && <Mapbox polyline={ activity.polyline } />}
      { (activity && activity.streamData) ? (
        <>
          <Heading
            level='2'
            className={css.statsHeader}
          >{ `${format(new Date(activity.startTime), 'EEEE, LLLL d, yyyy')} at ${format(new Date(activity.startTime), 'HH:mm aaa')}`}</Heading>
          <Heading level='3' className={css.statsHeader}>Elevation</Heading>
          <ElevationChart points={activity.streamData} />

          <Heading level='3' className={css.statsHeader}>Pace</Heading>
          <PaceChart points={activity.streamData} />   

          <Heading level='3' className={css.statsHeader}>Splits</Heading>
          <SplitsChart points={activity.streamData} />
        </>
      ) : <Loading />}
    </div>
  )
}

export { DetailedActivityContainer as DetailedActivity };