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
            window.scrollTo({ top: 9000, behavior: 'smooth' })
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
               {content: "Which country do you want to study in? It can be more than one!", continue: true},
               {content: "Just type and use comma to seperate them.", bindData: "TargetCountry"},
               {content: "What are the subjects you are currently studying? This will help us find your perfect match!", continue: true},
               {content: "Just type and use comma to seperate them.", bindData: "Subject"},
               {content: "Great Choice!", continue: true},
               {content: "Now the tricky part, what is your estimated grade of each subject?", bindData: "Grade"},
               {content: "Thanks. And what is the education system you are in?", bindData: "EducationType"},
               {content: "Lastly, what's your preferred finance range?", bindData: "FinanceRange"},
               {content: "And Finally, what's your age?", bindData: "Age"},
            ],

    userInfo: new Object(),

    currentQ: -1,

    handleCurrent:function(msg){
        this.userInfo[this.questions[this.currentQ].bindData] = msg;
        setTimeout(() => {this.goToNextQuestion()}, 1500)
        
        
    },

    push:function(){
        this.currentQ++;
        app.bubbleList.push(this.questions[this.currentQ]);
        window.scrollTo({ top: 9000, behavior: 'smooth' })
    },

    goToNextQuestion: function(){
        app.bubbleList.push({isloading:true})
        window.scrollTo({ top: 9000, behavior: 'smooth' })
        
        //get typing effect
        setTimeout(() => {
            app.bubbleList.pop()

            let that =this
            let timer = setInterval(function () {
                that.push();
                if (!that.questions[that.currentQ].continue) {
                    clearInterval(timer);
                }
            }, 200);
            
            setTimeout(() => {app.editing = true;}, 400)
            setTimeout(() => {document.getElementById("msg").focus()}, 600)
        }, 1200);
        
    }

  }

  registration.goToNextQuestion()