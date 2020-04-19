import React from 'react';
import './privacy.css'
import NavBarComponent from "../navbar/NavBarComponent";

const PrivacyView = () => {
    return (
        <React.Fragment>
            <NavBarComponent />
            <div className="pp-wrapper">
                <h1>Chowk - Privacy Policy</h1>
                <div className="pp-content-wrapper">
                    <p>
                        "Chowk" is an effective open communication Q&A forum for computer science students and staff. The students can post questions, ask for guidance, or help out their peers. The staff can answer questions and moderate the interactions within a course. The web app tries to list questions from other Q&A sites like <a href={'https://stackoverflow.com/'} target="_blank" rel="noopener noreferrer">StackOverflow</a> to prevent redundancy. The web app's votes-based reputation model provides an incentive for users to participate, and reward quality posts.
                    </p>

                    <p>
                        The closest real world setting for this website would be the office hours of a computer science professor at a university. The privacy norms are relaxed, in the sense that all the technical information is available to those who need it.
                    </p>

                    <p>
                        The web application natively requires some information. For participation, a user needs to create an account with an email address, name (could be a pseudonym) and a password. The email address is considered personally identifying information from the context of the application and is kept hidden from other users of the site. The name is public information, and what the other users will see. The password is considered highly critical, and is never revealed.
                    </p>

                    <p>
                        During registration, the password is sent to the servers through https channel so that it reaches the destination without being leaked to anyone else in the network, and without it being tampered with. The server hashes the password, and then it is stored in a secured database. Even in the event of a database leak/breach, only the password's salted-hashes are available, and the plain-text password cannot be reverse-engineered.
                    </p>

                    <p>
                        Apart from personal information, The website would like to send analytics data. This is integrated with a  third-party application to monitor performance and detect anomalies. The application would also integrate advertising frameworks to monetize the website. Only contextual advertisers will be considered and prioritized. The context for the advertisements will only be the present page being viewed. Only anonymized data and no personally recognizable information will be shared with the third party integrations.
                    </p>

                    <p>
                        Considering the website's internal data, since most of the data that is being collected is intended to be shared - Questions that need an answer need to be viewed by others; Answers that are posted are intended for people to learn from it, the privacy of the user's contents are relaxed. But the user's private information like personally identifying information are required to be hidden from other users, and the public in general.
                    </p>

                    <p>
                        Although the privacy norms are relaxed, some rules, especially related to personally identifying information and password storage, will always be enforced the strictest privacy measures. Apart from these, the user's activity on the site could be used to monetize.
                    </p>

                    <p>
                        Activities like popular posts, upvote/downvote patterns and other similar data, can be used for revenue generation. But, in the event that the tracking required is intrusive, it would be an opt-in rather than the default. A consent notice, with the appropriate message will be displayed to the user. Although the primary goal of the website is to ease solving doubts for students and teachers, monetization for the survival of the website will also be considered in every step of the way.
                    </p>
                </div>
            </div>
        </React.Fragment>
    );
};

export default PrivacyView;
