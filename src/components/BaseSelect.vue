<template>
  <div class="form-group input-label-inside">
    <label for="roomType">Тип помещения</label>
    <select
      :multiple="multiple"
      :value="modelValue"
      @change="$emit('update:modelValue', $event.target.value)"
      class="input-field"
    >
      <option v-for="option in options" :key="option.value" :value="option.value">
        {{ option.label }}
      </option>
    </select>
    <span v-if="shouldShowError('roomType')" class="error-msg">{{ errors.roomType }}</span>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  modelValue: [String, Array],
  options: Array,
  multiple: Boolean,
  shouldShowError: Function,
  errors: Object, 
});

const emit = defineEmits(['update:modelValue']);
</script>
