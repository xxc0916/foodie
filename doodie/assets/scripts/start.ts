import { userData, roomData } from "./data";

const { ccclass, property } = cc._decorator;

@ccclass
export default class start extends cc.Component {
  start() {
    const key = "foodId";
    const localId = cc.sys.localStorage.getItem(key);
    if (localId) {
      userData.uid = localId;
    } else {
      const foodId = this.GenNonDuplicateID(3);
      userData.uid = foodId;
      cc.sys.localStorage.setItem(key, foodId);
    }
    const Request: any = this.GetRequest();
    roomData.vid = Request.vid;
    if (Request && roomData.vid) {
      cc.director.loadScene("two");
    }
  }

  GetRequest() {
    var url = location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
      const str = url.substr(1);
      const strs = str.split("&");
      for (var i = 0; i < strs.length; i++) {
        theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
      }
    }
    return theRequest;
  }

  GenNonDuplicateID(randomLength) {
    let idStr = Date.now().toString(36);
    idStr += Math.random()
      .toString(36)
      .substr(3, randomLength);
    return idStr;
  }
}
