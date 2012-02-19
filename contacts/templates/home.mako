<%inherit file="/base.mako"/>

<div class="page-header">
    <h1>Contacts</h1>
</div>

<p>Blah blah blah</p>

<div id="contact-wrap"></div>

<%text>
    <script type="text/template" id="tmpl-contact-list-item">
        <div class="name"><%= user.get('name') %></div>
        <div class="email"><%= user.get('email') %></div>
        <span class="destroy"></span>
    </script>

    <script type="text/template" id="tmpl-contact-form">
        <label class="name">
            Name
            <input type="text" name="name" value="<%= user.get('name') %>">
        </label>
        <label>
            Email
            <input type="email" name="email" value="<%= user.get('email') %>">
        </label>
        <a href="#">Cancel</a>
        <input type="submit" value="Save">
    </script>
</%text>
