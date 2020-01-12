# spring-boot-angular-security-example
Security Demo with Spring boot and Angular


## Run Application
```bash
# Angular
$ cd angular 
$ yarn install
$ yarn run start


# spring boot
$ gradle bootRun
$ ./gradlew tasks --stacktrace
```


## CLI
```bash
# spring cli
$ sdk install springboot
$ spring --version
$ spring help run

# angular cli


# gradle cli
```

## Notes
- set proxy: for enable HttpClientXsrfModule (relative path `/api` not absolute `http://`, `https://` or method `GET`, `HEAD`)

## StackOverFlow

[Angular 6 does not add X-XSRF-TOKEN header to http request](https://stackoverflow.com/questions/50510998/angular-6-does-not-add-x-xsrf-token-header-to-http-request/50511663#50511663)