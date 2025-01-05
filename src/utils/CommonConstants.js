/** 
################################
#        定数ファイル           #
################################ 
*/

export const ENDPOINT_VALUE = "http://localhost:8080/";

export const MAX_FILE_SIZE = 200;
export const FILE_SIZE_OVER_MSG =
  "ファイルサイズが大きすぎます。50MB以下のファイルをアップロードしてください。";
export const FILE_TYPE_NOT_ALLOWED_MSG =
  "ファイル形式が許可されていません。アップロード可能なファイル形式は.mp4 .mpeg .webm .quicktime .aviです。";

export const DEV_ARRAY = [
  {
    userId: null,
    movieId: 1,
    movieTitle: "テストタイトル",
    movieFilePath: "../video/testsample.mp4",
    movieSoundFilePath:
      "blob:http://localhost:3000/ac07d8b4-b041-4dd3-8aed-2b866c6ef4f3",
    starCount: 0,
  },
  {
    userId: null,
    movieId: 2,
    movieTitle: "テストタイトル2",
    movieFilePath: "../video/testsample.mp4",
    movieSoundFilePath:
      "blob:http://localhost:3000/ac07d8b4-b041-4dd3-8aed-2b866c6ef4f3",
    starCount: 1,
  },
  {
    userId: null,
    movieId: 3,
    movieTitle: "テストタイトル3",
    movieFilePath: "../video/testsample.mp4",
    movieSoundFilePath: null,
    starCount: 2,
  },
  {
    userId: null,
    movieId: 4,
    movieTitle: "テストタイトル4",
    movieFilePath: "../video/testsample.mp4",
    movieSoundFilePath: null,
    starCount: 8,
  },
  {
    userId: null,
    movieId: 5,
    movieTitle: "テストタイトル5",
    movieFilePath: "../video/testsample.mp4",
    movieSoundFilePath: null,
    starCount: 12,
  },
  {
    userId: null,
    movieTitle: "テストタイトル6",
    movieId: 6,
    movieFilePath: "../video/testsample.mp4",
    movieSoundFilePath: null,
    starCount: 890,
  },
];
