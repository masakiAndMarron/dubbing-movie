"use client";
import * as React from "react";
import { useCallback, useRef } from "react";
import userIcon from "../../../public/icons/user-unkown-icon.png";
import kingIcon from "../../../public/icons/king-icon.png";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export const VideoCard = (props) => {
  const videoRef = useRef();
  const audioRef = useRef();
  const rank = props.rank;

  const playVideo = useCallback(() => {
    audioRef.current.play();
  }, []);

  const pauseVideo = useCallback(() => {
    audioRef.current.pause();
  }, []);

  const synchronize = useCallback(() => {
    audioRef.current.currentTime = videoRef.current.currentTime;
  }, []);

  const playAudio = useCallback(() => {
    videoRef.current.play();
  }, []);

  const pauseAudio = useCallback(() => {
    videoRef.current.pause();
  }, []);

  return (
    <div>
      {typeof rank != "undefined" && (
        <div className="text-center space-x-1">
          <span className="font-bold text-lg">
            {rank === 1 && <Image className="inline pb-1" src={kingIcon} />}{" "}
            {rank}
          </span>
          <span>位</span>
        </div>
      )}
      <Card className="w-[350px]">
        <CardContent className="p-0">
          <video
            onPlay={() => playVideo()}
            onPause={() => pauseVideo()}
            onSeeked={() => synchronize()}
            ref={videoRef}
            muted
            controls
            className="w-full"
          >
            <source src={props.videoSrc} type="video/mp4"></source>
          </video>
          <audio
            onPlay={() => playAudio()}
            onPause={() => pauseAudio()}
            onSeeked={() => synchronize()}
            ref={audioRef}
            src={props.soundSrc}
          ></audio>
        </CardContent>
        <CardFooter className="p-3 flex">
          <Image src={userIcon}></Image>
          <CardTitle className="pl-2 text-sm tracking-wide">
            <Link
              className="border-b-[1px] text-blue-600 border-blue-600"
              href={{
                pathname: "/dubbing-movie",
                query: {
                  id: props.id,
                },
              }}
            >
              {props.title}
            </Link>
          </CardTitle>
        </CardFooter>
      </Card>
    </div>
  );
};
