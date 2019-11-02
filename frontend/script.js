Vue.component('bubble', {
    props: ['isclient', 'content','isloading'],
    template: `
        <div class="conversation" :class="{client_right_align:isclient}" >
            <img src="img/icon.png" v-if="!isclient" class="icon">
                <div :class="{bubble:true, bubble_server:!isclient, bubble_client:isclient, bubble_loading:isloading, bubble_bounce:!isloading && !isclient}">
                    {{isloading ? 'typing...' : content}}
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
    },
    methods: {
        submitForm: function(){
            this.editing = false
            this.bubbleList.push({content:this.message, isclient:true})
            if(!this.userId){
                registration.handleCurrent(this.message);
            }
            this.message = ""
        }
    }
  })


  let registration = {
    questions: [
               {content: "Hello! How can I help you with your uni application today?", bindData: "Query"},
               {content: "No problem! First, could you tell me which country are you from?", bindData: "HomeCountry"},
               {content: "Which country do you want to study in? It can be multiple ones!", bindData: "TargetCountry"},
               {content: "What are the subjects you are currently studying? This will help us find your perfect match!", bindData: "Subject"},
               {content: "Now the tricky one, what is your estimated grade?", bindData: "Grade"},
               {content: "And what is the education system you are in?", bindData: "EducationType"},
               {content: "Lastly, what's your preferred finance range?", bindData: "FinanceRange"},
               {content: "Finally, what's your age?", bindData: "Age"},
            ],

    userInfo: new Object(),

    currentQ: -1,

    handleCurrent:function(msg){
        this.userInfo[this.questions[this.currentQ].bindData] = msg;
        setTimeout(() => {this.goToNextQuestion()}, 1500)
        
        
    },

    goToNextQuestion: function(){
        app.bubbleList.push({isloading:true})
        this.currentQ++;
        //get typing effect
        setTimeout(() => {
            app.bubbleList.pop()
            app.bubbleList.push(this.questions[this.currentQ]);
            setTimeout(() => {app.editing = true}, 1500)
        }, 1500);
        
    }

  }

  registration.goToNextQuestion()