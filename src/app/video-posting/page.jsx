"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import filupIcon from "../../../public/icons/ph_file-video-thin.png";
import helpIcon from "../../../public/icons/help.png";
import micIcon from "../../../public/icons/mic-record.png";
import stopIcon from "../../../public/icons/stopIcon.png";
import fileErrIcon from "../../../public/icons/file-error.png";
import noVide from "../../../public/icons/no-video.png";
import {
  FILE_SIZE_OVER_MSG,
  MAX_FILE_SIZE,
  FILE_TYPE_NOT_ALLOWED_MSG,
} from "../../utils/CommonConstants";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ENDPOINT_VALUE } from "../../utils/CommonConstants";

const VideoPosting = () => {
  const [movieFile, setMovieFile] = useState(""); // 動画ファイル
  const [audioFile, setAudioFile] = useState(""); // 音声ファイル
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isRecording, setIsRecording] = useState(false);

  const audioRef = useRef();
  const mediaRecorderRef = useRef();

  const uploadVideo = useCallback(() => {
    const formData = new FormData();
    formData.append("movieFile", movieFile[0]);
    formData.append("movieSoundFile", audioFile);
    formData.append("title", title);
    formData.append("description", description);
    fetch(ENDPOINT_VALUE + "posting", {
      method: "POST",
      body: formData,
    });
  });

  const inputTitle = useCallback(
    (event) => {
      setTitle(event.target.value);
    },
    [title]
  );

  const inputDescription = useCallback(
    (event) => {
      setDescription(event.target.value);
    },
    [description]
  );

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

  useEffect(() => {
    // マイクへのアクセス権を取得
    navigator.getUserMedia =
      navigator.getUserMedia || navigator.webkitGetUserMedia;

    navigator.getUserMedia(
      {
        audio: true,
        video: false,
      },
      handleSuccess,
      hancleError
    );
  }, []);

  const handleSuccess = (stream) => {
    // レコーディングのインスタンスを作成
    mediaRecorderRef.current = new MediaRecorder(stream, {
      mimeType: "video/webm;codecs=vp9",
    });

    let chunks = [];

    mediaRecorderRef.current.addEventListener("dataavailable", (ele) => {
      if (ele.data.size > 0) {
        chunks.push(ele.data); // 音声データを格納
      }
    });

    mediaRecorderRef.current.addEventListener("stop", () => {
      const audioBlob = new Blob(chunks, { type: "audio/wav" }); // wav形式に変換
      const audioUrl = URL.createObjectURL(audioBlob);
      audioRef.current.src = audioUrl;
      setAudioFile(audioUrl);
      chunks = [];
    });
  };

  const hancleError = () => {
    alert("エラーです。");
  };

  // 録音開始
  const startRecording = () => {
    setIsRecording(true);
    mediaRecorderRef.current.start();
  };

  // 録音停止
  const stopRecording = () => {
    setIsRecording(false);
    mediaRecorderRef.current.stop();
  };

  // 動画がドロップされたとき
  const onDrop = useCallback((files) => {
    setMovieFile(files);
    if (files.length > 0) {
      files.forEach((file) => {
        const reader = new FileReader();

        // ファイルの読み取りが中止
        reader.onabort = () => {};
        // ファイルの読み取りが失敗
        reader.onerror = () => {};

        // ファイルの読み取りが完了した場合
        reader.onload = () => {
          // エラーメッセージフィールドを非表示
          const msgElm = document.getElementById("file-err-msg");
          msgElm.classList.add("hidden");
          let previewVideoElm = document.getElementById("previewVideo");
          previewVideoElm.src = reader.result;
          previewVideoElm.classList.remove("hidden");
          document.getElementById("notSelectedV").classList.add("hidden");
          document.getElementById("recordAudioBtn").classList.remove("hidden");
          document.getElementById("fileName").classList.remove("hidden");
          document.getElementById("titleField").classList.remove("hidden");
          document
            .getElementById("descriptionField")
            .classList.remove("hidden");

          let dataUrl = reader.result;
          // DataUriをBASE64形式で保存
          // setMovieFile(dataUrl.replace(/^data:\w+\/\w+;base64,/, ""));
        };
        reader.readAsDataURL(file);
      });
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
        {/* ファイル名表示エリア */}
        <div className="hidden mt-5 w-4/5 h-12 border rounded-xl">
          <div
            id="fileName"
            className="w-[80%] leading-[48px] inline-block h-full pl-3"
          ></div>
          <div className="w-[20%] leading-[48px] h-full inline-block border-l text-center">
            <button className="h-8 leading-8 pl-12 pr-12 rounded-xl text-white  bg-btn-common-col1">
              削除
            </button>
          </div>
        </div>
      </div>
      {/* 動画閲覧エリア */}
      <div className="w-3/6 text-center">
        <div className="h-[500px] w-full">
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
            className="max-w-full hidden"
            muted
            playsInline
          ></video>
          <audio className="hidden" ref={audioRef} controls id="audio"></audio>
          {isRecording ? (
            <button
              id="stopAudioBtn"
              onClick={() => stopRecording()}
              className="mt-6 hidden border-4 border-red-600 rounded-full p-2 transform"
            >
              <Image src={stopIcon} alt="rogo"></Image>
            </button>
          ) : (
            <button
              id="recordAudioBtn"
              onClick={() => startRecording()}
              className="mt-6 hidden border-4 border-red-600 rounded-full p-2 transform"
            >
              <Image src={micIcon} alt="rogo"></Image>
            </button>
          )}
          {/* タイトル */}
          <div id="titleField" className="hidden mt-5 h-12">
            <div className="flex justify-center items-center h-full">
              <span className="text-red-600 whitespace-nowrap">[必須]</span>
              <Input
                onChange={(event) => inputTitle(event)}
                className="inline-block h-full w-11/12 ml-3 mr-3"
                placeholder="タイトルを入力してください..."
              />
            </div>
          </div>
          <div id="descriptionField" className="hidden mt-5 h-24">
            <div className="flex justify-center items-center h-full">
              <span className="text-gray-400 whitespace-nowrap">[任意]</span>
              <Textarea
                onChange={(event) => inputDescription(event)}
                className="inline-block h-full w-11/12 ml-3 mr-3"
                placeholder="説明文を入力してください..."
              />
            </div>
          </div>
        </div>
        <button
          onClick={() => uploadVideo()}
          className="border rounded-xl shadow-md text-white fixed bottom-[2%] right-[2%] w-40 h-11 bg-btn-common-col2"
          id="videoPosting"
        >
          投稿する
        </button>
      </div>
    </div>
  );
};

export default VideoPosting;
