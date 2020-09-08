import React, { useState } from 'react';
import { ActivityService } from './ActivityService';
import { useHistory } from 'react-router-dom';

export const Upload = () => {
  const history = useHistory();
  const [file, setFile] = useState<File>();

  function handleFileInput(event: React.ChangeEvent<HTMLInputElement>) {
    const uploadedFile = event.target.files?.item(0);

    if (uploadedFile) {
      setFile(uploadedFile);
    }
  }

  function handleSubmit(): void {
    if (file) {
      ActivityService
        .upload(file)
        .then(resp => {
          history.push('/activities');
        })

    }
  }

  return (
    <div className="upload-container">
      <div className="upload">
        <h2 id="inputGroupFileAddon01">Upload</h2>
        
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
            disabled={!!!file}
          >Submit</button>
        </div>
      </div>
    </div>
  )
}