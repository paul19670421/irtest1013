let maqueencb: Action
let maqueenmycb: Action
let maqueene = "1"
let maqueenparam = 0
let alreadyInit = 0
let IrPressEvent = 0
const MOTER_ADDRESSS = 0x10

enum PingUnit {
    
	//% block="cm"
    Centimeters,
    
	//% block="μs"
    MicroSeconds

	}



//% weight=10 color=#008B00 icon="\uf136" block="maqueen"

namespace maqueen {

    
	export class Packeta {
        
		public mye: string;
        public myparam: number;
    
	}

    
	   
	    
	   
	//% advanced=true shim=maqueenIR::initIR
    function initIR(pin: Pins): void {
        
		return
    
	}
    
	//% advanced=true shim=maqueenIR::onPressEvent
    function onPressEvent(btn: RemoteButton, body: Action): void {

        	return
    
	}
    
	//% advanced=true shim=maqueenIR::getParam
    function getParam(): number {
        return 0
    }

    function maqueenInit(): void {

        	if (alreadyInit == 1) {
            
			return
        
		}
        initIR(Pins.P16)
        alreadyInit = 1
    
	}



    
	//% weight=100
    
	//% blockGap=50
    

	//% blockId=IR_callbackUser block="on IR received"
    
export function IR_callbackUser(maqueencb: (message: number) => void) {

       	 maqueenInit();
        IR_callback(() => {
            const packet = new Packeta();
            packet.mye = maqueene;
            maqueenparam = getParam();
            packet.myparam = maqueenparam;
            maqueencb(packet.myparam);
        });
    }

    
	//% weight=10
    
	//% blockId=IR_read block="read IR"
    export function IR_read(): number {
        maqueenInit()
        return getParam()
    }

    
	//% weight=10
    
	//% blockId=IR_read_version block="Get product information"
    export function IR_read_version(): string {
        maqueenInit()
        pins.i2cWriteNumber(0x10, 50, NumberFormat.UInt8BE);
        let dataLen = pins.i2cReadNumber(0x10, NumberFormat.UInt8BE);
        pins.i2cWriteNumber(0x10, 51, NumberFormat.UInt8BE);
        let buf = pins.i2cReadBuffer(0x10, dataLen, false);
        let version = "";
        for (let index = 0; index < dataLen; index++) {
            version += String.fromCharCode(buf[index])
        }
        return version
    }

    function IR_callback(a: Action): void {
        maqueencb = a
        IrPressEvent += 1
        onPressEvent(IrPressEvent, maqueencb)
    }

    
	//% blockId=ultrasonic_sensor block="sensor unit|%unit"
    
	//% weight=95
    
export function sensor(unit: PingUnit, maxCmDistance = 500): number {
        // send pulse  basic.pause=sleep control.waitMicros=delay
        pins.setPull(DigitalPin.P1, PinPullMode.PullNone);
        pins.digitalWritePin(DigitalPin.P1, 0);
        control.waitMicros(2);
        pins.digitalWritePin(DigitalPin.P1, 1);
        control.waitMicros(10);
        pins.digitalWritePin(DigitalPin.P1, 0);
        pins.setPull(DigitalPin.P2, PinPullMode.PullUp);



        // read pulse
        let d = pins.pulseIn(DigitalPin.P2, PulseValue.High, maxCmDistance * 42);
        console.log("Distance: " + d / 42);

        basic.pause(50)

        let x = Math.round(d / 42);
        let y = Math.round(d / 1);
        switch (unit) {

            case PingUnit.Centimeters: return x;
            default: return y;
        }
    }

    //% weight=90
    
	//% blockId=motor_MotorRun block="Motor|%index|dir|%Dir|speed|%speed"
    
	//% speed.min=0 speed.max=255
    
	//% index.fieldEditor="gridpicker" index.fieldOptions.columns=2
    
	//% direction.fieldEditor="gridpicker" direction.fieldOptions.columns=2
    export function MotorRun(index: aMotors, direction: Dir, speed: number): void {
        let buf = pins.createBuffer(3);
        if (index == 0) {
            buf[0] = 0x00;
            buf[1] = direction;
            buf[2] = speed;
            pins.i2cWriteBuffer(0x10, buf);
        }
        if (index == 1) {
            buf[0] = 0x02;
            buf[1] = direction;
            buf[2] = speed;
            pins.i2cWriteBuffer(0x10, buf);
        }
        if (index == 2) {
            buf[0] = 0x00;
            buf[1] = direction;
            buf[2] = speed;
            pins.i2cWriteBuffer(0x10, buf);
            buf[0] = 0x02;
            pins.i2cWriteBuffer(0x10, buf);
        }
    }

    //% weight=20
    
	//% blockId=motor_motorStop block="Motor stop|%motors"
    
	//% motors.fieldEditor="gridpicker" motors.fieldOptions.columns=2 
    export function motorStop(motors: aMotors): void {
        let buf = pins.createBuffer(3);
        if (motors == 0) {
            buf[0] = 0x00;
            buf[1] = 0;
            buf[2] = 0;
            pins.i2cWriteBuffer(0x10, buf);
        }
        if (motors == 1) {
            buf[0] = 0x02;
            buf[1] = 0;
            buf[2] = 0;
            pins.i2cWriteBuffer(0x10, buf);
        }

        if (motors == 2) {
            buf[0] = 0x00;
            buf[1] = 0;
            buf[2] = 0;
            pins.i2cWriteBuffer(0x10, buf);
            buf[0] = 0x02;
            pins.i2cWriteBuffer(0x10, buf);
        }

    }
    /*
        
	//% weight=10
        

    
	   
					