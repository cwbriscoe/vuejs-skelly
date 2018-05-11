<template>
  <div id="app">

    <nav class="navbar navbar-expand fixed-top navbar-dark bg-dark">
      <a class="navbar-brand" style="padding-top:0;padding-bottom:0" href="#">
        <span style="font-size:1.75rem">topcoin.io</span>
      </a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <a id="navpath" class="nav-item nav-link active" href="#">Home
            <span class="sr-only">(current)</span>
          </a>
          <a class="nav-item nav-link" href="#">Features</a>
          <a class="nav-item nav-link" href="#">Pricing</a>
          <a class="nav-item nav-link disabled" href="#">Disabled</a>
        </div>
      </div>
      <form class="form-inline">
        <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
      </form>
    </nav>

    <img src="./assets/logo.png">
    <router-view></router-view>

  </div>
</template>

<script lang="ts">
  import Vue from 'vue';

  export default Vue.extend({
    name: 'app',
  });
</script>

<style>
  #app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
