
import { _decorator, Component, Node, Vec2, Vec3, input, Input, EventTouch, RigidBody2D, Collider2D, Contact2DType, IPhysics2DContact, Camera, ERigidBody2DType, dragonBones } from 'cc';
import { GameController } from './GameController';
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

    @property(Camera)
    gameCamera:Camera | null = null;


    health:number = 10;

    birdBody:RigidBody2D | null = null;
    //
    isGameOver:boolean = false;
    //
    @property(Node)
    private gameNode:Node | null = null;
    
    private gameController:GameController | null = null;
    //
    private birdAnimator:dragonBones.ArmatureDisplay | null = null;


    //
    start () {
        // [3]
        this.gameController = this.gameNode.getComponent(GameController);
        this.tail.position = new Vec3(1,1,0);
        //
        this.birdBody = this.node.getComponent(RigidBody2D);
        //
        //khai bao ham touch start
        input.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
        //
        // input.on(Input.EventType.TOUCH_END, this.onTouchEnd, this);
        // //
        let collider = this.getComponent(Collider2D);
        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }
        //
        this.birdAnimator = this.node.getComponent(dragonBones.ArmatureDisplay);
        //
        //

    }
    public birdStart(){
        this.node.getComponent(RigidBody2D).type = ERigidBody2DType.Dynamic;
        console.log(this.node.getComponent(RigidBody2D).type);
    }
    onBeginContact (selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        // will be called once when two colliders begin to contact
        if(otherCollider.node.name=="ong_nuoc"){
            //gameo ver
            this.birdAnimator.playAnimation('die');
            console.log('Game over');
            this.isGameOver=true;
            this.gameController.gameOver();
            //stop di chuyen
        }
    }
    onTouchStart(event: EventTouch) {
        // console.log(event.getLocation());  // location on screen space
        // console.log(event.getUILocation());  // location on UI space
        if(this.isGameOver){
            return;
        }
        console.log(this.name,'Click');
        this.birdBody.applyForce(new Vec2(0,50000),Vec2.ZERO,false);
    }
    onCollisionEnter(other, self){
        console.log(this.name,other.name);
    }
    // onTouchEnd(event: EventTouch) {

    // }
    update(deltaTime:number){
        //
        //x = x+0.1
        //
        //
        if(this.isGameOver) return;
        //
        let oldX = this.node.position.x;
        let newX=oldX+=3;
        this.gameCamera.node.setPosition(newX,0,1000)
        this.node.setPosition(new Vec3(newX,this.node.position.y,0));
        //
        this.gameController.trackingBird(newX);
        //
    }
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
