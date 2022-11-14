<template>
  <div id="not-found">
    <h1>No encontrado</h1>

    <hr>

    <!-- <h4>Error 404</h4> -->

    <p>
      <span>
        {{ url }}
      </span>
      no existe
    </p>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const url = computed(() => route.path);
</script>

<style>
#not-found {
  display: flex;
  flex-direction: column;
  width: 100%;
  text-align: center;
}

#not-found hr {
  min-width: 100%;
  width: 45rem;
  border-width: 1px;
  border-style: solid;
}

#not-found span {
  font-family: monospace;
}
</style>
