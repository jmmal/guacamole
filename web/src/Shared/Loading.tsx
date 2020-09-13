import React from 'react';
import '../styles/styles.scss'

export const Loading = () => {
  return (
    <div className="container">
      <div className="spinner-grow text-warning" role="status"></div>
      <div className="spinner-grow text-success" role="status"></div>
      <div className="spinner-grow text-info" role="status"></div>
    </div>
  )
}