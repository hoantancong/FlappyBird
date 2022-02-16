
import { _decorator, Component, Node, Label } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = RestartUI
 * DateTime = Wed Feb 16 2022 22:39:18 GMT+0700 (Indochina Time)
 * Author = hoantancong
 * FileBasename = RestartUI.ts
 * FileBasenameNoExtension = RestartUI
 * URL = db://assets/scripts/RestartUI.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
 *
 */
 
@ccclass('RestartUI')
export class RestartUI extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;
    @property(Node)
    private restartButton:Node | null = null;

    @property(Label)
    private totalScoreLabel:Label | null = null;

    private restartCallBack:CallableFunction | null = null;
    start () {
        // [3]
        this.restartButton.on(Node.EventType.TOUCH_END,this.onRestartButton,this,true);
    }
    private onRestartButton(){
        console.log(this.name,'click restart');
        this.node.destroy();
        this.restartCallBack();
    }
    public init(score:number,callback:CallableFunction) {
        this.totalScoreLabel.string = 'Total:'+score; 
        this.restartCallBack = callback;
    }
    // update (deltaTime: number) {
    //     // [4]
    // }
}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.4/manual/en/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.4/manual/en/scripting/ccclass.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.4/manual/en/scripting/life-cycle-callbacks.html
 */
