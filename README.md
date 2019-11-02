# Team-14 Project Access Website

## Our Goals

We develop a chat bot for Project Access, aimed to address the
NGO's problem that a lot of mentors' time is wasted because mentees
often ask questions on basic information regarding University
application - these information are usually readily available online,
but are scattered and difficult to aggregate as an applicant. Our chat 
bot initially requests the user to input their details such as 
predicated grade, highest education type and taken courses, in addition
to home country and target countries. Our chat bot is also intended
to utilize web scrapers to aggregate publicly available information from
university application websites (or perhaps integrate with services
such as UCAS through APIs). We divide the chat bot into a front-end
and a back-end, in order to be able to decouple the front-end and the
back-end service, and only communicate via a REST API. With mentee
information available and university/course information available,
we intend for our service to perform matching between a mentee and
several courses. When such matches are produced, not only does this
potentially help to address mismatch/rematch occurrences, but also
allows the chat bot to provide the user with more specific information
regarding the tailored university + course combination. Thus, our
backend service intends to provide two sets of APIs, (1) Information
API and (2) Match API.