import React, { useRef } from 'react'
import styled from 'styled-components';

const FileInput = styled.input`
  display: none;
`

const PhotoWrapper = styled.div`
  margin:5px;
`

const PhotosContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: -5px;
`

const Photo = styled.img`
  width: 4rem;
  height: 4rem;
`

export interface Photo {
  file: File
  previewUrl: string | ArrayBuffer | null
}

interface PhotoUploaderProps {
  photos?: Photo[]
  Picker: (onClick: Function) => React.ReactNode;
  onAddPhoto: (photo: Photo) => void
}

const PhotoUploader: React.FC<PhotoUploaderProps> = (props) => {
  const fileInputRef: any = useRef(HTMLInputElement);
  const { photos = [], Picker } = props
  const handleImageChange = (e: any) => {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      props.onAddPhoto({
        file: file,
        previewUrl: reader.result
      })
    }

    reader.readAsDataURL(file)
  }

  const openFilePicker = () => {
    fileInputRef.current.click() 
  }

  return (
    <div>
      <FileInput
        accept=".jpg,.jpeg,.png"
        ref={fileInputRef}
        className="fileInput" 
        type="file" 
        onChange={(e)=> handleImageChange(e)}
      />
      {Picker(openFilePicker)}
      <PhotosContainer>
        {
          photos.map(photo => {
              if (photo.previewUrl === null) return null

              return (
                <PhotoWrapper key={photo.previewUrl.toString()}>
                  <Photo src={photo.previewUrl.toString()} />
                </PhotoWrapper>
              )
            }
          )
        }
      </PhotosContainer>
    </div>
  )
}

PhotoUploader.defaultProps = {
  photos: []
}

export default PhotoUploader


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
