from pyramid.view import view_config

@view_config(route_name='contacts', request_method='GET',
            accept='application/json', renderer='json')
def list_contacts(request):
    pass
    
@view_config(route_name='contacts', request_method='POST',
            accept='application/json', renderer='json')
def add_contacts(request):
    pass

@view_config(route_name='contact', request_method='GET',
            accept='application/json', renderer='json')
def get_contact(request):
    pass

@view_config(route_name='contacts', request_method='PUT',
            accept='application/json', renderer='json')
def update_contact(request):
    pass

@view_config(route_name='contact', request_method='DELETE',
            accept='application/json', renderer='json')
def delete_contact(request):
    pass

