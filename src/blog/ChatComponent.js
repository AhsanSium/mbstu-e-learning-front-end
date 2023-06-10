import React, { useRef, useState } from 'react';
import './ChatComponent.css';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';

import { connect } from "react-redux";
import PropTypes from "prop-types";

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import MobileMenu from '../components/MobileMenu';

firebase.initializeApp({
    apiKey: "AIzaSyAhW13pIeogLMXtyaRLjt0Oi9nR_i2yxBE",
    authDomain: "mbstu-e-learning.firebaseapp.com",
    projectId: "mbstu-e-learning",
    storageBucket: "mbstu-e-learning.appspot.com",
    messagingSenderId: "170484105107",
    appId: "1:170484105107:web:e93e2b992d015f96173266"
});

const auth = firebase.auth();
const firestore = firebase.firestore();
const analytics = firebase.analytics();

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