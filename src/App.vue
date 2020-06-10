<template>
  <Suspense>
    <div id="app">
      <div id="nav">
        <router-link :to="{ name: 'Home' }">Home</router-link>
      </div>
      <router-view/>
    </div>
    <template #fallback>
      Loading..
    </template>
  </Suspense>
</template>
