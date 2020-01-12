# spring-boot-angular-security-example
Security Demo with Spring boot and Angular

## Run Docker
```bash
# Start
$ docker-compose up
# Start by Detached mode: Run containers in the background, print new container names.
$ docker-compose up -d

# Stop
$ docker-compose down
# Stop & Remove image ('all': Remove all images used by any service)
$ docker-compose down --rmi all
```

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

## Request Example
```bash
curl --location --request POST 'http://localhost:9000/api/example' \
--header 'Content-Type: application/json' \
--header 'X-XSRF-TOKEN: a7857665-adc2-4c4e-a2af-c468bf56deea' \
--header 'Authorization: Basic dXNlcjE6dXNlcjFQYXNz' \
--data-raw '{
    "name": "Sathaphorn",
    "surname": "Sunthornpan"
}'

# Authorization: Basic btoa(username:password)
```

## Notes
- set proxy: for enable HttpClientXsrfModule (relative path `/api` not absolute `http://`, `https://` or method `GET`, `HEAD`)

> Angular platform `@Inject(PLATFORM_ID) private platform: string`. check rendering `browser` is browser rendering and
> `server` is server side rendering

## StackOverFlow

[Angular 6 does not add X-XSRF-TOKEN header to http request](https://stackoverflow.com/questions/50510998/angular-6-does-not-add-x-xsrf-token-header-to-http-request/50511663#50511663)