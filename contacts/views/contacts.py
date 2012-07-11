from pyramid.view import view_config
from pyramid.response import Response
from pyramid.url import route_url
from bson.objectid import ObjectId

import logging
logger = logging.getLogger(__name__)

@view_config(route_name='contacts', request_method='GET',
            accept='application/json', renderer='json')
def list_contacts(request):
    logger.debug('Request for contact list received.')
    contacts = request.db['contacts'].find()
    return [{
            'id': str(contact['_id']),
            'name': contact['name'],
            'email': contact['email'],   
        } for contact in contacts]
    
@view_config(route_name='contacts', request_method='POST',
            accept='application/json', renderer='json')
def add_contacts(request):
    logger.debug('Request to add contact received.')
    contact = request.json_body
    request.db['contacts'].insert(contact)
    contact['id'] = str(contact['_id'])
    del contact['_id']
    return contact

@view_config(route_name='contact', request_method='GET',
            accept='application/json', renderer='json')
def get_contact(request):
    logger.debug('Request to get contact %d received.' \
        % request.matchdict['id'])
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
    logger.debug('Request to update contact %d received.' \
        % request.matchdict['id'])
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
    logger.debug('Request to get delete %d received.' \
        % request.matchdict['id'])
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

