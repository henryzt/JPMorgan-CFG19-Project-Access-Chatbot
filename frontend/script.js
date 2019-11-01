var app = new Vue({
    el: '#app',
    data: {
      test: "hello world"
    },
    methods: {
      
    }
  })


  Vue.component('bubble', {
    props: ['sender', 'content'],
    template: `
        <div><div>  
    `
  })