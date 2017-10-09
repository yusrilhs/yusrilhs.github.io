<!DOCTYPE html>
<html lang="en">
    <head>
        {% include header.html %}
    </head>
    <body>
        {% include navigation-blog.html %}
        
        <div class="container container-blog">
            <div class="text--center">
                <h2>{{ page.title }}</h2>
                <span class="fa fa-calendar"></span> {{ page.date | date: '%B %d, %Y' }}
            </div>
            <div class="section">
                {{ content }}
            </div>
        </div>

        {% include footer.html %}
    </body>
</html>

