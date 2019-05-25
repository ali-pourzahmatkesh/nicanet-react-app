import React, { useState } from 'react'

import PhotoUploader, { Photo } from 'components/PhotoUploader/PhotoUploaderComponent';
import Picker from 'components/Picker/PickerComponent';
import CameraSilver from 'Assets/CameraSilver.svg'
import { AdrApi } from 'Api/AdrApi';

type AdrPhotoUploaderProps = {
  presetName: string
}

const AdrPhotoUploader: React.FC<AdrPhotoUploaderProps> = (props) => {
  const [photos, setPhotos] = useState<Photo[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const { presetName } = props

  const uploadPhoto = async (photo: Photo) => {
    try {
      setIsLoading(true)
      const currentAdrRaw = localStorage.getItem('current_adr')
      if (currentAdrRaw === null) return
      const { AdrId } = JSON.parse(currentAdrRaw)
      const bodyFormData = new FormData();
      const image = new File([photo.file], `${presetName}&${photo.file.name}`, {type: photo.file.type});

      bodyFormData.append('AdrId', AdrId);
      bodyFormData.append('file', image);
      const reponse = await AdrApi.uploadAdrPhoto(bodyFormData)

      if (reponse.status === 200) setPhotos(prevPhotos => [...prevPhotos, photo])
    } catch (_) {}
    finally {
      setIsLoading(false)
    }
  }

  return (
    <PhotoUploader
      isLoading={isLoading}
      photos={photos}
      Picker={(onClick) => <Picker title="Upload a Photo" onClick={() => onClick()} iconSource={CameraSilver} />}
      onAddPhoto={uploadPhoto}
      onDeletePhoto={photoIndex => setPhotos([ ...photos ].filter((p, index) => index !== photoIndex))}
    />
  )
}

export default AdrPhotoUploader
