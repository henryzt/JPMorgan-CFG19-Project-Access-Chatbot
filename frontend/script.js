const timeout = 0

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
               {content: "Hello! How can I help you with your uni application today?", bindData: "query"},
               {content: "No problem! First, could you tell me which country are you from?", bindData: "homeCountry"},
               {content: "Which country do you want to study in? It can be more than one!", continue: true},
               {content: "Just type and use comma to seperate them.", bindData: "TargetCountry"},
               {content: "What are the subjects you are currently studying? This will help us find your perfect match!", continue: true},
               {content: "Just type and use comma to seperate them.", bindData: "subjects"},
               {content: "Great Choice!", continue: true},
               {content: "Now the tricky part, what is your estimated grade of each subject?", continue: true},
               {content: "Use comma to seperate them, respectively to the order of the subjects you entered above.", bindData: "grades"},
               {content: "Thanks. And what is the education system you are in?", bindData: "highestEducation"},
               {content: "Lastly, what's your highest preferred finance range?", bindData: "acceptableFinanceRange"},
               {content: "And Finally, what's your age?", bindData: "age"},
            ],

    userInfo: new Object(),

    currentQ: -1,

    handleCurrent:function(msg){
        this.userInfo[this.questions[this.currentQ].bindData] = msg;
        setTimeout(() => {this.goToNextQuestion()}, 15*timeout)
        
        
    },

    push:function(){
        this.currentQ++;
        if(this.currentQ > this.questions.length - 1){
            this.processResult()
            return
        }
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
                if (!that.questions[that.currentQ] || !that.questions[that.currentQ].continue) {
                    clearInterval(timer);
                }
            }, 2*timeout);
            
            setTimeout(() => {if(that.questions[that.currentQ]) app.editing = true;}, 4*timeout)
            setTimeout(() => {document.getElementById("msg").focus()}, 6*timeout)
        }, 12*timeout);
        
    },

    seperateComma: function(text){
        return text.split(",").map(x => x.trim());
    },

    processResult: function(){
        let that = this;
        app.editing = false;
        app.bubbleList.push({content:"Thank you! Just a moment while I am processing your information..."});
        this.userInfo.TargetCountry = this.seperateComma(this.userInfo.TargetCountry)
        this.userInfo.subjects = this.seperateComma(this.userInfo.subjects)
        this.userInfo.grades = this.seperateComma(this.userInfo.grades)
                                .map(function(e, i) {
                                    return {grade: e, subject: that.userInfo.subjects[i]};
                                });
          
        this.userInfo.acceptableFinanceRange = {
                                            lower: 0,
                                            upper: this.userInfo.acceptableFinanceRange
                                        }
        console.log(this.userInfo)
    }

  }

  registration.goToNextQuestion()