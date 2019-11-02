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

    interval: null,

    checkUniTimer: function(){
        let that =this
        if(this.interval) clearInterval(this.interval)
        this.interval = setInterval(() => {
            if(that.uniList.length==0){
                that.requestUniversityList();
                return
            }

            if(app.message){
                let reg = new RegExp(app.message, 'i');
                console.log(reg)
                app.suggestion = that.uniList.filter(function(uni) {
                    if (uni.match(reg)) {
                        console.log(uni)
                        return uni;
                    }
                }).slice(0, 6);
                window.scrollTo({ top: 9000, behavior: 'smooth' })
            }
        }, 1000)
    },


    handleCurrent:function(msg){
        if(msg){
            this.requestUniversity(msg)
        }
        
    },

    push:function(content){

        app.bubbleList.push(content);

        window.scrollTo({ top: 9000, behavior: 'smooth' })
    },

    question : [{content:"Any other university are you looking for?"}, {content: "Type any other university name for their full courses"}, {content:"What another one?"}],
    questionNum : 2,

    goToNextQuestion: function(overrideQ){
        this.checkUniTimer()
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

    uniList: [],

    requestUniversityList: function(){
        axios.get('http://127.0.0.1:8080/supportedUniversities')
        .then((response) => {
            console.log(response);
            this.uniList = response.data.supportedUniversities

        }, (error) => {
            console.log(error);
        });
    },

    requestUniversity: function(uni){
        let counter = 1;
        axios.get('http://localhost:8080/university/' + encodeURIComponent(uni))
            .then((response) => {
                console.log(response.data.data);
                if( !response.data.data || response.data.data.length == 0){
                    app.bubbleList.push({content:"Sorry, we couldn't find that university"});
                    setTimeout(() => {this.goToNextQuestion()}, 1*timeout)
                    return
                }

                app.bubbleList.push({content:response.data.data[0][0]})


                response.data.data[0][1].forEach(function(data) {
                    
                    console.log(data)
                    let course = `${data[0]} - ${data[1]}`
                    console.log(course)

                    setTimeout(() => { app.bubbleList.push({content:course});window.scrollTo({ top: 9000, behavior: 'smooth' }); }, counter*2*timeout)
                    counter++
                });
                    
                setTimeout(() => {this.goToNextQuestion()}, (counter+2)*2*timeout)

            }, (error) => {
                console.log(error);
            });
    }
  }

