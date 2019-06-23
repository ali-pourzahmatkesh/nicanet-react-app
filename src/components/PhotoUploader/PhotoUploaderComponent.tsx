import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { PulseLoader } from 'react-spinners';
import Cropper from 'react-cropper';
import avatarPhoto from '../../Assets/avatar.jpg';
import { API_FILES_BASE_URL } from 'constants/ApiConstants';
import 'cropperjs/dist/cropper.css'; // see installation section above for versions of NPM older than 3.0.0

import AvatarEditor from 'react-avatar-editor';

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

const Done = styled.div`
  color: #5498a9;
  margin-top: 0.5rem;
  display: inline-block;
  cursor: pointer;
`;

const ErrorMesseage = styled.div`
  color: red;
  font-size: 0.8rem;
  margin-top: 0.2rem;
`;

const Avatar = styled.img`
  width: 120px;
  height: 120px;
  display: block;
  margin: 0 auto;
  border-radius: 90px;
  border: solid 1px #eeeeee;
  background-size: cover;
`;

const ResizedImage = styled.div`
  height: 0;
  overflow: hidden;
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
  source?: string;
  customImage?: boolean;
  error?: string;
  preview?: string;
}

const PhotoUploader: React.FC<PhotoUploaderProps> = props => {
  const fileInputRef: any = useRef(HTMLInputElement);
  const crpperRef: any = useRef();
  const resizerRef: any = useRef();
  const {
    photos = [],
    Picker,
    isLoading,
    source = '',
    customImage = false,
    error,
    preview
  } = props;
  const [mainUrl, setMainUrl] = useState('');
  const [cropedUrl, setCropedUrl] = useState('');
  const [imageFile, setImageFile] = useState<any>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [showCropper, setShowCropper] = useState(false);

  const handleImageChange = async (e: any) => {
    try {
      e.preventDefault();
      for (const selectedFile of e.target.files) {
        const reader = new FileReader();

        reader.onloadend = () => {
          if (customImage) {
            setShowCropper(true);

            setImageFile(selectedFile);
          } else {
            props.onAddPhoto({
              file: selectedFile,
              previewUrl: reader.result
            });
          }
        };

        await setMainUrl(URL.createObjectURL(selectedFile));

        reader.readAsDataURL(selectedFile);
      }
    } catch (_) {}
  };

  const onUploadImage = async () => {
    await setIsUploading(true);
    await setCropedUrl(
      crpperRef.current.cropper.getCroppedCanvas().toDataURL()
    );

    setTimeout(async () => {
      const canvasScaled = resizerRef.current
        .getImageScaledToCanvas()
        .toDataURL();

      setShowCropper(false);
      await props.onAddPhoto({
        file: imageFile,
        previewUrl: canvasScaled
      });
      await setIsUploading(false);
    }, 1000);
  };

  const openFilePicker = () => {
    fileInputRef.current.click();
  };

  return (
    <Container>
      {source === 'profile' && !showCropper && (
        <div>
          {photos.length > 0 ? (
            <div>
              {photos.map((photo, index) => {
                if (photo.previewUrl === null) return null;

                return (
                  <Avatar
                    key={photo.previewUrl.toString()}
                    src={photo.previewUrl.toString()}
                  />
                );
              })}
            </div>
          ) : (
            <Avatar
              src={preview ? `${API_FILES_BASE_URL}/${preview}` : avatarPhoto}
            />
          )}
        </div>
      )}
      {customImage && showCropper && (
        <div>
          <Cropper
            ref={crpperRef}
            src={mainUrl}
            aspectRatio={1 / 1}
            guides={false}
            style={{ height: 300, width: '100%', marginTop: 20 }}
            // crop={() => {}}
          />
          <ResizedImage>
            <AvatarEditor
              ref={resizerRef}
              image={cropedUrl}
              width={300}
              height={300}
              border={0}
              color={[255, 255, 255, 0.6]} // RGBA
              scale={1}
              rotate={0}
              // position= {x:0, y:0}
            />
          </ResizedImage>
        </div>
      )}
      <FileInput
        multiple
        accept=".jpg,.jpeg,.png"
        ref={fileInputRef}
        className="fileInput"
        type="file"
        onChange={e => handleImageChange(e)}
      />
      {!showCropper && Picker(openFilePicker)}
      {customImage && showCropper && <Done onClick={onUploadImage}>Done</Done>}

      {(isUploading || isLoading) && (
        <PulseLoader sizeUnit="rem" size={0.5} color="#5498a9" />
      )}
      {error && !showCropper && <ErrorMesseage>{error}</ErrorMesseage>}
      {source !== 'profile' && (
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
  source: '',
  customImage: false
};

export default PhotoUploader;

// export default PhotoUploader
