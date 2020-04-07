import React, { Component } from 'react';
import Dropzone from 'react-dropzone';

class CSVUploaderComponent extends Component {
  constructor() {
    super();
    this.onDrop = (files) => {
      files.forEach((file) => {
        const reader = new FileReader()

        reader.onabort = () => console.log('file reading was aborted')
        reader.onerror = () => console.log('file reading has failed')
        reader.onload = () => {
          this.props.onSetCSV(reader.result);
        }
        reader.readAsText(file)
      });
      this.setState({ files })
    };
    this.state = {
      files: []
    };
  }

  render() {
    const files = this.state.files.map(file => (
      <li key={file.name}>
        {file.name} - {file.size} bytes
      </li>
    ));

    return (
      <Dropzone onDrop={this.onDrop}>
        {({ getRootProps, getInputProps }) => (
          <section className="container">
            <div {...getRootProps({ className: 'dropzone' })}>
              <input {...getInputProps()} />
              <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
            <aside>
              <h4>Files</h4>
              <ul>{files}</ul>
            </aside>
          </section>
        )}
      </Dropzone>
    );
  }
}

export default CSVUploaderComponent;