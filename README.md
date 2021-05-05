# Framing Luxembourg - STATEC

A scrollytelling experience in collaboration with the STATEC designed by Federica Fragapane and developed by Paolo Corti, Framing Luxembourg is a React powered website to displays historical statistical data.

Each theme is loaded from a JSON file in data/themes and consists of several elements described by the `module` property.

Each module has a dataset and a series of paragraphs.

## Deploy with docker
The `Dockerfile` in this repo includes instruction to build the website. There is also a `docker-compose.xml` that takes care of building the app and serve via nginx:

```
  NGINX_PORT=80 docker-compose up
```

The `NGINX_PORT` env variable is required (you can use a .env file)

## Deploy with netlify
Firstly, create a build using the make command `make run-build-noindex`.
To quickly deploy a version on netlify using `nelify deploy`, add a `.netlify/state.json` file containing the correct siteId according to [Netlify documentation](https://docs.netlify.com/cli/get-started/#link-and-unlink-sites).

## Style notes for developers
All styles are defined in the `.scss` files under the `/styles` folder and under the
folder according to their role. Ideally every page and every component will be styled respectively
in `/styles/pages` and `/styles/components` folders.
All pages and components displays a css class corresponding to their class name, capitalized
e.g. "Header". If the components have nidified DOM elements that require style, they are named
with the capitalized classname as prefix, e.g. `Header_sideLink`.

We use [tachions](https://tachyons.io/) as css toolkit using all breakpoints.
Tachyons base classes are mobile by default, and adds 3 additional breakpoints:
-ns ‘not small’, media query is screen and (min-width: 30em)
-m ‘medium’, media query is screen and (min-width: 30em) and (max-width: 60em)
-l ‘large’, media query is screen and (min-width: 60em)

We use spacer 3 for small, 4 for medium and unsurprisingly 5 for large.
