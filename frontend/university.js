let universityChecker = {
    university: null,
    course: null,

    handleCurrent:function(msg){
        if(this.questionNum == 0){
            this.university = msg
        }else{
            this.course = msg
            
        }
        
        setTimeout(() => {this.goToNextQuestion()}, 1*timeout)
    },

    push:function(content){

        app.bubbleList.push(content);

        window.scrollTo({ top: 9000, behavior: 'smooth' })
    },

    question : [{content:"What university are you looking for?"}, {content:"What course are you looking for?"}],
    questionNum : 1,

    goToNextQuestion: function(overrideQ){
        
        let that = this
        app.bubbleList.push({isloading:true})
        window.scrollTo({ top: 9000, behavior: 'smooth' })

        this.questionNum = this.questionNum == 0? 1 : 0;
        //get typing effect
        setTimeout(() => {
            app.bubbleList.pop()
            overrideQ? that.push(overrideQ): that.push(that.question[that.questionNum]);
            
            setTimeout(() => {app.editing = true;}, 4*timeout)
            setTimeout(() => {document.getElementById("msg").focus()}, 6*timeout)
        }, 12*timeout);
        
    },
  }

