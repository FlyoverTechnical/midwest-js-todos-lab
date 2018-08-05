# Midwest JS Todos

## Labs for Modern JS Development in the Java Enterprise





*todo-proxy/src/main/groovy/com/flyover/midwestjs/configuration/WebConfiguration.groovy*

```java
  @Bean
  WebMvcConfigurer forwardToIndex() {
      new WebMvcConfigurer() {
          @Override
          void addViewControllers(ViewControllerRegistry registry) {
              // Resolve requests to / and /app to index.html so that HTML5 routing works
              registry
                      .addRedirectViewController("/", "/app")

              registry
                      .addViewController("/app/**")
                      .setViewName(INDEX_HTML)
          }
      }
  }
```

*todo-proxy/src/main/resources/static/index.html*

```html
<!doctype>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/semantic-ui@2.3.3/dist/semantic.min.css">
    <title>MidwestJS Rules</title>
  </head>
  <body>
    <div class="ui container">
      <h3>MidwestJS Todos Lab</h3>
      <p>If you are seeing this, you win.</p>
    </div>
  </body>
</html>
```