# Chowk
[Live site](https://web-dev-project-client.herokuapp.com/welcome)

This repo contains the code for the client side application. 
This app's usage is described in the `setup.md` file.

[Here is a demo](https://youtu.be/yHT04KPPhxg) of the site.

The server-side application code is [here](https://github.com/gnithin/web-dev-project-server).

## About
[Chowk](https://www.merriam-webster.com/dictionary/chowk) is an effective open communication Q&A forum for computer science students and staff. The students can post questions, ask for guidance, or help out their peers. The staff can answer questions and moderate the interactions within a course.

Think Piazza/Blackboard with a bit of StackOverflow mixed in, with only the essential features and waay better UI :)

## Problems with existing forums
This forum aims to plug a few problems that students and staff seem to face often - 
- People asking questions about solved technical problems. A lot of technical questions are mostly resolved in StackOverflow. Repeating the same questions in the forum does not help much. It would be better if the forum itself, pointed out the relevant results before they are asked.

- Complex/Bad categorization of Q&A. Most of the forums have either too many options to answer or too few. The student's answer, instructor's answers, discussion, followup discussion ad infinitum.

- Incentive for students to participate. All the burden to answer questions are usually on the staff members (teachers and TAs). There are very few students who participate, out of the goodness of their hearts. There is no incentive for the students to answer questions.


## Features
This forum tries to solve each of the above problems - 
- Suggestions from Stackoverflow APIs when the question is being typed in. Most of the answers in any CS student forums contains a link to a Stackoverflow post. This integration will focus on solving the problem posed by the asker, rather than create unnecessary content for the website.

- For Q&A, There will be questions, answers and comments. That's it!

- Reputation for Questions, and answers. Each question or an answer can be upvoted or downvoted by the community, and reputation can be gained. Gamification of the forum will allow higher quality content. This can also decrease the pressure on the staff to answer questions from many students at the same time (PDP and Web-dev :p). This can also be used by instructors as a tool to gauge the most helpful students for future positions in their staff. There will also be counter-measures to prevent gaming the reputation system as well.

## Users
There will be two types of users - 
- Students - They can be ask questions, post answers, upvote/downvote posts.
- Staff - Instructors/TAs who can post questions, post answers, general updates/articles, upvote/downvote posts and moderate content.

## External API
- StackOverflow search API - https://api.stackexchange.com/docs/advanced-search#order=desc&sort=activity&q=list%20comprehension&filter=default&site=stackoverflow&run=true
- This can be used as a suggestion, when the user is typing in the query. 

## Links
Client repo -
https://github.com/gnithin/cs5610-final-project

Server repo - https://github.com/gnithin/web-dev-project-server

Google Docs -
https://docs.google.com/document/d/1oojN3hU4jctmYicAaoftLO9cSYjgXnuymc3DVqKFb14/edit?usp=sharing

