---
layout: post
title:  "Use SSL on GitHub Pages"
date:   2016-04-26 13:30:18 +0200
categories: blog
---
By default [GitHub Pages](https://pages.github.com/) are served over HTTPS but not if you want to use your own domain name. If you are using GitHub Pages to host your website and especially if your website generates sensitive information such as passwords then you need to take some steps to protect it.

# Cloudflare

1. First you need to sign up for [Cloudflare](https://www.cloudflare.com/) which is a service that acts as a proxy between your visitors and your hosting provider.
2. Once you signed up add your domain name.
3. Cloudflare will generate some custom records that match your domain registrar's records.
4. Go to your domain registrar's website and change the domain name servers to those that Cloudflare provided.
5. Go to **Cloudflare Settings** and switch from **SSL** to **Flexible SSL**.

That's all! Just wait a few hours for the changes to take effect.

Then you'll be able to visit your website using `https`.

# Extra Steps

A final step you might want to take is to optimize your website for search engines.
Google is using **https** as a ranking signal in its search ranking algorithms.

Add a `canonical` link in your website's `head` that points to the `https` version of your website.
{% highlight html %}
<link rel="canonical" href="https://yourwebsite.com" />
{% endhighlight %}

## Jekyll
Open `_config.yml` and add the following:

{% highlight html %}
url: "https://yourwebsite.com" # the base hostname & protocol for your site
{% endhighlight %}
