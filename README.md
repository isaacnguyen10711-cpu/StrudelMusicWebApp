# Getting Started with Strudel Music 

## How to start the app:

### Commands
1. Go to the terminal and run "npm i" to install all npm dependencies
2. After successfully installed, run "npm start" in the terminal
3. This will open a web page and render the app

## Controls that I have implemented:

### Play and Stop Buttons
The "play" and "stop" button are combined into 1 button and they change to one another depends on whether the song is being 
played or not.

### Preprocess Buttons
This "proc and play" and "preprocess" buttons are pretty much kept the same logic and they process the text command users 
input in the text area.

### Audio Effects
The Strudel Music web app has 2 default effects which are reverb and delay. When users click on either of them, the effect will be
applied to the current song right away. Users can also change the level of reverb and delay with buttons next to the 2 buttons. The
limit is 0 and 2 for both effects and each increment or decrement is 0.1 for each click.

### CPM Control
This controls the speed of the song. CPM stand for cycle per minute and the higher the CPM, the faster the song goes and vice versa. 
Users can either input the value they want in the text box or they can use the buttons next to it to adjust the CPM. After inputting 
the value in the text box, users will need to click the 'set' button next to it to apply to the song live. Using the buttons will apply
right away without clicking the "set" button.

### Intrument Toggle
The instrument toggle was the most complex and time consuming feature I made. This toggle controls the instrument existing in the text
and provide the toggles for each of the instrument. Users can turn on and off each instrument and they can use this to combine different
instruments playing at the same time without the need to delete or rewrite the text command everytime something changes.

### Volume Control
A volume slider that controls the volume of every instrument. A simple and basic feature that has the max volume of 20 and a min of 0. 
A reset button which reset the volume to the default level, which is 10.

### Text to Process and Text Editor
This is where users enter their music coding. I added a hide display toggle to make the whole layout looks clean and users can hide or
open whenever they want

### Load and Save settings
This function uses the local storage in the browser with the name "StrudelMusicAppSettings" and it will write all the current states
to a json format file in the browser's local storage which can be found in the application section when users click on inspect the 
page.

## Demonstration video: .
https://drive.google.com/drive/folders/1E5McwYxKNEESZnYIrefIzOmEiVGs63RM?usp=sharing

## Bonus points:
### Instrument detector
As I have mentioned, the intrument toggle was the most difficult feature that I implemented. This feature is able to detects all the 
instruments in the text as long as the user enter the word "instrumental_" in front of every instrument they add to the text area. 


