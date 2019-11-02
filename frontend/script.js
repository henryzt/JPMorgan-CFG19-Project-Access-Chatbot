const timeout = 100

Vue.component('bubble', {
    props: ['isclient', 'content','isloading'],
    template: `
        <div class="conversation" :class="{client_right_align:isclient}" >
            <img src="img/icon.png" v-if="!isclient" class="icon">
                <div :class="{bubble:true, bubble_server:!isclient, bubble_client:isclient, bubble_loading:isloading, bubble_bounce:!isloading && !isclient}">
                    {{isloading ? 'typing...' : (content?content:'')}}
                </div>
        </div>

    `
  })


var app = new Vue({
    el: '#app',
    data: {
      bubbleList: [],
      userId: null,
      editing: false,
      message: "",
      suggestion: null
    },
    methods: {
        submitForm: function(msg){
            if(typeof msg == 'string') this.message = msg;
            if(this.message == "skip") {this.userId=-1;}
            this.suggestion = null
            this.editing = false
            this.bubbleList.push({content:this.message, isclient:true})
            scrollToBottom()
            if(!this.userId){
                registration.handleCurrent(this.message);
            }else{
                universityChecker.handleCurrent(this.message);
            }
            this.message = ""
        }
    }
  })


 function scrollToBottom(){
    window.scrollTo({ top: 90000, behavior: 'smooth' })
  }