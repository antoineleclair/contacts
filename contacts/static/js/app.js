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

    template: _.template($('#tmpl-contact-list-item').html()),

    model: Contact,

    render: function() {
        $(this.el).html(this.template({ user: this.model }));
        return this;
    },

    // @todo : events
});

window.AppView = Backbone.View.extend({
    $el: $('#tmpl-contact-app'),

    initialize: function() {
        //debugger
        var contact_form = new ContactFormView({
            model: new Contact(),
            el : $('#contact-wrap')
        });
        contact_form.render();
    }
});

window.ContactFormView = Backbone.View.extend({
    template: _.template($('#tmpl-contact-form').html()),
    render: function(){
        var html = this.template({ user: this.model });
        $(this.el).html(html);
        return this;
    },

    initialize: function() {
       
    }
});
window.App = new AppView();
});
