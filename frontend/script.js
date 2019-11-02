Vue.component('bubble', {
    props: ['sender', 'content'],
    template: `
    <div class="conversation">
        <img src="img/icon.png" v-if="sender=='server'" class="icon">
        <div :class="{bubble:true, bubble_server:sender=='server', bubble_client:sender=='client'}">{{content}}</div>
    </div>
    `
  })


var app = new Vue({
    el: '#app',
    data: {
      test: "hello world"
    },
    methods: {
      
    }
  })