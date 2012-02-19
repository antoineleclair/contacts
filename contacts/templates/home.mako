<%inherit file="/base.mako"/>

<div class="page-header">
    <h1>Contacts</h1>
</div>

<p>Blah blah blah</p>

<%text>
    <script type="text/template" id="contact-short">
        <div class="name"><%= user.get('name') %></div>
        <div class="email"><%= user.get('email') %></div>
        <span class="destroy"></span>
    </script>

    <script type="text/template" id="contact-form">
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
