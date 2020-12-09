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

.font-poppins-bold {
	font-family: Poppins;
	font-weight: 900;
}
.font-poppins-regular {
	font-family: Poppins;
}

.exr-outdate-line,
.exr-outdate-circle,
.exr-outdate-label,
.exr-today-line,
.exr-today-circle {
	@apply stroke-lastYear;

	fill: none;
	stroke-width: 4;
}

.exr-today-line,
.exr-today-circle,
.exr-today-label {
	@apply stroke-today;
}

.exr-today-label,
.exr-outdate-label {
	stroke-width: 1;
}
</style>
