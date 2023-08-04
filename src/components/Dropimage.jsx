'use client'

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from 'axios';
import { useSession } from "next-auth/react";
import Image from 'next/image';
import NextCors from 'nextjs-cors';

const Dropimage = async ({ className, post, setPost }) => {
    const { data: session } = useSession();

    const onDrop = useCallback(acceptedFiles => {
        console.log('acceptedFiles', acceptedFiles);
        if (acceptedFiles?.length) {
            const file = acceptedFiles[0];
            const reader = new FileReader();
            reader.onloadend = async () => {
                const imageBase64 = reader.result;
                try {
                const response = await axios.post(
                    'https://photoslibrary.googleapis.com/v1/uploads',
                    imageBase64,
                    {
                    headers: {
                        Authorization: `Bearer ${session.accessToken}`,
                        'Content-type': 'application/octet-stream',
                        'X-Goog-Upload-Content-Type': file.type,
                        'X-Goog-Upload-Protocol': 'raw',
                    },
                    }
                );
                const uploadToken = response.data;
                console.log('uploadToken', uploadToken);
                setPost({ ...post, image: uploadToken, imageRaw: imageBase64 });
                } catch (error) {
                console.error('Error uploading image to Google Photos API', error);
                }
            };
            reader.readAsDataURL(file);
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
            {post.imageRaw && (
            <div>
                <Image alt="" src={post.imageRaw}></Image>
                <p>{file.name}</p>
            </div>
            )}
        </>
      )
}

export default Dropimage;