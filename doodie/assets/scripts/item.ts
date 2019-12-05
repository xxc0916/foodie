import { news } from "./type";
import { userData } from "./data";

// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class item extends cc.Component {
  @property(cc.Label)
  label: cc.Label = null;

  @property(cc.Node)
  choose: cc.Node = null;

  @property(cc.Node)
  noChoose: cc.Node = null;

  isChoose = false;

  id = null;
  canvas: cc.Node = null;
  isVote = false; //true 发起投票 false 投票
  onLoad() {
    this.canvas = cc.find("Canvas");
  }

  init(text: string, id, isVote) {
    this.label.string = text;
    this.id = id;
    this.isVote = isVote;
    if (!this.isVote) {
      this.canvas.on(news, id => {
        if (this.id !== id) {
          this.isChoose = false;
        }
        this.updateUI();
      });
    }
  }

  touch() {
    this.isChoose = !this.isChoose;
    if (!this.isVote) {
      userData.sid = this.id;
      this.canvas.emit(news, this.id);
    }
    this.updateUI();
  }
  updateUI() {
    this.choose.active = this.isChoose;
    this.noChoose.active = !this.isChoose;
  }
}
