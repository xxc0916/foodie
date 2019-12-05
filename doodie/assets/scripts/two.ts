import { roomData, netUrl, userData } from "./data";
import * as copy from "copy-to-clipboard";
import axios from "axios";
import item from "./item";
const { ccclass, property } = cc._decorator;

@ccclass
export default class two extends cc.Component {
  @property(cc.Node)
  confirm: cc.Node = null;

  @property(cc.Prefab)
  item: cc.Prefab = null;

  @property(cc.PageView)
  target: cc.PageView = null;

  @property(cc.EditBox)
  box: cc.EditBox = null;

  @property(cc.Node)
  touchNode: cc.Node = null;

  itemArr: item[] = [];
  async start() {
    if (roomData.vid) {
      // 投票逻辑
    } else {
      // 发起投票逻辑
      await this.initiateVote();
    }
  }

  async getShops() {
    const shopData: any = await axios.get(netUrl + "shops");
    if (shopData && shopData.data) return shopData.data.datas;
  }

  async initiateVote() {
    const dataArr = await this.getShops();
    cc.log("dataArr", dataArr);
    // const dataArr = [
    //   { name: "拉面", id: "1" },
    //   { name: "拉面1", id: "2" },
    //   { name: "拉面2", id: "3" },
    //   { name: "拉面4", id: "4" },
    //   { name: "拉面5", id: "5" }
    // ];
    this.target.removeAllPages();
    dataArr.forEach(element => {
      const _item = cc.instantiate(this.item);
      this.target.addPage(_item);
      _item.getComponent("item").init(element.name, element.id, true);
      this.itemArr.push(_item.getComponent("item"));
    });
  }

  async addShops() {
    cc.log("11", this.box.string);
    if (this.box.string.length < 2) {
      alert("请输入合适店名");
    } else {
      this.touchNode.active = true;
      await axios.post(netUrl + "shops", {
        uid: userData.uid,
        name: this.box.string,
        distance: 500,
        star: 4
      });
      this.touchNode.active = false;
      this.initiateVote();
    }
  }
  async touch() {
    const arr = [];
    this.itemArr.forEach(ele => {
      if (ele.isChoose) {
        arr.push(ele.id);
      }
    });
    cc.log("arr", arr);
    // const data: any = await axios.post(netUrl + "votes", {
    //   uid: userData.uid,
    //   subject: "ll",
    //   shops: arr
    // });
    // roomData.vid = data.datas.vid;
    // const url = "https://shard.llssite.com/?vid=" + roomData.vid;
    // copy(url);
    // alert("地址已经复制，请到粘贴到群");
  }

  // update (dt) {}
}
