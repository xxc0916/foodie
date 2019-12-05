import { roomData, netUrl } from "./data";
import * as copy from "copy-to-clipboard";
import axios from "axios";
const { ccclass, property } = cc._decorator;

@ccclass
export default class two extends cc.Component {
  @property(cc.Node)
  confirm: cc.Node = null;
  start() {
    if (roomData.vid) {
      // 投票逻辑
    } else {
      // 发起投票逻辑
    }
  }

  async getShops() {
    const shopData: any = await axios.get(netUrl + "shops");
    return shopData.datas;
  }

  async touch() {
    const url = "https://shard.llssite.com/?vid=" + roomData.vid;
    copy(url);
    alert("地址已经复制，请到粘贴到群");
  }

  // update (dt) {}
}
