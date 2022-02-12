
import { _decorator, Component, Node, Sprite, Label, Vec2, Vec3, input, Input, EventTouch, RigidBody2D } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = BirdController
 * DateTime = Fri Feb 11 2022 22:56:36 GMT+0700 (Indochina Time)
 * Author = hoantancong
 * FileBasename = BirdController.ts
 * FileBasenameNoExtension = BirdController
 * URL = db://assets/scripts/BirdController.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
 *
 */
 
@ccclass('BirdController')
export class BirdController extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;
    @property
    speed:number = 0;
    @property({type:Node})
    tail:Node | null = null;

    @property({type:Label})
    playerNameText:Label | null = null;

    health:number = 10;

    birdBody:RigidBody2D | null = null;
    //
    //
    start () {
        // [3]
        this.playerNameText.string = 'Bird 1';
        this.tail.position = new Vec3(1,1,0);
        //
        this.birdBody = this.node.getComponent(RigidBody2D);
        //
        //khai bao ham touch start
        input.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
        //
        // input.on(Input.EventType.TOUCH_END, this.onTouchEnd, this);
        // //

    }
    onTouchStart(event: EventTouch) {
        // console.log(event.getLocation());  // location on screen space
        // console.log(event.getUILocation());  // location on UI space
        console.log(this.name,'Click');
        this.birdBody.applyForce(new Vec2(0,100000),Vec2.ZERO,false);
    }

    // onTouchEnd(event: EventTouch) {

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
