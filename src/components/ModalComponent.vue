<template>
  <div class="modal-content">
    <h2>Заполните заявку, чтобы стать резидентом</h2>
    <form @submit.prevent="submitForm">
      <div class="form-group input-label-inside">
        <label for="organizationName">Наименование организации / ИП</label>
        <input 
          v-model="form.organizationName"
          name="organizationName"
          type="text"
          id="organizationName"
          class="input-field"
          placeholder=" "
        />
       
        <span v-if="shouldShowError('organizationName')" class="error-msg">{{ errors.organizationName }}</span>
      </div>

      <div class="form-group input-label-inside">
        <label for="phone">Контактный телефон</label>
        <input 
          v-mask="'+7 (###) ###-##-##'"
          v-model="form.phone"
          name="phone"
          type="text"
          id="phone"
          class="input-field"
          placeholder=" "
        />
        <span v-if="shouldShowError('phone')" class="error-msg">{{ errors.phone }}</span>
      </div>

      <BaseSelect
        v-model="form.roomType"
        :options="roomTypes"
        :multiple="false"
        :shouldShowError="shouldShowError" 
        :errors="errors"
      />
      <LocationInput 
        :selectedCountry="selectedCountry?.value" 
        @update:address="handleAddressUpdate" 
        :errors="errors" />
      <BaseRange
        v-model:range="form.area"
        v-model:dates="form"
        :min="120"
        :max="400"
        :errors="errors" 
      />
      <button type="submit" class="submit-button">Отправить</button>
    </form>
  </div>
</template>

<script setup>
import BaseRange from './BaseRange.vue';
import BaseSelect from './BaseSelect.vue';
import LocationInput from './LocationInput.vue';

import { ref } from 'vue';
const emit = defineEmits(['close-modal']);


const roomTypes = ref([
  { label: 'Производственная площадь', value: 'production' },
  { label: 'Офисное помещение', value: 'office' },
  { label: 'Складское помещение', value: 'storage' },
  { label: 'Торговое помещение', value: 'retail' },
  { label: 'Помещение под услуги', value: 'service' },
]);

const form = ref({
  organizationName: '',
  phone: '',
  roomType: '',
  address:'',
  area: { from: 120, to: 400 },
  startDate: '',
  endDate: '',
});


const isFormSubmitted = ref(false);


const errors = ref({
  organizationName: '',
  phone: '',
  roomType: '',
  address: '',
  areaFrom: '',
  areaTo: '',
  startDate: '',
  endDate: '',
});



const validateForm = () => {
  const phoneRegex = /^\+7\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/;

  errors.value.organizationName = form.value.organizationName.length < 3 ? 'Минимум 3 символа' : '';
  errors.value.address = form.value.address.length < 5 ? 'Введите адрес' : '';
  errors.value.phone = phoneRegex.test(form.value.phone) ? '' : 'Введите корректный телефон в формате +7 (XXX) XXX-XX-XX';
  errors.value.roomType = form.value.roomType ? '' : 'Выберите тип помещения';
  
  const { from, to } = form.value.area;
  errors.value.areaFrom = from < 120 ? 'Минимум 120' : (from > 400 ? 'Максимум 400' : '');
  errors.value.areaTo = to < 120 ? 'Минимум 120' : (to > 400 ? 'Максимум 400' : '');
  
  errors.value.startDate = form.value.startDate ? '' : 'Введите дату начала аренды';
  errors.value.endDate = form.value.endDate ? '' : 'Введите дату окончания аренды';

  
  return Object.values(errors.value).every(error => !error);
};


const shouldShowError = (fieldName) => {
  return isFormSubmitted.value && errors.value[fieldName];
};

const handleAddressUpdate = (address) => {
  form.value.address = address;
  errors.value.address = ''; 
};

const submitForm = () => {
  isFormSubmitted.value = true;
  
  if (validateForm()) {
    try {
     
      emit('close-modal');
      alert('Форма успешно отправлена!');
      console.log(form.value)
    } catch (error) {
      alert('Ошибка при отправке формы.');
    }
  } else {
    alert('Проверьте форму на ошибки.');
  }
};
</script>




<style>
.modal-content {
  background-color: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 800px;
  max-width: 800px;
  margin: auto;
}

h2 {
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: 600;
  color: #1A263D;
  
}

p,.input-label-inside label{
  color:#174b7c;
  text-align: left;
  margin-bottom: .5rem;
  font-size: 14px;
  font-weight: 300;

}

.form-group {
  margin-bottom: 20px;
}

.input-label-inside {
position: relative;
margin-bottom: 20px;
}

.input-label-inside label {
position: absolute;
top: 0.8rem;
left: 10px;
background-color: white; 
padding: 0 5px;
transform: translateY(-50%);
transition: all 0.2s ease;
}

.input-field {
  width: 100%;
  padding: 25px 10px 10px 1rem;
  font-size: 18px;
  font-weight: 500;
  border: 1px solid #ddd;
  background-color: #fff;
  border-radius: 4px;
  margin-bottom: 10px;
  outline: none;
  transition: border-color 0.3s ease;
  color: #174b7c;
}

.input-field:focus {
  border-color:  #174B7C;

}

.area-place{
  margin-bottom: 0;
}

.date-group{
  margin-bottom: 0;
}

.error-date__box{
  margin-top: 1rem;
  margin-bottom: 1rem;
}
.error-msg {
  color: red;
  font-size: 12px;
  margin-top: 5px;
}

.range-container {
  display: flex;
  gap: 10px;
}

.small-input {
  flex: 1;
  position: relative;

  
}


.small-input label {
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  font-size: 12px;
  background-color: white;
  padding: 0 5px;
  color: #174B7C;
}

.small-input .input-field.right-align {
  text-align: right;
}

.right-align{
  padding-bottom: 1rem;
}

.submit-button {
  background-color: #174B7C;
  color: white;
  padding: 9px 2.2rem;
  font-size: 16px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  margin: 1rem 0 0.63rem;
  transition: background-color 0.3s ease;
}

.submit-button:hover {
  background-color: #0056b3;
}
</style>
