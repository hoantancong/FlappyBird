
import { _decorator, Component, Node, Prefab, instantiate, Vec3, Canvas, Quat } from 'cc';
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
    ongNuocPrefab: Prefab | null = null;
    @property(Canvas)
    gameCanvas: Canvas | null = null;

    private ongNuocArr: Node[] = [];
    start() {
        // [3]
        console.log(this.name, "hello world");
        this.initGame();
    }

    //
    public trackingBird(birdX:number){
        //
        // console.log('this.name');
        // console.log('this.name',this.ongNuocArr[0]);
        if(this.ongNuocArr[0]){

            let firstPipeX = this.ongNuocArr[0].position.x;
            let delta = birdX - firstPipeX;
            if(delta > 2000){
                //move the pipe
                console.log(this.name,'change pipe');
                this.ongNuocArr[0].setPosition(new Vec3(firstPipeX+4500,160))
                let currentPipe = this.ongNuocArr.shift();
                this.ongNuocArr.push(currentPipe);
            }
            
        }
      
    }

    initGame() {
        //khoi tao ong nuoc
        this.createPipe();
    }
    private createPipe() {
        //tao ong nuoc hang 1




        for (var i = 0; i < 3; i++) {
            let ongNuoc = instantiate(this.ongNuocPrefab);
            //
            //let y = i>3?870:970
            let x =0 ;
            if(i<3){
                x = 0 + i * 1500;
            }

            ongNuoc.position = new Vec3(x, 160)
            //
            //
            this.gameCanvas.node.addChild(ongNuoc);
            //day vao mang
            this.ongNuocArr.push(ongNuoc);
        }
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
