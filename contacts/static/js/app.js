$(function() {

var App = {
    Views: {},
    Routers: {},
    Collections: {},
    Data: {},
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
    initialize: function() {
        
    }
});

App.Routers.Contacts = Backbone.Router.extend({
    routes: {
        '': 'index',
        //'contact/:id': 'show'
    },
    
    index: function() {
        App.Data.Contacts = new App.Collections.Contacts();
        App.Data.Contacts.fetch({
            success: function() {
                new App.Views.Contacts.Index({ collection: App.Data.Contacts });
                new App.Views.Contacts.Form({ model: new App.Models.Contact() });
            },
            error: function() {
                new Error({ message: "Error loading contacts." });
            }
        });
    }
});

App.Views.Contacts = {};

App.Views.Contacts.Index = Backbone.View.extend({
    el: 'ul',
    initialize: function() {
        this.render();
    },
    
    render: function() {
        this.el = $('<ul id="contact-list"/>');
        $('#app').html(this.el);
        var self = this;
        this.collection.each(function(item) {
            self.prependContact(item);
        });
    },
    prependContact: function(contact) {
        var el = new App.Views.Contacts.Single({
            model: contact
        }).render().el;
        $('#contact-list').prepend(el);
    },
    initialize: function() {
        this.render();
        this.collection.on('add', this.prependContact, this);
    },
});

App.Views.Contacts.Single = Backbone.View.extend({
    model: App.Models.Contact,
    template: _.template($('#tmpl-contact-list-item').html()),
    render: function() {
        this.el = $('<li class="span3"/>')[0];
        $(this.el).html(this.template({ contact: this.model }));
        return this;
    }
});

App.Views.Contacts.Form = Backbone.View.extend({
    template: _.template($('#tmpl-contact-form').html()),

    events: { 'submit':  'save' },

    render: function(){
        var html = this.template({ contact: this.model });
        $(this.el).html(html);

        this.inputs = {
            name: this.$el.find('[name=name]'),
            email: this.$el.find('[name=email]')
        };

        return this;
    },

    save: function(e) {
        e.preventDefault();
        var self = this;
        this.model.save({
            name: this.inputs.name.val(),
            email: this.inputs.email.val()
        }, {
            success: function(model, response) {
                App.Data.Contacts.add(model);
                self.inputs.name.val('');
                self.inputs.email.val('');
            },
            error: function(model, response) {
                new Error({message: 'Error saving contact.'});
            }
        });
    },

    initialize: function() {
        $('#app').prepend(this.render().el);
    }
});


App.init();

});

