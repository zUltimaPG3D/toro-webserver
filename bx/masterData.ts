import {config} from "../config.ts";

export async function getAllMstPackages() {
  const baseAddr = config.scheme + "://" + config.ip + ":" + config.port;
  return [
    {
      "name": "MstNewsList",
      "hash": "",
      "url": baseAddr + "/bx/masterData/MstNewsList.json",
      "size": 0
    }
  ];
}