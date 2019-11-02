let registration = {
    questions: [
               {content: "Hello! How can I help you with your uni application today?", bindData: "query", suggestion: ["choosing my future uni", "find any universities and courses that suits me", "know more about my desired uni"]},
               {content: "No problem! First, could you tell me which country are you from?", bindData: "homeCountry"},
               {content: "Which country do you want to study in? It can be more than one!", continue: true},
               {content: "Just type and use comma to seperate them.", bindData: "targetCountries"},
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
        app.suggestion = this.questions[this.currentQ].suggestion
    
        scrollToBottom()
    },

    goToNextQuestion: function(){
        
        app.bubbleList.push({isloading:true})
        scrollToBottom()
        
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
        this.userInfo.targetCountries = this.seperateComma(this.userInfo.targetCountries)
        this.userInfo.subjects = this.seperateComma(this.userInfo.subjects)
        this.userInfo.grades = this.seperateComma(this.userInfo.grades)
                                .map(function(e, i) {
                                    return {grade: e, subject: that.userInfo.subjects[i]};
                                });
        this.userInfo.age = 18
        delete this.userInfo.query;
        this.userInfo.acceptableFinanceRange = {
                                            lower: 0,
                                            upper: 10000
                                        }
        console.log(this.userInfo)
        axios.post('http://127.0.0.1:8080/register', this.userInfo)
            .then((response) => {
                console.log(response);

                setTimeout(() => {
                    app.userId = response.data.userId
                    app.bubbleList = []
                    getMatches();
                }, 2*timeout)
                
            }, (error) => {
                console.log(error);
            });
    }

  }


  registration.goToNextQuestion()