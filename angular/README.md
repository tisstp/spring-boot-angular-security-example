# Angular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.18.


## dependencies

- add `yarn add @ngrx/{store,effects,entity,store-devtools}` [NgRx](https://ngrx.io/docs) is a framework for building reactive applications in Angular. NgRx provides state management

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


### History generate from schematics

- `ng generate component home-container --inlineStyle --inlineTemplate --skipTests --flat` generate main component
- `ng generate component welcome-page` generate page component


## generate store

### create root steps

1. create folder name `store`
2. create module `ng generate module root-store --flat`

### create feature steps (Option 1)

1. create folder name `auth`
2. create module `ng generate module auth-store --flat`
3. create file `index.ts` in folder `auth` and export `auth-store.module`
4. create store  `ng generate @ngrx/schematics:store auth --module auth-store`
--------- 5. rename file `index.ts` in folder `reducers` to `reducers.ts` and move file in `auth` folder
6. create feature `ng generate @ngrx/schematics:feature status --reducers reducers/index.ts --api true --flat false -creators false --skipTest true`

```text
? Do you want to use the create functions? Yes
? To which module (path) should the effect be registered in? auth-store
```

7. rename file

```text
status.actions.ts        -> actions.ts
status.effects.spec.ts   -> effects.spec.ts
status.effects.ts        -> effects.ts
status.reducer.spec.ts   -> reducer.spec.ts
status.reducer.ts        -> reducer.ts
status.selectors.spec.ts -> selectors.spec.ts
status.selectors.ts      -> selectors.ts
```

![store-structure](docs/images/store-01.png)

### create feature steps (Option 2 - group folder)

1. create folder name `auth`
2. create module `ng generate module auth-store --flat`
3. create file `index.ts` in folder `auth` and export `auth-store.module`
4. create store  `ng generate @ngrx/schematics:store auth --module auth-store`
5. create feature `ng generate @ngrx/schematics:feature auth --group --reducers reducers/index.ts --api`

```text
? Do you want to use the create functions? Yes
? To which module (path) should the effect be registered in? auth-store
```

![store-structure](docs/images/store-02.png)


## Refer

angular 404 page not found
- [angular-smart-404-page : medium](https://medium.com/angular-in-depth/angular-smart-404-page-85a45b109fd8)
- [angular-smart-404-page : responses](https://medium.com/p/85a45b109fd8/responses/show)
- [angular-smart-404-page : bobrov.dev](https://bobrov.dev/blog/angular-smart-404-page/)
