import { roomData, netUrl, userData } from "./data";
import * as copy from "copy-to-clipboard";
import axios from "axios";

import item from "./item";

const { ccclass, property } = cc._decorator;
function sum(m, n) {
  return Math.floor(Math.random() * (m - n) + n);
}
const key = "hasVote";
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

  @property(cc.Node)
  button2: cc.Node = null;
  @property(cc.Node)
  button3: cc.Node = null;
  @property(cc.Node)
  button4: cc.Node = null;

  @property(cc.Node)
  shareNode: cc.Node = null;

  itemArr: item[] = [];

  async start() {
    if (roomData.vid) {
      // 投票逻辑
      const _vid = cc.sys.localStorage.getItem(key);
      cc.log("-vid", _vid);
      if (_vid === roomData.vid) {
        this.gotoVoteEnd();
      } else {
        this.gotoVote();
      }
    } else {
      // 发起投票逻辑
      await this.initiateVote();
    }
  }

  re() {
    window.location.href = "https://shard.llssite.com";
  }

  async gotoVoteEnd() {
    const data: any = await axios.get(
      netUrl + "votes/" + roomData.vid + "/result"
    );
    cc.log("result", data);
    this.target.removeAllPages();
    let shopArr = data.data.datas.shops;
    shopArr.forEach(element => {
      const _item = cc.instantiate(this.item);
      this.target.addPage(_item);
      _item.getComponent("item").initResult(element.name, element.total);
      this.itemArr.push(_item.getComponent("item"));
    });
  }

  async gotoVote() {
    cc.sys.localStorage.setItem(key, roomData.vid);
    this.button3.active = true;
    this.button4.active = true;
    const shopData: any = await axios.get(netUrl + "votes/" + roomData.vid);
    let shopArr;
    if (shopData && shopData.data) {
      shopArr = shopData.data.datas.shops;
    }
    this.target.removeAllPages();
    shopArr.forEach(element => {
      const _item = cc.instantiate(this.item);
      this.target.addPage(_item);
      _item.getComponent("item").init(element.name, element.id, false);
      this.itemArr.push(_item.getComponent("item"));
    });
  }

  rand() {
    const num = sum(0, this.itemArr.length - 1);
    this.target.scrollToPage(num, 0.2);
    this.itemArr[num].touch();
  }

  async queRen() {
    this.touchNode.active = true;
    await axios.post(netUrl + "votes/post", {
      uid: userData.uid,
      vid: Number(roomData.vid),
      sid: userData.sid
    });
    await this.gotoVoteEnd();
  }
  async getShops() {
    const shopData: any = await axios.get(netUrl + "shops");
    if (shopData && shopData.data) return shopData.data.datas;
  }

  async initiateVote() {
    this.button2.active = true;
    this.box.node.active = true;
    this.confirm.active = true;
    const dataArr = await this.getShops();
    cc.log("dataArr", dataArr);
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
    if (arr.length !== 0) {
      const data: any = await axios.post(netUrl + "votes", {
        uid: userData.uid,
        subject: "ll",
        shops: arr
      });
      cc.log(data);
      roomData.vid = data.data.datas.vid;
      this.shareNode.active = true;
      this.confirm.active = false;
    } else {
      alert("请选择投票选项");
    }

    // alert("地址已经复制，请到粘贴到群");
  }

  share() {
    alert("地址已经复制，请到粘贴到群");
    const url = "https://shard.llssite.com/?vid=" + roomData.vid;
    // const url = "http://localhost:7456/?vid=" + roomData.vid;
    copy(url);
    window.close();
  }

  // update (dt) {}
}
