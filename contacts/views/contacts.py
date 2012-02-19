from pyramid.view import view_config
from pyramid.response import Response
from pyramid.url import route_url
from bson.objectid import ObjectId


@view_config(route_name='contacts', request_method='GET',
            accept='application/json', renderer='json')
def list_contacts(request):
    contacts = request.db['contacts'].find()
    for contact in contacts:
        contact['id'] = str(contact['_id'])
        del contact['_id']
    return contacts
    
@view_config(route_name='contacts', request_method='POST',
            accept='application/json', renderer='json')
def add_contacts(request):
    contact = request.json_body
    request.db['contacts'].insert(contact)
    print contact
    response = status_code_response(200)
    response.headers['Location'] = route_url('contact',
                                    id=contact['_id'], request=request)
    return response

@view_config(route_name='contact', request_method='GET',
            accept='application/json', renderer='json')
def get_contact(request):
    query = {'_id': ObjectId(request.matchdict['id'])}
    contact = request.db['contacts'].find_one(query)
    if contact is None:
        return status_code_response(404)
    contact['id'] = str(contact['_id'])
    del contact['_id']
    return contact

@view_config(route_name='contacts', request_method='PUT',
            accept='application/json', renderer='json')
def update_contact(request):
    query = {'_id': ObjectId(request.matchdict['id'])}
    contact = request.db['contacts'].find_one(query)
    if contact is None:
        return status_code_response(404)
    update = request.json_body
    for key in update: contact[key] = update[key]
    request.db['contacts'].update(contact)
    return status_code_response(200)
    
@view_config(route_name='contact', request_method='DELETE',
            accept='application/json', renderer='json')
def delete_contact(request):
    object_id = ObjectId(request.matchdict['id'])
    contact = request.db['contacts'].find_one(object_id)
    if contact is None:
        return status_code_response(404)
    request.db['contacts'].remove(object_id)
    return status_code_response(200)
    
def status_code_response(status_int):
    response = Response()
    response.status_int = status_int
    response.content_type = 'application/json; charset=UTF-8'
    response.body = ''
    return response

