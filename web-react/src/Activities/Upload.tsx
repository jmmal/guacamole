import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { ActivityService } from './ActivityService';
import { Loading } from '../Shared';

export const Upload = () => {
  const history = useHistory();
  
  const [loading, setLoading] = useState<boolean>(false);
  const [file, setFile] = useState<File>();

  function handleFileInput(event: React.ChangeEvent<HTMLInputElement>) {
    const uploadedFile = event.target.files?.item(0);

    if (uploadedFile) {
      setFile(uploadedFile);
    }
  }

  async function handleSubmit() {
    if (file) {
      setLoading(true);
      await ActivityService.upload(file);
      setLoading(false);
      history.push('/activities');
    }
  }

  return (
    <div className="upload-container">
      <div className="upload">
        <p id="inputGroupFileAddon01" className="h2">Upload</p>
        
        <p>Accepted file types: '.gpx'</p>
        <div className="form-file">
          <input
            type="file"
            name="file"
            id="fileInput"
            className="form-file-input"
            onChange={handleFileInput}
          />
          
          <label className="form-file-label" htmlFor="fileInput">
            <span
              className="form-file-text"
            >
              {file ? file.name : 'Select a GPX file to upload' }
            </span>
            <span className="form-file-button">Browse</span>
          </label>
        </div>
        
        <div className="upload-actions">
          <button
            type="button"
            className="btn btn-outline-secondary back"
            onClick={() => history.push('/activities')}
          >Go Back</button>
          <button
            type="button"
            className="btn btn-success"
            onClick={handleSubmit}
            disabled={!file}
          >Submit</button>
        </div>
        { loading && <Loading /> }
      </div>
    </div>
  )
}