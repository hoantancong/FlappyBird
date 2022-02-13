
import { _decorator, Component, Node, Prefab, instantiate, Vec3, Canvas } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = GameController
 * DateTime = Fri Feb 11 2022 22:44:10 GMT+0700 (Indochina Time)
 * Author = hoantancong
 * FileBasename = GameController.ts
 * FileBasenameNoExtension = GameController
 * URL = db://assets/scripts/GameController.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
 *
 */
 
@ccclass('GameController')
export class GameController extends Component {

    @property(Prefab)
    ongNuocPrefab:Prefab | null = null;
    @property(Canvas)
    gameCanvas:Canvas | null = null;

    ongNuocArr:Node[]=[];
    start () {
        // [3]
        console.log(this.name,"hello world");
        this.initGame();
    }

    initGame(){
        //tao ong nuoc
        let ongNuoc1 = instantiate(this.ongNuocPrefab);
        ongNuoc1.position = new Vec3(0,870)
        this.gameCanvas.node.addChild(ongNuoc1);


        let ongNuoc2 = instantiate(this.ongNuocPrefab);
        ongNuoc2.position = new Vec3(0,-940)
        ongNuoc2.setRotationFromEuler(new Vec3(0,0,180))
        this.gameCanvas.node.addChild(ongNuoc2);
        //
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
