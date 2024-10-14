"use client";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import filupIcon from "../../../public/icons/ph_file-video-thin.png";
import helpIcon from "../../../public/icons/help.png";
import micIcon from "../../../public/icons/mic-record.png";
import fileErrIcon from "../../../public/icons/file-error.png";
import noVide from "../../../public/icons/no-video.png";
import {
  FILE_SIZE_OVER_MSG,
  MAX_FILE_SIZE,
  FILE_TYPE_NOT_ALLOWED_MSG,
} from "../../../utils/Common";

const VideoPosting = () => {
  const [files, setFiles] = useState("");

  // 動画がポリシーに満たなかった場合
  const onDropRejected = useCallback((files) => {
    let msgElm = document.getElementById("file-err-msg");
    msgElm.querySelectorAll("div").forEach((elm) => {
      msgElm.removeChild(elm);
    });
    let div = document.createElement("div");
    div.classList.add("text-red-600", "text-sm", "ml-11", "pt-1");
    files.forEach(({ file, errors }) => {
      errors.forEach(({ code }) => {
        switch (code) {
          case "file-too-large":
            div.innerText = FILE_SIZE_OVER_MSG;
            msgElm.appendChild(div);
            break;
          case "file-invalid-type":
            div.innerText = FILE_TYPE_NOT_ALLOWED_MSG;
            msgElm.appendChild(div);
            msgElm.classList.remove("hidden");
            break;
          default:
            break;
        }
      });
    });
  });

  // 動画がドロップされたとき
  const onDrop = useCallback((files) => {
    if (files.length > 0) {
      files.forEach((file) => {
        const reader = new FileReader();

        // ファイルの読み取りが中止
        reader.onabort = () => {};
        // ファイルの読み取りが失敗
        reader.onerror = () => {};

        // ファイルの読み取りがされた場合
        reader.onload = () => {
          // エラーメッセージフィールドを非表示
          const msgElm = document.getElementById("file-err-msg");
          msgElm.classList.add("hidden");
          let previewVideoElm = document.getElementById("previewVideo");
          previewVideoElm.src = reader.result;
          previewVideoElm.classList.remove("hidden");
          document.getElementById("notSelectedV").classList.add("hidden");
          document.getElementById("recordSoundBtn").classList.remove("hidden");
        };

        reader.readAsDataURL(file);
      });
      console.log(files);
      setFiles(files[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDropRejected,
    maxSize: MAX_FILE_SIZE * 1024 * 1024,
    accept: {
      "video/mpeg": [],
      "video/mp4": [],
      "video/webm": [],
      "video/quicktime": [],
      "video/x-msvideo": [],
    },
  });

  return (
    <div className="flex">
      {/* ファイルアップロードエリア */}
      <div className="w-3/6">
        {/* エラーメッセージフィールド */}
        <div
          id="file-err-msg"
          className="hidden relative min-h-8 pb-1 w-11/12 mt-3 mb-3 rounded border-2 border-l-8 border-red-400 bg-error-field-col"
        >
          <Image
            className="top-1/2 -translate-y-2/4 ml-2 absolute"
            src={fileErrIcon}
            alt="logo"
          ></Image>
        </div>
        <div
          {...getRootProps({
            onClick: (event) => event.stopPropagation(),
          })}
          style={
            isDragActive
              ? {
                  backgroundColor: "rgba(66, 135, 245, 0.2)",
                }
              : {}
          }
          className="select-none w-11/12 h-72 border border-dashed border-file-up-border-col bg-file-up-bg"
        >
          <input {...getInputProps()}></input>
          <div className="text-center">
            <div className="flex justify-center mt-4">
              <Image
                className="pointer-events-none"
                priority
                src={filupIcon}
                alt="logo"
              ></Image>
            </div>
            <div className="text-text-sub-col">
              <div>動画をドラック＆ドロップ</div>
              <div className="text-xs mt-2 mb-2">または</div>
            </div>
            <button
              {...getRootProps()}
              className="shadow-lg pl-12 pr-12 pt-1 pb-1  rounded-xl text-white  bg-btn-common-col1"
            >
              動画を選択する
            </button>
          </div>
        </div>
        <ul className="text-text-sub-col text-sm mt-6">
          <li>
            ・アップロード可能ファイルはヘルプメッセージを参照してください。
            <Image className="inline-block" src={helpIcon} alt="logo"></Image>
          </li>
          <li className="mt-3">
            ・最大で200MBまたは5分以内の動画がアップロード可能です。
          </li>
          <li className="mt-4">・動画は1つまでアップロード可能です。</li>
        </ul>
      </div>
      {/* 動画閲覧エリア */}
      <div className="w-3/6 text-center">
        <div className="h-[400px] w-full">
          <div
            id="notSelectedV"
            className="flex flex-col justify-center align-middle border-2 shadow-inner h-[400px] w-full"
          >
            <div className="mb-8">
              <Image className="inline-block" src={noVide} alt="logo"></Image>
              <div className="text-gray-400 pl-4">
                動画が選択されていません。
              </div>
            </div>
          </div>
          <video
            id="previewVideo"
            className="hidden transform scale-y-150"
            muted
            playsInline
          ></video>
        </div>
        <button
          id="recordSoundBtn"
          className="hidden border-red-600 rounded-full p-2"
        >
          <Image src={micIcon} alt="logo"></Image>
        </button>
      </div>
    </div>
  );
};

export default VideoPosting;
