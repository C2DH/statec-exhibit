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

## Contents

### How to add a new chapter?
add the relevant info in the constants file, use the existing chapters as blueprint:

```javascript
export const ChapterRoutesWithIndex = [
  ChapterRouteIndex,
  ChapterRouteCountryOfMigration,
  ChapterRouteFamily,
  ...
  YourNewChapter,
]

export const ChapterRoutes = [
  ChapterRouteCountryOfMigration,
  ChapterRouteFamily,
  ...
  YourNewChapter
]
```

Add the relevant theme file in data/themes containing at least these fields:
```json
{
  "id": "id of the chapter",
  "chapterIndex": "233",
  "title": "Emploi et travail",
  "backgroundColor": "#FDFD9B",
  "cover": {
    "url": "/233.cap233.jpg",
    "caption": "...",
    "source": "..."
  },
  "sections": [],
  "modules": []
}
```

### How to add a dataset and text contents to a section?
The content is organised in `chapter`, `section`, `paragraph`. The `section` is
responsible of delivering the dataset for the main visualisation and each paragraph
*can* change the variables visualised.

As an example, let's have a look at one of the current themes:
```json
{
  "id": "id of the chapter",
  "sections": [
    {
      "dataset": "population-natural-growth-details",
      "numericTranslationLabel": "number",
      "displayPoints": true,
      "displayDashedLine": true,
      "modules": [
        {
          "title": "Naissance: un taux de natalité en baisse sur deux cents ans",
          "subheading": "Optional subheading to introduce the section with a bigger font",
          "paragraphs": [
            {
              "from": 1840,
              "to": 1890,
              "availableKeys": ["v1"],
              "visibleKeys": ["v1"],
              "focusKeys": ["v1"],
              "text": "..."
            }
          ]
        }
      ]
    }
  ]
}

For the moment being, datasets are usually stored in the `./src/data/datasets/` folder,
and loaded as modules with `require`. In each section object, the **compulsory** `dataset` property defines the filename
to load.

By default, the trend extent (min, max) is computed using all `v*` values
available in the dataset.values items.  Each paragraph can override the values
taken into account with the property `availableKeys`. In this case, only the values of the `v1` property
are considered.
The values in `visibleKeys` are used to draw the thin lines, using the full range 1940 to today.
The values in `focusKey` draw a ticker line usinfg the from to property. If no focusKey is present, the `v` is then highighted


  ```

enable to slide to supports a different dataset.
Each visualisation is handled by the component ChapterVisualisation

### How to change the title of a chapter?
Change the `title` property in the chapter file `./data/themes/<theme id>.json`; then verify
the route label in the `./src/constants.js` file: there, every chapter route
has both a link and a label. The label refers to the translatable property in the translations.json file

```javascript
const ChapterRouteFamily = { to:'/family', label: 'ChapterRouteFamily'}
```
