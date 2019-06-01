import React, { useState } from 'react';

import PhotoUploader, {
  Photo
} from 'components/PhotoUploader/PhotoUploaderComponent';
import Picker from 'components/Picker/PickerComponent';
import CameraSilver from 'Assets/CameraSilver.svg';
import { CaseApi } from 'Api/CaseApi';

type CasePhotoUploaderProps = {
  presetName: string;
};

const CasePhotoUploader: React.FC<CasePhotoUploaderProps> = props => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const { presetName } = props;

  const uploadPhoto = async (photo: Photo) => {
    try {
      setIsLoading(true);
      console.log('photo', photo);
      const currentCaseRaw = localStorage.getItem('current_case');
      if (currentCaseRaw === null) return;
      const { CaseId } = JSON.parse(currentCaseRaw);
      const bodyFormData = new FormData();
      const image = new File([photo.file], `${presetName}&${photo.file.name}`, {
        type: photo.file.type
      });
      console.log('imageeee', image);
      bodyFormData.append('CaseId', CaseId);
      bodyFormData.append('file', image);
      const reponse = await CaseApi.uploadCasePhoto(bodyFormData);

      if (reponse.status === 200)
        setPhotos(prevPhotos => [...prevPhotos, photo]);
    } catch (_) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PhotoUploader
      isLoading={isLoading}
      photos={photos}
      Picker={onClick => (
        <Picker
          title="Upload a Photo"
          onClick={() => onClick()}
          iconSource={CameraSilver}
        />
      )}
      onAddPhoto={uploadPhoto}
      onDeletePhoto={photoIndex =>
        setPhotos([...photos].filter((p, index) => index !== photoIndex))
      }
    />
  );
};

export default CasePhotoUploader;
