function getMatches(){
    let counter = 1;
    app.bubbleList.push({content:"Thank you for your information! Here are our few matches for you:"})
    axios.get('http://127.0.0.1:8080/match/ranked-courses')
            .then((response) => {
                console.log(response);
                response.data.forEach(function(data) {
                    console.log(data)
                    let match = `You can do ${data.course.courseName} at ${data.universityName}, which will get you a ${data.course.qualificationType}.`
                    console.log(match)

                    setTimeout(() => { app.bubbleList.push({content:match}) }, counter*2*timeout)
                    counter++
                });
                    
                setTimeout(() => {universityChecker.goToNextQuestion()}, 10*timeout)

            }, (error) => {
                console.log(error);
            });
}

let universityChecker = {
    university: null,
    course: null,

    handleCurrent:function(msg){
        switch(this.questionNum){
            case 0:
            this.university = msg
            break;

            case 1:
            if(msg.toLowerCase() == "no"){
                this.questionNum = 2
            }
            break;

            case 2:
            this.course = msg
            break;
            
        }
        
        setTimeout(() => {this.goToNextQuestion()}, 1*timeout)
    },

    push:function(content){

        app.bubbleList.push(content);

        window.scrollTo({ top: 9000, behavior: 'smooth' })
    },

    question : [{content:"Any other university are you looking for?"}, {content: "would you like to look at some of their courses?"}, {content:"What course are you looking for?"}],
    questionNum : 2,

    goToNextQuestion: function(overrideQ){
        
        let that = this
        app.bubbleList.push({isloading:true})
        window.scrollTo({ top: 9000, behavior: 'smooth' })
        this.questionNum++
        this.questionNum = this.questionNum >= 2? 0 : this.questionNum;
        //get typing effect
        setTimeout(() => {
            app.bubbleList.pop()
            overrideQ? that.push(overrideQ): that.push(that.question[that.questionNum]);
            
            setTimeout(() => {app.editing = true;}, 4*timeout)
            setTimeout(() => {document.getElementById("msg").focus()}, 6*timeout)
        }, 12*timeout);
        
    },
  }

