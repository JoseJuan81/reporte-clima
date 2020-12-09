<template>
	<div id="app">
		<router-view/>
	</div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.font-poppins {
	font-family: Poppins;
}

.exr-outdate-line,
.exr-outdate-circle,
.exr-outdate-label,
.exr-today-line,
.exr-today-circle {
	fill: none;
	stroke: #61b15a;
	stroke-width: 4;
}

.exr-today-line,
.exr-today-circle,
.exr-today-label {
	stroke: #fd3a69;
}

.exr-today-label,
.exr-outdate-label {
	stroke-width: 1;
}
</style>
