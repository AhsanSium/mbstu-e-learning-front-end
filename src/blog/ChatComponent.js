import React, { useRef, useState } from 'react';
import './ChatComponent.css';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';

import { connect } from "react-redux";
import PropTypes from "prop-types";

import { useCollectionData } from 'react-firebase-hooks/firestore';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import MobileMenu from '../components/MobileMenu';

//console.log(process.env.REACT_APP_FIREBASE_API_KEY);

firebase.initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
});

const firestore = firebase.firestore();

function ChatRoom({ uid, name }) {
    const dummy = useRef();
    const messagesRef = firestore.collection('messages');
    const query = messagesRef.orderBy('createdAt').limit(25);

    const [messages] = useCollectionData(query, { idField: 'id' });

    const [formValue, setFormValue] = useState('');

    const photoURL = '';

    const sendMessage = async (e) => {
        e.preventDefault();

        await messagesRef.add({
            text: formValue,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            uid,
            photoURL,
            name
        })

        setFormValue('');
        dummy.current.scrollIntoView({ behavior: 'smooth' });
    }

    return (<>
        <main className='chat_main'>

            {messages && messages.map(msg => <ChatMessage uuid={uid} key={msg.id} message={msg} />)}

            <span ref={dummy}></span>

        </main>

        <form className='chat_form' onSubmit={sendMessage}>

            <input className='chat_input' value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="say something nice" />

            <button className='chat_btn' type="submit" disabled={!formValue}>🕊️</button>

        </form>
    </>)
}

function ChatMessage(props) {
    const { text, uid, photoURL, name } = props.message;

    const uuid = props.uuid;

    const messageClass = uid === uuid ? 'sent' : 'received';

    return (<>
        <div className={`message ${messageClass}`}>
            <img className='chat_img' src={'https://e7.pngegg.com/pngimages/552/861/png-clipart-computer-icons-avatar-avatar-computer-icons-avatar.png'} />
            <p className='chat_p'>{name ? name : ''}{":  "}{text}</p>
        </div>
    </>)
}

const ChatComponent = ({ auth }) => {

    console.log(" Chat Auth  ", auth);

    return (
        <div className=''>

            <NavBar />

            <div className="">
                <div className="container" >
                    <ChatRoom className='d-flex justify-content-center' name={auth.users.first_name} uid={auth.users.id} />
                </div>
            </div>

            <Footer />

            <MobileMenu />
        </div>
    )
}


ChatComponent.protoTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(ChatComponent);