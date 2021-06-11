/**
 * If you want to change which function happens with the action, swap the contents of the left column of purple blocks.
 */
function MakeAPattern () {
    for (let LEDnumber = 0; LEDnumber <= 29; LEDnumber++) {
        if (LEDnumber % 4 == 0) {
            // Change this to set the Even Pixel Color
            strip.setPixelColor(LEDnumber, neopixel.colors(NeoPixelColors.Orange))
        } else if (LEDnumber % 4 == 1) {
            // Change this to set the Even Pixel Color
            strip.setPixelColor(LEDnumber, neopixel.rgb(255, 50, 0))
        } else if (LEDnumber % 4 == 2) {
            // Change this to set the Even Pixel Color
            strip.setPixelColor(LEDnumber, neopixel.colors(NeoPixelColors.Red))
        } else {
            // Change this to set the Odd Pixel Color
            strip.setPixelColor(LEDnumber, neopixel.colors(NeoPixelColors.Yellow))
        }
    }
    strip.show()
}
function Fade_LEDs () {
    if (brightness > 10) {
        brightness += -10
    }
    SetBrightness(brightness)
}
function Compass () {
    degrees = input.compassHeading()
    // This is the code for the compass
    // The Default shows the closest direction (N for North, E for East...) but that can be changed. Currently set to change the LEDs to rainbow when facing north. In every other case the LEDs turn Red. Feel free to change the color values
    if (degrees < 45) {
        basic.showString("N")
        strip.showRainbow(1, 360)
    } else if (degrees < 135) {
        basic.showString("E")
        strip.showColor(neopixel.colors(NeoPixelColors.Red))
    } else if (degrees < 225) {
        basic.showString("S")
        strip.showColor(neopixel.colors(NeoPixelColors.Red))
    } else if (degrees < 315) {
        basic.showString("W")
        strip.showColor(neopixel.colors(NeoPixelColors.Red))
    } else {
        basic.showString("N")
        strip.showRainbow(1, 360)
    }
}
// Turn on Mode A
input.onButtonPressed(Button.A, function () {
    Mode = 0
    ModeInitialize = 1
    strip.setBrightness(255)
})
function Rotate_Pixels (Delay: number) {
    strip.rotate(1)
    strip.show()
    basic.pause(Delay)
}
function Mode_C () {
    if (ModeInitialize == 1) {
        // Change this to change what is shown on the led screen
        basic.showString("C")
        ModeInitialize = 0
    }
    // This sets the color of the LED's in this mode. Feel free to set a different color for your design
    strip.showColor(neopixel.colors(NeoPixelColors.Violet))
    // This sets the brightness of the LEDs. Currently set to the brightness picked up by the light sensor, It needs a value from 0 to 255
    strip.setBrightness(Inertia)
    strip.show()
}
function Mode_B () {
    if (ModeInitialize == 1) {
        // Change this to change what is shown on the led screen
        basic.showString("B")
        ModeInitialize = 0
        basic.pause(1000)
    }
    degrees = input.compassHeading()
    // This is the code for the compass
    // The Default shows the closest direction (N for North, E for East...) but that can be changed. Currently set to change the LEDs to rainbow when facing north. In every other case the LEDs turn Red. Feel free to change the color values
    if (degrees < 45) {
        basic.showString("N")
        strip.showRainbow(1, 360)
    } else if (degrees < 135) {
        basic.showString("E")
        strip.showColor(neopixel.colors(NeoPixelColors.Red))
    } else if (degrees < 225) {
        basic.showString("S")
        strip.showColor(neopixel.colors(NeoPixelColors.Red))
    } else if (degrees < 315) {
        basic.showString("W")
        strip.showColor(neopixel.colors(NeoPixelColors.Red))
    } else {
        basic.showString("N")
        strip.showRainbow(1, 360)
    }
    // To make degrees (which can be 0-360 degrees) compatible with brightness (which only takes 0-255) we use map to translate one to the other. 
    strip.setBrightness(Math.map(degrees, 0, 360, 0, 255))
    strip.show()
}
// Turn on Mode C
input.onButtonPressed(Button.AB, function () {
    Mode = 2
    ModeInitialize = 1
    strip.setBrightness(255)
})
// Turn on Mode B
input.onButtonPressed(Button.B, function () {
    Mode = 1
    ModeInitialize = 1
    strip.setBrightness(255)
})
input.onGesture(Gesture.Shake, function () {
    brightness = 255
    strip.showColor(neopixel.colors(NeoPixelColors.White))
})
function Mode_A () {
    if (ModeInitialize == 1) {
        // Change this to change what is shown on the led screen
        basic.showString("A")
        for (let LEDnumber = 0; LEDnumber <= 29; LEDnumber++) {
            if (LEDnumber % 2 == 0) {
                // Change this to set the Even Pixel Color
                strip.setPixelColor(LEDnumber, neopixel.colors(NeoPixelColors.Red))
            } else {
                // Change this to set the Odd Pixel Color
                strip.setPixelColor(LEDnumber, neopixel.colors(NeoPixelColors.Yellow))
            }
        }
        ModeInitialize = 0
        strip.show()
    }
    // This causes the lights to slow down after shaken
    if (Inertia > 0) {
        strip.rotate(1)
        strip.show()
        // As the Inertia value goes down, the length between cycles goes up.
        // Inertia Max is set in the On Start Function.
        basic.pause(Inertia_Max - Inertia)
        // In order to avoid a long period of very slow cycles, this value is the cutoff point to set the value to 0
        if (Inertia >= 40) {
            // This value causes inertia to get smaller every cycle. Default value is 0.95. Keep this below 1. The closer to 1, the slower the value shrinks. 
            Inertia = Inertia * 0.95
        } else {
            Inertia = 0
        }
    }
}
function SetBrightness (Bright: number) {
    // This sets the brightness of the LEDs. Currently set to the brightness picked up by the light sensor, It needs a value from 0 to 255
    strip.setBrightness(Bright)
    strip.show()
}
let Inertia = 0
let Mode = 0
let degrees = 0
let brightness = 0
let Inertia_Max = 0
let ModeInitialize = 0
let strip: neopixel.Strip = null
strip = neopixel.create(DigitalPin.P2, 30, NeoPixelMode.RGB)
ModeInitialize = 1
// This number sets how long it takes to stop the chase pattern in mode A
Inertia_Max = 255
MakeAPattern()
// Pressing button A, B, and A+B cycles through different modes.
// 
// Mode determines what the device does
// 
// ModeInitialize runs once when you change the _case mode to set up anything that's needed for that mode
// 
// Mode A: In this mode the leds are set to alternating colors that will cycle when the device is shaken. Over a few seconds, the motion will slow down before stopping.
// 
// Mode B: This mode acts like a compass. The LED screen will show which direction you're facing (W = West and so on). When you face north, the LED strand with show a rainbow pattern, otherwise the color is set to red
// 
// Mode C: This mode sets the LED strand to purple and the brightness is tied to the amount of light picked up by the board
// 
basic.forever(function () {
    if (Mode == 0) {
        Rotate_Pixels(500)
    } else if (Mode == 1) {
        Compass()
    } else if (Mode == 2) {
        MakeAPattern()
    }
    Fade_LEDs()
})
