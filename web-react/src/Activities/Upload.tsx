import React, { useState } from 'react';

export const Upload = () => {
  const [file, setFile] = useState<File>();

  function handleFileInput(event: React.ChangeEvent<HTMLInputElement>) {
    const uploadedFile = event.target.files?.item(0);

    if (uploadedFile) {
      setFile(uploadedFile);
    }
  }

  function handleSubmit(): void {
    console.log('uploading...');
    // this.subs.sink = this.service.createActivity(this.file).subscribe(
    //   (data) => {
    //     this.router.navigateByUrl('/');
    //     this.loading = true;
    //   },
    //   (error) => {
    //     console.log(error);
    //     this.loading = true;
    //   }
    // );
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
          >Go Back</button>
          <button
            type="button"
            className="btn btn-success"
            onClick={handleSubmit}
          >Submit</button>
        </div>
      </div>
    </div>
  )
}