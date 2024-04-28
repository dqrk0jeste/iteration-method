<script setup>
import evaluatex from 'evaluatex'
import { computed, ref } from 'vue'

const input = ref("")
const startValue = ref()

const parsedInput = computed(() => {
  return input.value.
    replaceAll('pi', 'PI').
    replaceAll('e', 'E').
    replaceAll('tg', 'tan').
    replaceAll('arcsin', 'asin').
    replaceAll('arccos', 'acos').
    replaceAll('arctg', 'atan').
    replaceAll('ln', 'log').
    replaceAll('log', 'logn')
})

const result = computed(() => {
  try {
    const res = evaluatex(parsedInput.value)({
      x: parseFloat(startValue.value),
    })
    return res.toFixed(6)
  } catch(e) {
    return '...'
  }
})
</script>

<template>
  <main class="p-2 flex items-center justify-center min-h-[100dvh]">
    <div class="flex flex-col items-center gap-3">
      <h1 class="text-4xl">Rešavanje jednačina metodom iteracije</h1>
      <div class="flex flex-col items-center">
        <h2 class="flex items-center gap-3">
          <span class="text-3xl">x =</span>
          <input
            v-model="input"
            type="text"
            class="border-black border focus:border-blue-500 outline-none rounded p-3 text-lg"
            placeholder="g(x)"
          >
          <span class="text-3xl">za x<sub>0</sub>=</span>
          <input
            v-model="startValue"
            type="number"
            class="border-black border focus:border-blue-500 outline-none rounded p-3 text-lg w-24"
          >
        </h2>
      </div>
      {{ result }}
    </div>
  </main>
</template>

<style scoped>
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
  appearance: textfield;
}
</style>