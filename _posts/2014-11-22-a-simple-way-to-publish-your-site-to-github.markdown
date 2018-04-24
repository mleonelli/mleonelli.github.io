---
layout: post
title:  "A simple way to publish your site to GitHub"
date:   2014-11-22 16:03:49 
tags: tech jekyll github
slug: "jekyll_metas"
keywords: "Jekyll, Github pages"
---

Jekyll is a wonderful templating engine which works perfectly with GitHub. You can have your wonderful static website up and running in few minutes, hosted and built seamlessly by [Github](http://github.com).

There is indeed a limitation to this perfect world: GitHub will build Jekyll in --safe mode thus not allowing any Jekyll plugin.
 
I have been struggling to find a noob way to publish my GitHub page and version the source control at the same time. 

A quick & dirty solution is to create two local repositories pointing to the corresponding GitHub remotes: master (for the site) and source (for the source code). First let's setup the local folders.

{% highlight sh%}
mkdir master
mkdir source

cd master
git init
git remote add -t master origin <remote-url>

cd ../source
git init
git remote add -t source origin <remote-url>
{% endhighlight %}

With the folders created as before, you can then install Jekyll in source, make your editing. Then create a small shell script that will:

1. Build Jekyll
2. Copy the site to the master folder
3. Push it to GitHub 

{% highlight sh %}
#!/bin/sh
jekyll build
cd _site
cp -r * ../../master/
cd ../../master
git add --all
git commit -m "Updating blog"
git push -f origin master
cd ../source
{% endhighlight %}

