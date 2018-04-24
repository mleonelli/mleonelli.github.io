---
layout: post
title:  "Remove the last character in a SQL string"
date:   2015-06-15 16:03:49
tags: tech sql
slug: "jekyll_metas"
keywords: "SQL server, REVERSE, remove last character"
---

Google is your friend and Internet the place where you can find pretty much an answer for every question you ever had. Too bad it's not always the good one (or not the one you were looking for...). 

On many sites they propose different techniques to remove characters from the end of a string by mean of SUBSTRINGs, LEFTs AND DATALENGTHs
{% highlight sql%}
DECLARE @String as VARCHAR(50)
SET @String='1,2,3,4,5,'

SELECT LEFT(@String,DATALENGTH(@String)-1)

SELECT STUFF(@String,DATALENGTH(@String), 1, '')

SELECT STUFF(@String,DATALENGTH(@String), 1, '')
{% endhighlight %}


As you can clearly see, all of them require the string to be used twice, whici is totally legit but pretty annoying if you want to do it in your select command. 

Another approach that can be used "inline" makes use of the REVERSE and STUFF commands. Easy!

{% highlight sql%}
DECLARE @String as VARCHAR(50)
SET @String='1,2,3,4,5,'
select reverse(stuff(reverse(@String), 1, 1, ''))
{% endhighlight %}

