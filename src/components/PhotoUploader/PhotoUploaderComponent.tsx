import React, { useRef } from 'react';
import styled from 'styled-components';
import { PulseLoader } from 'react-spinners';

const FileInput = styled.input`
  display: none;
`;

const Container = styled.div`
  margin-bottom: 1.5rem;
`;

const PhotoWrapper = styled.div`
  margin: 5px;
  position: relative;
`;

const LoadedPhotosContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: -5px;
  margin-top: 0.5rem;
  flex-wrap: wrap;
`;

const Photo = styled.img`
  width: 4rem;
  height: 4rem;
`;

export interface Photo {
  file: File;
  previewUrl: string | ArrayBuffer | null;
}

interface PhotoUploaderProps {
  photos?: Photo[];
  Picker: (onClick: Function) => React.ReactNode;
  onAddPhoto: (photo: Photo) => void;
  isLoading?: boolean;
  onDeletePhoto: (photoIndex: number) => void;
  preview?: boolean;
}

const PhotoUploader: React.FC<PhotoUploaderProps> = props => {
  const fileInputRef: any = useRef(HTMLInputElement);
  const { photos = [], Picker, isLoading, preview = true } = props;

  const handleImageChange = (e: any) => {
    e.preventDefault();
    for (const selectedFile of e.target.files) {
      const reader = new FileReader();

      reader.onloadend = () => {
        props.onAddPhoto({
          file: selectedFile,
          previewUrl: reader.result
        });
      };

      reader.readAsDataURL(selectedFile);
    }
  };

  const openFilePicker = () => {
    fileInputRef.current.click();
  };

  return (
    <Container>
      <FileInput
        multiple
        accept=".jpg,.jpeg,.png"
        ref={fileInputRef}
        className="fileInput"
        type="file"
        onChange={e => handleImageChange(e)}
      />
      {Picker(openFilePicker)}
      {isLoading && <PulseLoader sizeUnit="rem" size={0.5} color="#5498a9" />}
      {preview && (
        <LoadedPhotosContainer>
          {photos.map((photo, index) => {
            if (photo.previewUrl === null) return null;

            return (
              <PhotoWrapper key={photo.previewUrl.toString()}>
                {/* <CloseIconWrapper>
                    <IoIosClose color="#ff0000" onClick={() => onRemovePhoto(index)} size={30} />
                  </CloseIconWrapper> */}
                <Photo src={photo.previewUrl.toString()} />
              </PhotoWrapper>
            );
          })}
        </LoadedPhotosContainer>
      )}
    </Container>
  );
};

PhotoUploader.defaultProps = {
  photos: [],
  preview: true
};

export default PhotoUploader;

// import React from 'react'

// interface Photo {

// }

// interface PhotoUploaderProps {
//   onAddPhoto: (photo: Photo) => void
//   photos?: Photo[]
// }

// const PhotoUploader: React.FC<PhotoUploaderProps> = (props) => {
//   const handleImageChange = (e: any) => {
//     e.preventDefault();

//     let reader = new FileReader();
//     let file = e.target.files[0];

//     reader.onloadend = () => {
//       props.onAddPhoto({
//         file: file,
//         previewUrl: reader.result
//       })
//     }

//     reader.readAsDataURL(file)
//   }

//   return (
//     <div className="previewComponent">
//         <input
//           className="fileInput"
//           type="file"
//           onChange={(e)=> handleImageChange(e)}
//         />
//       <div className="imgPreview">
//         {$imagePreview}
//       </div>
//     </div>
//   )
// }

// export default PhotoUploader
