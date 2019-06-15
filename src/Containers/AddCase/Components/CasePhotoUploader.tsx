import React, { useState, useEffect } from 'react';

import PhotoUploader, {
  Photo
} from 'components/PhotoUploader/PhotoUploaderComponent';
import Picker from 'components/Picker/PickerComponent';
import CameraSilver from 'Assets/CameraSilver.svg';
import { CaseApi } from 'Api/CaseApi';
import { setCase, getCase } from '../../../utils/utils';

type CasePhotoUploaderProps = {
  presetName: string;
  caseId?: string;
  fieldName?: string;
};

const CasePhotoUploader: React.FC<CasePhotoUploaderProps> = props => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const { presetName, caseId, fieldName } = props;

  useEffect(() => {
    const effect = async () => {
      const oldValues = await getCase(caseId);
      if (!fieldName) return null;
      setPhotos(oldValues[fieldName] || []);
    };
    effect();
  }, [caseId, fieldName]);

  const uploadPhoto = async (photo: Photo) => {
    try {
      // const currentCaseRaw = localStorage.getItem('current_case');
      // if (currentCaseRaw === null) return;
      // const { CaseId } = JSON.parse(currentCaseRaw);
      if (!fieldName || !caseId) return null;
      setIsLoading(true);
      const bodyFormData = new FormData();
      const image = new File([photo.file], `${presetName}&${photo.file.name}`, {
        type: photo.file.type
      });
      bodyFormData.append('CaseId', caseId);
      bodyFormData.append('file', image);
      const reponse = await CaseApi.uploadCasePhoto(bodyFormData);
      if (reponse.status === 200) {
        setPhotos(prevPhotos => [...prevPhotos, photo]);
        const caseInfo: { [k: string]: any } = {};
        caseInfo[fieldName] = [...photos, photo];
        await setCase(caseId, caseInfo);
      }
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
