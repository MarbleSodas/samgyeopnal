import { useCallback, useState, useRef } from "react";
import { useDropzone } from "react-dropzone";
import Image from 'next/image';
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'

const Dropimage = ({ className, post, setPost, file, setFile }) => {

    const onDrop = useCallback((acceptedFiles) => {
        if (acceptedFiles?.length) {
          const reader = new FileReader();
          reader.onload = () => {
            const imageBase64 = reader.result;
            setFile({ ...acceptedFiles[0], preview: imageBase64 });
            setPost({ ...post, image: file});
          };
          reader.readAsDataURL(acceptedFiles[0]);
        }
      }, []);
      
    const {getRootProps, getInputProps, isDragActive} = useDropzone({accept: {
        'image/*': []
    },
    onDrop
    })
    
      return (
        <>
            <div {...getRootProps({ className: className })}>
            <input {...getInputProps()} />
            {file.preview ? (
            <div className="text-center justify-center">
                <Image alt={file.name} src={file.preview} width={200} height={200} />
            </div>
            ) :
                isDragActive ?
                <p className="p-14">Drop the files here ...</p> :
                <p className="p-14">{`Drag 'n' drop some files here, or click to select files`}</p>
            }
            </div>

        </>
      )
}

export default Dropimage;