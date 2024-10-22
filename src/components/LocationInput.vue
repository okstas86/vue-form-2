<template>
  <div class="form-group input-label-inside">
    <label for="address">Адрес</label>
    <input
      class="input-field"
      id="address"
      name="address"
      type="text"
      v-model="query"
      @input="fetchSuggestions"
      @focus="handleFocus"
      @blur="handleBlur"
      :placeholder="isFocused ? '' : (localCity ? localCity : '')"
    />

    <div id="suggestions" v-if="suggestions.length || noSuggestions">
      <div
        class="suggestion-item"
        v-for="suggestion in suggestions"
        :key="suggestion.value"
        @click="selectSuggestion(suggestion)"
      >
        {{ suggestion.value }}
      </div>
      <div v-if="noSuggestions" class="no-suggestions">
        <p>По заданным критериям ничего не найдено</p>
      </div>
    </div>
    <span v-if="shouldShowError('address')" class="error-msg">{{ errors.address }}</span>
  </div>
</template>

<script setup>
import { ref, defineEmits, defineProps, watch, onMounted } from 'vue';
import axios from 'axios';

const emit = defineEmits(['update:address']);
const props = defineProps({
  selectedCountry: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    default: ''
  },
  margin: {
    type: Boolean,
    required: true,
  },
  errors: {
    type: Object,
    required: true,
  },
});

const query = ref(props.city);
const localCity = ref(props.city);
const suggestions = ref([]);
const noSuggestions = ref(false);
const isFocused = ref(false);


onMounted(() => {
  query.value = props.city;
  localCity.value = props.city;
});

watch(() => props.city, (newValue) => {
  query.value = newValue;
  localCity.value = newValue;
});

watch(() => props.selectedCountry, (newCountry) => {
  if (newCountry) {
    query.value = '';
    localCity.value = '';
  }
});

const token = import.meta.env.VITE_DADATA_KEY;
console.log('Dadata Token:', token);

const fetchSuggestions = async () => {
  if (query.value.length < 2) {
    suggestions.value = [];
    noSuggestions.value = false;
    return;
  }

  try {
    const selectedCountry = props.selectedCountry;

    if (!token) {
      console.error('API ключ Dadata не найден');
      return;
    }

    const response = await axios.post(
      'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address',
      {
        query: query.value,
        from_bound: { value: "region" },
        to_bound: { value: "city" },
        restrict_value: true,
        count: 5,
        locations: [{ country_iso_code: selectedCountry }],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        }
      }
    );

    suggestions.value = response.data.suggestions;
    noSuggestions.value = suggestions.value.length === 0;
  } catch (error) {
    console.error('Ошибка при получении предложений', error);
  }
};

const selectSuggestion = (suggestion) => {
  query.value = suggestion.value;
  suggestions.value = [];
  emit('update:address', suggestion.value);
};

const handleFocus = () => {
  isFocused.value = true;
  fetchSuggestions();
};

const handleBlur = () => {
  isFocused.value = false;

  if (!query.value) {
    props.errors.address = 'Введите адрес';
  }
};

const shouldShowError = (fieldName) => {
  return props.errors[fieldName];
};
</script>


<style >
 
 .input-container{
  width: 100%;
  position: relative;
 }

 .form-control{
   background-color: #333;
 }

  #suggestions {
    border: 1px solid #ccc;
    width: 100%;
    max-height: 150px;
    overflow-y: auto;
    position: absolute;
    top:3rem;
    color:#174b7c;
    
    background-color: white;
    z-index: 10;

  }

  
  .suggestion-item {
    padding: 10px;
    cursor: pointer;
  }

  .suggestion-item:hover {
    background-color: #f0f0f0;
  }

  .input-field::placeholder{
    color:#174b7c;
  }



</style>