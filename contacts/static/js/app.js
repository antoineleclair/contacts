$(function() {

var App = {
    Views: {},
    Routers: {},
    Collections: {},
    Models: {},
    init: function() {
        new App.Routers.Contacts();
        Backbone.history.start({pushState: true});
    }
};

App.Models.Contact = Backbone.Model.extend({
    url: function() {
        if (this.isNew()) return '/contacts';
        return '/contacts/' + this.get('id');
    },
    
    defaults: {
        name: '',
        email: ''
    }
});

App.Collections.Contacts = Backbone.Collection.extend({
    url: '/contacts',
    model: App.Models.Contact,
});

App.Routers.Contacts = Backbone.Router.extend({
    routes: {
        '': 'index',
        //'contact/:id': 'show'
    },
    
    index: function() {
        var contacts = new App.Collections.Contacts();
        contacts.fetch({
            success: function() {
                new App.Views.Contacts.Index({ collection: contacts });
            },
            error: function() {
                new Error({ message: "Error loading contacts." });
            }
        });
    }
});

App.Views.Contacts = {};

App.Views.Contacts.Index = Backbone.View.extend({
    initialize: function() {
        this.render();
    },
    
    render: function() {
        var out;
        if (this.collection.models.length > 0) {
            out = '<h3>Contacts</h3>';
            out += '<ul>';
            this.collection.each(function(item) {
                var el = new App.Views.Contacts.Single({model: item})
                            .render().el;
                out += $(el).html();
            });
            out += '</ul>';
        } else {
            out = '<h3>No contact yet</h3>'
        }
        $(this.el).html(out);
        $('#app').html(this.el);
    }
});

App.Views.Contacts.Single = Backbone.View.extend({
    model: App.Models.Contact,
    template: _.template($('#tmpl-contact-list-item').html()),
    render: function() {
        $(this.el).html(this.template({ contact: this.model }));
        return this;
    }
});

App.init();

});

