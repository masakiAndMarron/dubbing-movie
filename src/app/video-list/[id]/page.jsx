"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { VideoCard } from "../videoCard";
import { ENDPOINT_VALUE } from "@/utils/CommonConstants";
import { Separator } from "@/components/ui/separator";
import { DEV_ARRAY } from "@/utils/CommonConstants";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import videoIcon from "../../../../public/icons/video-post-icon.png";
import fireIcon from "../../../../public/icons/fire-icon.png";
import magnifyingGlassIcon from "../../../../public/icons/magnifying-glass-icon.png";
import Image from "next/image";
import Link from "next/link";

const videoListId = ({ params: { id } }) => {
  const [videoList, setVideoList] = useState([]);
  const [bakVideoList, setBakVideoList] = useState([]);
  const keyWordRef = useRef();

  useEffect(() => {
    let allContent = {};
    allContent["rank"] = DEV_ARRAY.sort((aft, bef) => {
      return aft["starCount"] < bef["starCount"];
    }).slice(0, 4);

    allContent["other"] = DEV_ARRAY.sort((aft, bef) => {
      return aft["starCount"] < bef["starCount"];
    }).slice(3);

    setVideoList(allContent);
    setBakVideoList(allContent); // バックアップ

    console.log(allContent);
    // let reqData = { ID: id };
    // fetch(ENDPOINT_VALUE + "video-list", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(reqData),
    // })
    //   .then((res) => {
    //     return res.json();
    //   })
    //   .then((data) => {
    //     console.log(data);
    //     if (data.apiCode === "0") {
    //       throw new Error("エラー");
    //     }
    //   })
    //   .catch((error) => {});
  }, []);

  const searchVideoList = useCallback(() => {
    const keyword = keyWordRef.current.value;
    let newVideoList = JSON.parse(JSON.stringify(videoList));
    let newBakVideoList = JSON.parse(JSON.stringify(bakVideoList));
    newVideoList.other = newBakVideoList.other.filter((data) => {
      return data.movieTitle.includes(keyword);
    });
    setVideoList(newVideoList);
  }, [videoList]);

  return (
    <>
      <div className="text-end mr-24 mt-6">
        <Link href={"/video-posting"}>
          <Button className="bg-btn-common-col2 text-white rounded-3xl">
            投稿する
            <Image
              className="bg-white rounded-[50%]"
              src={videoIcon}
              alt="ロゴ"
            />
          </Button>
        </Link>
      </div>
      <div className="ml-24 flex">
        <span className="text-rank-fire-icon-col font-bold">人気順</span>
        <Image className="ml-2 pb-2" src={fireIcon} alt="ロゴ" />
      </div>
      {videoList.rank !== undefined && (
        <div>
          <div className="flex m-6 ml-24">
            {videoList.rank.map((data, index) => {
              return (
                <div className="ml-6 mr-6">
                  <VideoCard
                    rank={index + 1}
                    key={index}
                    id={data.movieId}
                    title={data.movieTitle}
                    videoSrc={data.movieFilePath}
                  ></VideoCard>
                </div>
              );
            })}
          </div>
          <Separator />
          <div>
            <div className="flex justify-center mt-4">
              <Input
                ref={keyWordRef}
                placeholder="キーワードで検索"
                className="w-80"
              />
              <Button
                onClick={() => searchVideoList()}
                className="bg-white border ml-[0.2px]"
              >
                <Image src={magnifyingGlassIcon} alt="ロゴ" />
              </Button>
            </div>
            <div className="flex m-6">
              {videoList.other.map((data, index) => {
                return (
                  <div className="ml-2 mr-2">
                    <VideoCard
                      key={index}
                      id={id}
                      title={data.movieTitle}
                      videoSrc={data.movieFilePath}
                    ></VideoCard>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default videoListId;
