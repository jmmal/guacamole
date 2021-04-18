import React from 'react';
import { createUseStyles } from 'react-jss';
import { BeatLoader } from 'react-spinners';

const useStyles = createUseStyles({
  container: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    margin: '2rem 0'
  }
})

export const Loading = () => {
  const css = useStyles();

  return (
    <div className={css.container}>
      <BeatLoader
        size='30px'
        margin='4px'
        color='#7D4CDB'
      />
    </div>
  )
}