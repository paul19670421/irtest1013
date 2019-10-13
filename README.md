# Maqueen Package for Micro:bit
繁體中文板翻譯:kodorobot宇宙機器人 源自於:DFRobot


## Read IR
```blocks
let data = 0
data = maqueen.IR_read()

maqueen.IR_callbackUser(function ({ myparam: message }) {
    basic.showString(message)
})
```

## License
MIT

## Supported targets
for PXT/microbit (The metadata above is needed for package search.)