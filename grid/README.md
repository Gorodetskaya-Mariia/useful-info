# Grid Layout

## Technology stack and techniques used in project:
	* HTML5 CSS3 Javascript
	* Using rem units
	* Gulp taskrunner
	* Sass (mixins, nesting, variables)
	* PostCSS plugins
	* BEM methodology
	* Responsive Web Design approach

## What is done:
### Widget implemented:
> [Tokyo](https://gorodetskaya-mariia.github.io/html-css/grid/build/)<br> 

### Project overview:

- The rem unit is relative to the root—or the html—element. That means that we can define a single font size on the html element and define all rem units to be a percentage of that. A font size was defined in ":root" selector and was changed in media queries.
- About Gulp taskrunner: A local Browsersync server with auto-refresh is used for developing process. Gulp is subscribed to changes in *.js / *.sass / *.html files and if any of them changes, it launches pipe tasks that perform optimizations, transpile from .sass to .css, minify and concatenate scripts and style sheets. In the prod .css styles, the necessary vendor prefixes are automatically applied.
- All common styles, which are often used via project, are collected in "global.scss" and are used in "[]" across "html" in addition to BEM methodology.
- Responsive Web Design is achieved through grid layout and media expressions.
