import { createApp } from 'vue';
import { configure } from 'vee-validate';
import './style.css';
import App from './App.vue';
import { createVfm } from 'vue-final-modal';
import VueTheMask from 'vue-the-mask';
import 'vue-final-modal/style.css';

configure({
  generateMessage: (context) => {
    const messages = {
      required: `Поле ${context.field} обязательно для заполнения.`,
      min: `${context.field} должно содержать минимум ${context.rule.params[0]} символов.`,
      // Add other rule messages as needed, like max, date, etc.
    };

    return messages[context.rule.name] || `Поле ${context.field} заполнено неверно.`;
  },
});

const app = createApp(App);
app.use(createVfm());
app.use(VueTheMask);
app.mount('#app');
