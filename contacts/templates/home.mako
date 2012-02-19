<%inherit file="/base.mako"/>

<div class="page-header">
    <h1>Contacts</h1>
</div>

<div id="contact-wrap"></div>

<%text>
    <script type="text/template" id="tmpl-contact-list-item">
        <div class="name"><%= user.get('name') %></div>
        <div class="email"><%= user.get('email') %></div>
        <span class="destroy"></span>
    </script>

    <script type="text/template" id="tmpl-contact-form">
        <form action="" method="post" class="form-horizontal">
            <div class="control-group">
                <label class="control-label" for="contact-name">Name</label>
                <div class="controls">
                    <input type="text" name="name" value="<%= user.get('name') %>" id="contact_name">
                </div>
            </div>
            <div class="control-group">
                <label class="control-label" for="contact-email">Email</label>
                <div class="controls">
                    <input type="email" name="email" value="<%= user.get('email') %>">
                </div>
            </div>
            <div class="form-actions">
                <input type="submit" value="Save" class="btn btn-primary">            
                <a href="#" class="btn">Cancel</a>
            </div>
        </form>
    </script>
</%text>
