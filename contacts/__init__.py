from pyramid.config import Configurator
from pyramid.events import subscriber
from pyramid.events import NewRequest

import pymongo

def main(global_config, **settings):
    """ This function returns a Pyramid WSGI application.
    """
    config = Configurator(settings=settings)
    
    conn = pymongo.Connection(settings['mongo.uri'])
    config.registry.settings['mongo_connection'] = conn
    config.add_subscriber(add_mongo_db, NewRequest)
    
    config.add_static_view('static', 'static', cache_max_age=3600)
    add_routes(config)
    config.scan()
    return config.make_wsgi_app()
    
def add_mongo_db(event):
    settings = event.request.registry.settings
    db = settings['mongo_connection'][settings['mongo.db']]
    event.request.db = db
    
def add_routes(config):
    config.add_route('home', '/')
    
    # API
    config.add_route('contacts', '/contacts')
    config.add_route('contact', '/contact/{id}')    

