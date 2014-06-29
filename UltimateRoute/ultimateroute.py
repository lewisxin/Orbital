import urllib
import webapp2
import jinja2
import os

from google.appengine.api import users

jinja_environment = jinja2.Environment(
    loader=jinja2.FileSystemLoader(os.path.dirname(__file__) + "/templates"))

continue_url = "/ultimateroute"
openid_url = None

class MainPage(webapp2.RequestHandler):
    """ Handler for the front page."""

    def get(self):
        template = jinja_environment.get_template('front.html')
        self.response.out.write(template.render())


class MainPageUser(webapp2.RequestHandler):
    """ Front page for those logged in """
    def get(self):
        user = users.get_current_user()
        if user:  # signed in already
            template_values = {
                'username': users.get_current_user().email(),
                'logout': users.create_logout_url(self.request.host_url),
            }
            template = jinja_environment.get_template('frontuser.html')
            self.response.out.write(template.render(template_values))
        else:
            self.redirect(self.request.host_url)

class NUSLogin(webapp2.RequestHandler):
    def get(self):
        openid_url = "https://openid.nus.edu.sg"
        self.redirect(users.create_login_url(continue_url, None, federated_identity=openid_url))

class GoogleLogin(webapp2.RequestHandler):
    def get(self):
        openid_url = "https://www.google.com/accounts/o8/id"
        self.redirect(users.create_login_url(continue_url, None, federated_identity=openid_url))

class HandleOpenId(webapp2.RequestHandler):
    def get(self):
        self.redirect(users.create_login_url(continue_url, None, federated_identity=openid_url))


app = webapp2.WSGIApplication([('/', MainPage),
                               ('/ultimateroute', MainPageUser),
                               ('/nuslogin', NUSLogin),
                               ('/googlelogin', GoogleLogin),
                               ('/_ah/login_required', HandleOpenId)], 
                               debug=True)
