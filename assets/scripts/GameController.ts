
import { _decorator, Component, Node, Prefab, instantiate, Vec3, Canvas, Quat, Label, Director, director, Camera } from 'cc';
import { BirdController } from './BirdController';
import { RestartUI } from './RestartUI';
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
    @property(Camera)
    camera:Camera;
    @property(Prefab)
    ongNuocPrefab: Prefab | null = null;
    @property(Node)
    gameBackground:Node | null = null;

    @property(Node)
    gameUI:Node | null = null;
    private ongNuocArr: Node[] = [];
    //button
    @property(Node)
    private PlayButtonNode:Node | null = null;

    //
    private birdPositionX:number = 0;
    @property(Prefab)
    private birdPrefab:Prefab | null = null;
    //
    @property(Node)
    private bird:Node | null = null;
    private scoreNumber:number = 0;
    //SCORE TEXT LEBEL
    @property(Label)
    private scoreLabel:Label | null = null;

    //game over
    @property(Prefab)
    private gameOverPrefab:Prefab | null = null;
    start() {
        // [3]
        console.log(this.name, "hello world");
        this.initGame();
    }

    //
    public trackingBird(birdX:number){
        //
        this.birdPositionX = birdX;
        this.camera.node.setPosition(new Vec3(birdX,0,1000));
        // console.log('this.name');
        // console.log('this.name',this.ongNuocArr[0]);
        if(this.ongNuocArr[0]){

            let firstPipeX = this.ongNuocArr[0].position.x;
            let delta = birdX - firstPipeX;
            if(delta > 2000){
                //update score
                this.scoreNumber++;
                //
                this.scoreLabel.string = ""+this.scoreNumber;
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
        this.scoreNumber = 0;
        this.scoreLabel.string = ""+this.scoreNumber;
        this.PlayButtonNode.on(Node.EventType.TOUCH_END,this.onStartGame,this,true);
        //this.onStartGame();
  
    }
    private onStartGame(){
        //
        this.createPipe();
        //
        this.PlayButtonNode.active = false;
        if(this.bird){
            this.bird.getComponent(BirdController).birdStart();
        }
        //
    }
    private createPipe() {
        //tao ong nuoc hang 1

        console.log("create pipe");


        for (var i = 0; i < 3; i++) {
            let ongNuoc = instantiate(this.ongNuocPrefab);
            //
            //let y = i>3?870:970
            let x =0 ;
            if(i<3){
                x = this.birdPositionX + 1000 + i * 1500;
            }

            ongNuoc.position = new Vec3(x, 160)
            //
            //
            this.gameBackground.addChild(ongNuoc);
            //day vao mang
            this.ongNuocArr.push(ongNuoc);
        }
        //
    }
    public gameOver(){
        const showRestartUI = ()=>{
            console.log(this.name,'Game over 123....');
            let restartUI = instantiate(this.gameOverPrefab);
            this.gameUI.addChild(restartUI);
            restartUI.getComponent(RestartUI).init(this.scoreNumber,()=>{
                director.loadScene('maingame')
            })
        }
        setTimeout(() => {
            //
            //show restart ui 
            showRestartUI();
            //
        }, 1000);
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
