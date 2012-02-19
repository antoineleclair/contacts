$(function(){
window.Contact = Backbone.Model.extend({
    defaults: { name: '', email: '' },
    url: '/contacts'
});

window.ContactList = Backbone.Collection.extend({
    model: Contact,

    comparator: function(contact) {
        return todo.get('name');
    }
});

window.ContactListViewItem = Backbone.View.extend({
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
        var contact_form = new ContactFormView({
            model: new Contact(),
            el : $('#contact-wrap')
        });

        contact_form.render();
    }
});

window.ContactFormView = Backbone.View.extend({
    template: _.template($('#tmpl-contact-form').html()),

    events: { 'submit':  'save' },

    render: function(){
        var html = this.template({ user: this.model });
        $(this.el).html(html);

        this.inputs = {
            name: this.$el.find('[name=name]'),
            email: this.$el.find('[name=email]')
        };

        return this;
    },

    save: function(e) {
        e.preventDefault();
        this.model.save({
            name: this.inputs.name.val(),
            email: this.inputs.email.val()
        });
    },


    initialize: function() {
    }
});
window.App = new AppView();
});
