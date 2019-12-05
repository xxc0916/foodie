import * as copy from "copy-to-clipboard";
import axios from "axios";
const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
  @property(cc.Label)
  label: cc.Label = null;

  @property
  text: string = "hello";

  // LIFE-CYCLE CALLBACKS:

  // onLoad () {}

  start() {}

  async touch() {
    // copy("https://shard.llssite.com/?id=1&appid=2");
    const data = await axios.get("http://10.180.3.137/votes/1/result");
    cc.log(data);
  }

  touch2() {
    const Request: any = this.GetRequest();
    alert(Request.id);
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

  // update (dt) {}
}
