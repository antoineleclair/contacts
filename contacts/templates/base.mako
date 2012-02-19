<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Contacts</title>
    <link href="/static/css/bootstrap.css" rel="stylesheet"/>
    <link href="/static/css/bootstrap-responsive.css" rel="stylesheet"/>
    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
    <script type="text/javascript" src="/static/js/bootstrap.js"></script>
    <script type="text/javascript" src="/static/js/underscore-min.js"></script>
    <script type="text/javascript" src="/static/js/backbone-min.js"></script>
    <script type="text/javascript" src="/static/js/app.js"></script>
</head>
<body>
    <div class="navbar">
        <div class="navbar-inner">
            <div class="container" id="contact-app">
                <a class="brand" href="/">Contacts</a>
                <ul class="nav pull-right">
                    <li><a href="#">Blah</a></li>
                </ul>
            </div>
        </div>
    </div>

    <div class="container">
        ${self.body()}
    </div>

</body>
</html>
