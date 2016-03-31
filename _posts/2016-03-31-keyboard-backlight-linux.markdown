---
layout: post
title:  "Enable Keyboard Backlight on Linux"
date:   2016-03-30 16:12:18 +0200
categories: blog
---
A while back I purchased a keyboard with a great red backlight that you can turn on/off by pressing the Scroll Lock button. In Windows it works right out of the box but not with Linux (I'm using Ubuntu).

To turn the keyboard's backlight on/off open your terminal and type:
`$ xset led on`
to turn on the backlight and
`$ xset led off`
to turn it off.

Although the lights are now on you need to type the above commands each time you
want to turn on/off the backlight which is not convenient. Hence I decided to
write a small **BASH** script and point it to the Scroll Lock button (which is the
default backlight key on my keyboard.

Start by creating an empty file using an editor of your choice and paste the following:
{% highlight bash %}
#!/bin/bash

FLAGS=$(xset -q | awk 'NR==2' | awk '{ print $10 }')

if [ "$FLAGS" = ffffe7fc ] || [ "$FLAGS" = ffffe7fd ] || [ "$FLAGS" = ffffe7fe ] || [ "$FLAGS" = ffffe7ff ]; then
  xset led off
else
  xset led on
fi
{% endhighlight %}

Now save the file with the **.sh** extension (I named it keyboard-led.sh).
Move it in your root directory (or wherever you like) and make the script
executable by typing the following using your terminal:
`$ chmod u+x keyboard-led.sh`

Test the script by running:
`$ ./keyboard-led.sh`

Now to make things simpler why don't we assign the script to a button in the
keyboard? Open the keyboard settings, go to Custom Shortcuts and create
a new shortcut. Give it a name and in the command section type **/keyboard-led.sh**.
Finally click on the right of the shortcut and click the Scroll Lock button.
Test if it works by pressing the Scroll Lock Button.
