---
layout: post
title:  "Decode and Encode Unicode data in SQL Server"
date:   2015-05-29 16:03:49
tags: tech sql
slug: "jekyll_metas"
keywords: "SQL server, unicode, decode unicode, encode unicode"
---

While working on a internet and intranet website with detailed description of cities around the world, I faced difficulties in the encoding and decoding of Unicode data.

SQL Server can store [Unicode](http://en.wikipedia.org/wiki/Unicode) data with the nvarchar data type, but encoding and decoding a string into real Unicode is a bit less straightforward than it may seem.

A [Unicode character](http://en.wikipedia.org/wiki/List_of_Unicode_characters) like ķ, a.k.a latin small K with cedilla, can be represented as &#311; in other words a prefix (&#), a 3 to 5 digit code and a suffix (;).  
There are 65,535 Unicode character in total.

Below two utility queries to encode and decode Unicode in SQL Server.

{% highlight sql%}

CREATE FUNCTION DecodeUnicode(
    @data nvarchar(MAX), 
    @prefix varchar(100)  = '&#',
    @suffix varchar(100) = ';'
)
RETURNS nvarchar(MAX)
AS
BEGIN
  DECLARE @start int
  DECLARE @end int

  WHILE CHARINDEX(@prefix, @data) > 0
  BEGIN
      SET @start = CHARINDEX(@prefix, @data)
      SET @end = CHARINDEX(@suffix, @data, @start)

      SET @data = REPLACE(
           @data, 
           SUBSTRING(@data, @start, @end -@start + LEN(@suffix)),
           NCHAR(SUBSTRING(@data, @start+ LEN(@prefix),@end -@start - LEN(@prefix)))
      )
  END
  RETURN @data
END

CREATE FUNCTION EncodeUnicode(
    @data nvarchar(max), 
    @prefix varchar(10) = '&#', 
    @suffix varchar(10) = ';'
)
RETURNS nvarchar(max)
AS
BEGIN
  
  DECLARE @i Int
  DECLARE @output nvarchar(max)

  SET @i = 1
  SET @output = ''

  WHILE @i <= LEN(@data)	
    BEGIN
      If Unicode(SUBSTRING(@data, @i, 1)) > 255
        SET @output = @output + @prefix + CONVERT(varchar(5),Unicode(SUBSTRING(@data, @i, 1))) + @suffix
      Else
        SET @output = @output + SUBSTRING(@data, @i, 1)

      SET @i = @i + 1
    END

  RETURN @output

END
{% endhighlight %}

