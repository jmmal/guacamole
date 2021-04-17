import React from 'react';
import { createUseStyles } from 'react-jss';
import { BeatLoader } from 'react-spinners';
import '../styles/styles.scss'

const useStyles = createUseStyles({
  container: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center'
  }
})

export const Loading = () => {
  const css = useStyles();

  return (
    <div className={css.container}>
      <BeatLoader
        size='30'
        margin='4'
        color='#7D4CDB'
      />
    </div>
  )
}