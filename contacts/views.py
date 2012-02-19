from pyramid.view import view_config

@view_config(route_name='home', renderer='/home.mako')
def my_view(request):
    return {}
