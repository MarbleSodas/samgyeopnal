import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Image from 'next/image';

const Dropimage = ({ className, post, setPost }) => {
    const [file, setFile] = useState([]);
    const reader = new FileReader();

    const onDrop = useCallback(acceptedFiles => {
        if (acceptedFiles?.length) {
            setFile(acceptedFiles[0]);
            const reader = new FileReader();
            reader.onloadend = () => {
                const imageBase64 = reader.result;
                setFile({ ...file, preview: imageBase64 });
                reader.readAsDataURL(file);
                console.log(file.preview);
            }
        }
      }, [])
    
    const {getRootProps, getInputProps, isDragActive} = useDropzone({accept: {
        'image/*': []
    },
    onDrop
    })
    
      return (
        <>
            <div {...getRootProps({ className: className })}>
            <input {...getInputProps()} />
            {
                isDragActive ?
                <p>Drop the files here ...</p> :
                <p>{`Drag 'n' drop some files here, or click to select files`}</p>
            }
            </div>
            {file.preview && (
            <div className="text-center">
                <Image alt={file.name} src={file.preview} width={100} height={100} />
                <p>{file.name}</p>
            </div>
            )}
        </>
      )
}

export default Dropimage;