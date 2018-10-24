<template>
  <div class="container">
    <div id="readme-content"></div>
  </div>
</template>

<script>
import * as marked from 'marked';
import { getReadme } from './readme.service';

export default {
  name: 'Readme',
  props: {
    username: {
      required: true
    },
    repo: {
      required: true
    }
  },
  async created() {
    const element = await this; 
    const text = await getReadme(this.username, this.repo);
    element.$el.innerHTML = marked(text);
  }
}
</script>

