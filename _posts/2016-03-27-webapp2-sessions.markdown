---
layout: post
title:  "Webapp2 Sessions"
date:   2016-03-27 00:13:18 +0200
categories: blog
font: PT+Serif
stylesheet: content
---
Sessions is a webapp2 module that can be used to store values that can be
later retrieved.

To use session store you need to define **secret_key** first and initialize your
application with the **secret_key**.

{% highlight python %}
config = {}
config['webapp2_extras.sessions'] = {
  'secret_key': 'my-super-secret-key',
}
{% endhighlight %}

Then at your **WSGIApplication** instance add the **config** parameter:

{% highlight python %}
app = webapp2.WSGIApplication([
  ('/', MainPage),
], config=config)
{% endhighlight %}

Then to use the session module you need to define a base handler that starts
the session store and save all session at the end of the request.

{% highlight python %}
from webapp2_extras import sessions

class BaseHandler(webapp2.RequestHandler):
  def dispatch(self):
    # Get a session store for this request.
    self.session_store = sessions.get_store(request=self.request)

    try:
      # Dispatch the request.
      webapp2.RequestHandler.dispatch(self)
    finally:
      # Save all sessions.
      self.session_store.save_sessions(self.response)

  @webapp2.cached_property
  def session(self):
    # Returns a session using the default cookie key.
    return self.session_store.get_session()
{% endhighlight %}

Then to store a value into session store, use a variable as a dictionary inside
a handler:

{% highlight python %}
self.session['foo'] = 'bar'
{% endhighlight %}

and to retrieve the value of **foo** from session store use:

{% highlight python %}
foo = self.session.get('foo')
{% endhighlight %}

Putting it all together:

{% highlight python %}
import webapp2

from webapp2_extras import sessions

config = {}
config['webapp2_extras.sessions'] = {
  'secret_key': 'my-super-secret-key',
}

class BaseHandler(webapp2.RequestHandler):
  def dispatch(self):
    # Get a session store for this request.
    self.session_store = sessions.get_store(request=self.request)

    try:
      # Dispatch the request.
      webapp2.RequestHandler.dispatch(self)
    finally:
      # Save all sessions.
      self.session_store.save_sessions(self.response)

  @webapp2.cached_property
  def session(self):
    # Returns a session using the default cookie key.
    return self.session_store.get_session()

# Request Handler mapped to the root URL (/)
# When webapp2 receives a GET request to the URL (/)
# it instantiates the MainPage class and calls the
# instance's get method
class MainPage(BaseHandler):
  def get(self):
    # Renders a jinja2 template (index.html)
    # with an HTML form
    template = JINJA_ENVIRONMENT.get_template('index.html')
    self.response.write(template.render())

# When the user clicks submit in the HTML form
# the class Results is called and stores the
# user's input into session store
class Results(BaseHandler):
  def post(self):
    # Get the user's input from the HTML form
    usersinput = self.request.get('input')

    # Store the value of usersinput into session store
    self.session['value'] = usersinput

# When the user visits the URL (/output)
# he can access the value that is stored
# in session store
class Output(BaseHandler):
  def get(self):
    # Retrieve the value of usersinput from session store
    usersinput = self.session.get('value')

    template_values = {
      'value': usersinput
    }

    # Render a jinja2 template with the usersinput value
    template = JINJA_ENVIRONMENT.get_template('templates/index.html')
    self.response.write(template.render(template_values))

app = webapp2.WSGIApplication([
  ('/', MainPage),
  ('/results', Results),
  ('output', Output),
], config=config)
{% endhighlight %}

You can read more about sessions [here][sessions].

[sessions]: https://webapp-improved.appspot.com/api/webapp2_extras/sessions.html
