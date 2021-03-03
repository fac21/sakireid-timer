# Pomodoro Timer

The challenge for this week was to build a Pomodoro Timer from scratch. Our timers should have these features:
- A “work” timer that counts down to zero (usually 25 minutes)
- A second “break” timer that counts down to zero (usually 5 minutes)
- Buttons to start a session, pause the timer, or cancel the session and restart
Stretch goals
- Customisable lengths of time for work/break
- Play an alarm sound to make it obvious the time is up

## Getting started

The first thing I did was to create the CSS for the webpage. I drew inspiration from tomatotimers and found (some images)[https://illustcute.com/?dl=957] to get started. I incorporated into my webpage my learnings on CSS during the first week (flexbox buttons & using layout primitives).

During this initial stage, I decided on which buttons to use on my tomato timer webpage. (The source of my headaches later!)

## The Timer

Having used setTimeout last week, I used the same methods to implement a timer. I began just by logging seconds to the console and once I had that I used a number of if statements to change seconds to minutes. 

Once the timer was working, I targeted the time-text on the page to display the timer. 

## Start/Stop and Restart

The first buttons I got working were the start/stop and restart buttons. I used a boolean to see if the timer was on/off and three functions to start, stop and restart the timer. 

As I used one button for both start and stop functionality, I used a boolean to determine which function to call. If the timer was on, I would call the stop function, which would clear the Timeout and change the text from start to stop. Likewise if the timer was off, I would call the start function, which would start the timer and change the text from stop to start.  

For the restart function, I intially hardcoded the minutes to 25 so that it would automatically restart to 25 minutes, but I would later need to change this as I put in more functionality. 

## Pomodoro, Short Break, Long Break

Each button would call the function `setTime()`. `setTime()` takes one argument, the number of minutes to set the timer to, ie Pomodoro would call `setTime(25)`, short break would call `setTime(5)`. 

I decided to change the image displayed on the webpage according to what type of timer (ie pomodoro, short break or long break). 

## Customise

### Part one 
The customiser was the the part that I found most challenging part in writing this weeks code. The customise button would create a popup overlay with a form that requested the user to input the number of pomodoro minutes to set the timer to. 

![screenshot-overlay] (images/ss-overlay.png)

Although I knew that it would be easier to use js's prompt to get user info, I wanted to style the popup. 

#### The Overlay

I used [w3schools tutorial](https://www.w3schools.com/howto/howto_css_overlay.asp) on how to create an overlay and used HTML DOM `createElement()` & `appendChild()` methods. 

#### A Dynamic Form

I created the form using the same DOM methods as in overlay as well as `setAttribute()`, which allowed me to add the specificed attribute & specified value to the element. 

**key learnings**
If the form is submitted, then the page is automatically refreshed. As I wanted to use the input on the form, I needed to find a way that I could submit but not refresh the page. 

After some hunting around on the internet, I realised that the way to stop the page reloading was to make sure when the form was submitted it would return false:

`insertButton.setAttribute('onclick', "return false")`

However as I needed to set the timer to the minutes input by the user, I would need to call a function that set the timer to the minutes, set the overlay display to none (so to hide) and then return false. 

`insertButton.setAttribute('onclick', "return clicked()")`

### Part Two

Once I could customise the number of minutes, I needed to change minutes that were hardcoded. I created a number of booleans to check whether minutes were customised, whether the user was on a break, whether the user had actually stopped the timer or just simply pressed a different button. There were many more considerations than I would have intiailly thought!  

## What is a pomodoro timer?

I reused the same functionality I used in the customise section to create an overlay, I think created text and styled seperately with CSS. 

## New Learnings 

- When using letter spacing and text align together, you need to use text indent by the same amount as letter spacing!
- In order to add classes to an element with classes use: `document.getElementById("MyElement").className += " MyClass";`
- If the form returns false when submitting, the page won't reload! 
- ***Functions for everything*** I read in Robert C. Martin's Clean Code that a function should only ever do one thing. So with that in mind I created functions for every seperate small task. This helped me with debugging and changing. 
- Booleans are great, but you have to follow them everywhere! 

## Bugs that needs fixing

Overlay with Customise and Pomodoro Timer are stacking on top of each other! I need to add a if statement/boolean to check if already pressed then no need.

## Questions

- Do I have rights to use images from the internet on my personal pages?
- What process should I be using when creating JS? Ie should I think about the functionalities and all the diff possiblities before even starting? 