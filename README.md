# README

This is a script that reaches [**diablo2.io DClone tracker**](https://diablo2.io/dclonetracker.php) to provide information regarding DCone progressing.
This will sound a beep if there's any progression on the DClone event.

**NOTE 1**: For more information about DClone, please read [**Maxroll guide**](https://d2.maxroll.gg/meta/diablo-clone)

**NOTE 2**: diablo2.io racker community maintained.

## Install

* Install [**node.js**](https://nodejs.org/en/)   .
* Download the project at [**GitHub**](https://github.com/luizfilipe/d2clone-tracker/archive/refs/heads/main.zip) repository.
* Open command line prompt.
* Go to the project folder.
* Run `npm install`
* Run `node index.js` 

## Usage

Currently, the code only consider Ladder and Softcore, I'm planning to pass some config inputs on the future.

To track another servers for your needs, just:
* Change `SELECTED_LEAGUE` to 2 for Non-Ladder
* Change `SELECTED_MODE` to 1 for Hardcore

On the `index.js` code

**Note**: There's a minute delay to fetching updated data from the tracker, you could extend this time according to your needs, make sure to set `UPDATE_TIMESTAMP` with milliseconds.
