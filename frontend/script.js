Vue.component('bubble', {
    props: ['sender', 'content','isloading'],
    template: `
    <div class="conversation" :class="{client_right_align:sender=='client'}">
        <img src="img/icon.png" v-if="sender=='server'" class="icon">
        <div :class="{bubble:true, bubble_server:sender=='server', bubble_client:sender=='client', bubble_loading:isloading}">
            {{isloading ? 'typing...' : content}}
        </div>
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