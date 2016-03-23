---
layout: post
title:  "Generate PDFs in Python using reportlab's library"
date:   2016-03-24 01:40:18 +0200
categories: blog
---
### What is the ReportLab library?
This library lets you create documents in PDF format using the **Python** programming language. You can also create charts or data graphics in various formats.

To make this work you'll need **Python 2.7**, **3.3** or higher. For older Python versions use the latest **ReportLab 2.x** package.

To get started clone the latest library from [BitBucket][repo].

```
hg clone https://bitbucket.org/rptlab/reportlab
```

Then move **reportlab** in an empty directory.

### Now lets generate a sample PDF file.

Create a **.py** file named **pdf.py** or whatever else you like in the same directory as **reportlab** and open it using your favorite text editor.

Copy the code below:

{% highlight python %}
from reportlab.pdfgen import canvas

def pdf():
  x = 50
  y = 800

  c = canvas.Canvas("file.pdf")
  c.drawString(x*5,y,"Hello World!")
  c.line(x,y-10,x*11,y-10)
  c.save()

pdf()
{% endhighlight %}

open your terminal and type:

```
$ python pdf.py
```

Then look for a file named **file.pdf** in te current working directory.

### Breaking down

`from reportlab.pdfgen import canvas`

**pdfgen** is a low level interface for PDF generation and its object **canvas** provides the painting operations. Think about **canvas** as a white graph paper similar to those we used in school/university.

`x = 50, y = 800`

To identify points in **canvas** we use Cartesian coordinates (X,Y). By default they have the value of (0,0) which point at the lower left corner of the page. If we increase the **X** value the origin point moves to the right whereas if we increase **Y** it moves up.

`c = canvas.Canvas("file.pdf")`

This creates a **canvas** object which generates a PDF file named **file.pdf**.

`c.drawString(x*5,y,"Hello World!")`

The **drawString** method draws single lines of text on the canvas.

`c.line(x,y-10,x*11,y-10)`

The **line** method draws straight lines on the canvas.

`c.save()`

The **save** method generates the PDF file. We call it after we finish constructing the document.

### Where to now?

The above example shows the basic functionality of the library. For advance functions like dynamic PDF generation on the web or generation of complex documents with charts, graphs, tables and text read the [user guide][user-guide].

[repo]: https://bitbucket.org/rptlab/reportlab
[user-guide]: http://www.reportlab.com/docs/reportlab-userguide.pdf
