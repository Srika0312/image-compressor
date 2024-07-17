import imageCompression from "browser-image-compression";
import { Button, Image } from "@nextui-org/react";
import React, { useState } from "react";
import i from "../assets/IMG.png";
import ST from "../assets/ST.svg";

function CompressImage() {
  const [orgImage, setOrgImage] = useState("");
  const [orgImgFile, setOrgImgFile] = useState("");
  const [compressImg, setCompressImg] = useState("");
  const [fileName, setFileName] = useState("");

  const handel = (e) => {
    const imageFile = e.target.files[0];
    setOrgImage(imageFile);
    setOrgImgFile(URL.createObjectURL(imageFile));
    setFileName(imageFile.name);
  };

  const handleCompressImg = (e) => {
    e.preventDefault();

    const options = {
      maxSizeMB: 2,
      maxWidth: 300,
      maxHeight: 300,
      useWebWorker: true,
    };

    if (options.maxSizeMB >= orgImage / 2048) {
      alert("Image size is too small");
      return 0;
    }

    let output;
    imageCompression(orgImage, options).then((x) => {
      output = x;

      const DownLoadLink = URL.createObjectURL(output);
      setCompressImg(DownLoadLink);
    });
  };

  return (
    <div className="h-dvh ">
      <div className="flex items-center justify-center w-2/6 p-4">
        <div className="flex items-center flex-col gap-4">
          {/* Choosing the Image to be Compressed */}
          <h1 className="p-4">
            This Image compression Application is Under Development
          </h1>

          <div>
            {orgImgFile ? (
              <Image src={orgImgFile} width="200" height="200" />
            ) : (
              <Image width="200" height="200" src={i} />
            )}
          </div>

          <input
            accept="image/*"
            type="file"
            className="cursor-pointer flex items-center justify-center"
            onChange={(e) => handel(e)}
          />

          {/* Compress Image Button */}

          {orgImgFile && (
            <Button
              color="primary"
              size="sm"
              onClick={(e) => {
                handleCompressImg(e);
              }}
            >
              COMPRESS
            </Button>
          )}

          {/* Compressed Image*/}

          <div>
            {compressImg ? (
              <Image width="200" height="200" src={compressImg} />
            ) : (
              <Image width="200" height="200" src={i} />
            )}
          </div>
          {/* Download Compressed Image*/}

          {compressImg && (
            <Button color="primary" size="sm">
              <a href={compressImg} download={fileName}>
                {" "}
                DOWNLOAD
              </a>
            </Button>
          )}
        </div>
      </div>
      <div className="flex flex-col text-center items-center">
        <div className="items-center flex flex-col gap-2 w-11/12 text-sm fixed bottom-0  py-5 z-0 border-t border-b-gray-500 h-fit">
          <div className="flex gap-1">
            <h1>Made by</h1>
            <h1 className="font-bold">
              <a href="">
                <Image className="h-6" src={ST} />
              </a>
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompressImage;
