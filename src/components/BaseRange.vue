<template>
  <!-- Диапазон чисел -->
  <div class="range-container">
    <div class="input-label-inside small-input">
      <input
        type="number"
        v-model="range.from"
        :min="min"
        :max="max"
        placeholder=" "
        class="input-field right-align"
        @input="updateRange('from', $event.target.value)"
      />
      <label for="rangeFrom">от</label>
    </div>

    <div class="input-label-inside small-input">
      <input
        type="number"
        v-model="range.to"
        :min="min"
        :max="max"
        placeholder=" "
        class="input-field right-align"
        @input="updateRange('to', $event.target.value)"
      />
      <label for="rangeTo">до</label>
    </div>
    
    
    <span v-if="errors && errors.areaFrom" class="error-msg">{{ errors.areaFrom }}</span>
    <span v-if="errors && errors.areaTo" class="error-msg">{{ errors.areaTo }}</span>
  </div>


  <div class="range-container date-group">
    <div class="small-input">
      <input
        v-model="dates.startDate"
        type="date"
        class="input-field right-align"
        @input="updateDates('startDate', $event.target.value)"
      />
      <label for="startDate">с</label>
    </div>

    <div class="small-input">
      <input
        v-model="dates.endDate"
        type="date"
        class="input-field right-align"
        @input="updateDates('endDate', $event.target.value)"
      />
      <label for="endDate">по</label>
    </div>

   
  </div>
  <div class="error-date__box">
    <span v-if="errors && errors.startDate" class="error-msg">{{ errors.startDate }}</span>
    <span v-if="errors && errors.endDate" class="error-msg">{{ errors.endDate }}</span>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  range: {
    type: Object,
    default: () => ({ from: 0, to: 100 })
  },
  min: {
    type: Number,
    default: 0
  },
  max: {
    type: Number,
    default: 100
  },
  dates: {
    type: Object,
    default: () => ({ startDate: '', endDate: '' })
  },
  errors: Object, 
});

const emit = defineEmits(['update:range', 'update:dates']);

const updateRange = (key, value) => {
  const updatedRange = { ...props.range, [key]: value };
  emit('update:range', updatedRange);
};

const updateDates = (key, value) => {
  const updatedDates = { ...props.dates, [key]: value };
  emit('update:dates', updatedDates);
};
</script>
