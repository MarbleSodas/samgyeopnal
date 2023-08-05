import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Image from 'next/image';

const Dropimage = ({ className, post, setPost }) => {
    const [file, setFile] = useState([]);

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
            <div className="text-center">
                <Image alt={file.name} src={file.preview} width={100} height={100} />
                <p>{file.name}</p>
            </div>
            ) :
                isDragActive ?
                <p>Drop the files here ...</p> :
                <p>{`Drag 'n' drop some files here, or click to select files`}</p>
            }
            </div>

        </>
      )
}

export default Dropimage;