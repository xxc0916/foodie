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

  start() {}

  init(text: string) {
    this.label.string = text;
  }

  touch() {
    this.isChoose = !this.isChoose;
    this.choose.active = this.isChoose;
    this.noChoose.active = this.isChoose;
  }
}
