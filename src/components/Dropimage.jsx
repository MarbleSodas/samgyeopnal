import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useSession } from "next-auth/react";
import Image from 'next/image';

const Dropimage = ({ className, post, setPost }) => {
    const { data: session } = useSession();
    const [file, setFile] = useState([]);

    const onDrop = useCallback(acceptedFiles => {
        console.log('acceptedFiles', acceptedFiles);
        if (acceptedFiles?.length) {
            setFile(acceptedFiles[0]);
            Object.assign(file, {preview: URL.createObjectURL(file)});
            console.log(file.preview);
        }
      }, [])
      const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
    
      return (
        <>
            <div {...getRootProps({ className: className })}>
            <input {...getInputProps()} />
            {
                isDragActive ?
                <p>Drop the files here ...</p> :
                <p>Drag 'n' drop some files here, or click to select files</p>
            }
            </div>
            {file.name && (
            <div className="text-center">
                <Image alt={file.name} src={file.preview} width={100} height={100}></Image>
                <p>{file.name}</p>
            </div>
            )}
        </>
      )
}

export default Dropimage;