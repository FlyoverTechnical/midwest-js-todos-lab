### Development and Auto reloading

1. Set watch npm task in package.json
  - `--watch` flag (defaults to src directory)

*todo-js/package.json*

```javascript
"dev": "webpack --mode none --watch",
```

2. Setup Webpack to build a development bundle in the `static` folder.
  - **development** mode is for `webpack-dev-server` and isolated development
  - **production** mode is for packaging application with Spring application
  - **none** mode is for building the JS in development, but deploying via Spring Boot

*todo-js/webpack.config.js*

```javascript
const watchMode = argv.mode === "none";
const devMode = argv.mode === "development" || watchMode;
const bootStaticDirectory = path.resolve(
  __dirname,
  "../todo-proxy/src/main/resources/static"
);

let outputPath = path.resolve(__dirname, "dist");
if (watchMode || !devMode) {
  outputPath = bootStaticDirectory;
}
```

2. Spring Boot Devtools comes with Livereload.
  - [Spring Boot Devtools](https://docs.spring.io/spring-boot/docs/current/reference/html/using-boot-devtools.html)

3. Get Livereload plugin for Chrome
  - [Livereload](http://livereload.com/)
  - [Livereload Plugin](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei?hl=en)

4. Create the `buildDev` Gradle task so that `npm run build` doesn't run twice.

*todo-proxy/build.gradle*

```java
task buildDev(type: org.gradle.api.tasks.GradleBuild) {
    tasks = ["build"]
    doFirst() {
        System.setProperty('spring.profiles.active', 'dev')
    }
}

if (System.getProperty('spring.profiles.active') != 'dev') {
    bootJar.dependsOn ":todo-js:npm_run_build"
    bootWar.dependsOn ":todo-js:npm_run_build"
}
```

4. Run (4) console/terminals:

```bash
./gradlew buildDev —continous
```

```bash
./gradlew bootRun
```

```bash
npm run dev
```

```bash
npm run data
```

5. Change index.html and watch the reload..now change other files. Experiment away!