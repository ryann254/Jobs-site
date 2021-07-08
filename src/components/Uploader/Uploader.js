import React, { useEffect, useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import { UploadIcon } from "../AllSvgIcon";

const Text = styled.span`
  color: black;
  margin-top: 15px;
  text-align: center;
`;

const TextHighlighted = styled.span`
  color: blue;
  font-weight: bold;
`;

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  border-width: 2px;
  border-radius: 2px;
  border-color: #e6e6e6;
  border-style: dashed;
  background-color: #ffffff;
  color: #bdbdbd;
  outline: none;
  transition: border 0.24s ease-in-out;
  cursor: pointer;
`;

const ThumbsContainer = styled.aside`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 16px;
`;

const Thumb = styled.div`
  display: inline-flex;
  border-radius: 2px;
  margin-bottom: 8px;
  margin-right: 8px;
  width: 100px;
  height: 100px;
  padding: 4px;
  box-sizing: border-box;
`;

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

const img = {
  display: "block",
  width: "auto",
  height: "100%",
};

function Uploader(props) {
  const { onChange, imageURL, action, directUpload, ...rest } = props;
  const [files, setFiles] = useState(
    imageURL ? [{ name: "demo", preview: imageURL }] : [],
  );

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    multiple: false,
    onDrop: useCallback(
      (acceptedFiles) => {
        setFiles(
          acceptedFiles.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            }),
          ),
        );
        onChange(acceptedFiles);
        if (directUpload) {
          action(acceptedFiles);
        }
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [onChange],
    ),
  });

  const thumbs = files.map((file) => (
    <Thumb
      style={
        rest.version && rest.version === "profile"
          ? {
              width: "auto",
              height: "100px",
            }
          : {}
      }
      key={file.name}
    >
      <div style={thumbInner}>
        <img
          src={typeof file === "string" ? file : file.preview}
          style={img}
          alt={file.name}
        />
      </div>
    </Thumb>
  ));

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files],
  );

  return (
    <section className="container uploader">
      {rest.version && rest.version === "profile" ? (
        <div className="">
          <label
            className="upload-btn"
            style={{ margin: 0, color: "#fff", marginRight: "10px" }}
          >
            <input {...getInputProps()} />
            <i className="fa fa-upload" /> Browse
          </label>
          <span className="fake-input">No file selected</span>
        </div>
      ) : (
        // <div className="edit-profile-photo" {...getRootProps()}>
        //   {thumbs}
        //   <div className="change-photo-btn">
        //     <div className="photoUpload">
        //       <span>
        //         <i className="fa fa-upload" /> Upload Photo
        //       </span>
        //       <input {...getInputProps()} />
        //     </div>
        //   </div>
        // </div>
        <>
          <Container {...getRootProps()}>
            <input {...getInputProps()} />
            <UploadIcon />
            <Text>
              <TextHighlighted>Drag/Upload</TextHighlighted> your image here.
            </Text>
          </Container>
          {thumbs && <ThumbsContainer>{thumbs}</ThumbsContainer>}
        </>
      )}
    </section>
  );
}

export default Uploader;
