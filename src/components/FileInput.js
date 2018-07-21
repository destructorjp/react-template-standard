import React from 'react';

export default class FileInput extends React.Component {
  state = {
    imageId: 0
  };

  render() {
    const { onLoad } = this.props;

    return (
      <input
        key={`file-upload-${this.state.imageId}`}
        onChange={e => {
          const reader = new FileReader();

          const file = e.target.files[0];

          reader.onload = fileEvent => {
            const data = fileEvent.target.result;

            onLoad({ file, data });
          };

          reader.readAsDataURL(file);
        }}
        style={{ display: 'none' }}
        type="file"
      />
    );
  }
}
