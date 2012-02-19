$(function(){
window.Contact = Backbone.Model.extend({
    defaults: { name: '', email: '' }
});

window.ContactList = Backbone.Collection.extend({
    model: Contact,

    comparator: function(contact) {
        return todo.get('name');
    }
});

window.ContactListView = Backbone.View.extend({
    tagName: 'li',

    template: _.template($('#contact-list-item').html()),

    model: Contact,

    render: function() {
        $(this.el).html(this.template({ user: this.model }));
        return this;
    },

    // @todo : events
});

window.AppView = Backbone.View.extend({
    $el: $('#contact-app'),

    initialize: function() {
        // @todo
    },
});

window.ContactFormView = Backbone.View.extend({
    $el: $('#contact-form'),

    initialize: function() {
    },
});

});
