from pyramid.view import view_config
from pyramid.httpexceptions import HTTPOk
import json
from bson.objectid import ObjectId

@view_config(route_name='contacts', request_method='GET',
            accept='application/json', renderer='json')
def list_contacts(request):
    contacts = request.db['contacts'].find()
    return contacts
    
@view_config(route_name='contacts', request_method='POST',
            accept='application/json', renderer='json')
def add_contacts(request):
    contact = json.loads(request.body)
    request.db['contacts'].insert(contact)
    response = HTTPOk()
    response.headers['Location'] = '/contacts/%s' % contact.id
    return response

@view_config(route_name='contact', request_method='GET',
            accept='application/json', renderer='json')
def get_contact(request):
    query = {'_id': ObjectId(request.matchdict['id'])}
    contact = request.db['contacts'].find_one(query)
    if contact is None:
        return HTTPNotFound()
    return contact

@view_config(route_name='contacts', request_method='PUT',
            accept='application/json', renderer='json')
def update_contact(request):
    query = {'_id': ObjectId(request.matchdict['id'])}
    contact = request.db['contacts'].find_one(query)
    if contact is None:
        return HTTPNotFound()
    update = json.loads(request.body)
    for key in update: contact[key] = update[key]
    request.db['contacts'].update(contact)
    return HTTPOk()
    
@view_config(route_name='contact', request_method='DELETE',
            accept='application/json', renderer='json')
def delete_contact(request):
    object_id = ObjectId(request.matchdict['id'])
    query = {'_id': object_id}
    contact = request.db['contacts'].find_one(query)
    if contact is None:
        return HTTPNotFound()
    request.db['contacts'].remove(object_id)
    return HTTPOk()
