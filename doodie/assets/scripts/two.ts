import * as copy from "copy-to-clipboard";
import axios from "axios";
const { ccclass, property } = cc._decorator;

@ccclass
export default class two extends cc.Component {
  @property(cc.Label)
  label: cc.Label = null;

  @property
  text: string = "hello";

  start() {}

  async touch() {
    // copy("https://shard.llssite.com/?id=1&appid=2");
    // const data = await axios.get("http://10.180.3.137/votes/1/result");
    // cc.log(data);
    alert("地址已经复制，请到粘贴到群");
  }

  // update (dt) {}
}
