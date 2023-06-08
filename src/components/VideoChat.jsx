import React, { useEffect, useRef } from 'react';
import PropTypes from "prop-types";
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';
import './VideoStyle.css';
import { connect } from "react-redux";

import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import MobileMenu from '../components/MobileMenu';




const VideoChat = ({ auth }) => {

    const firebaseConfig = {
        apiKey: "AIzaSyAhW13pIeogLMXtyaRLjt0Oi9nR_i2yxBE",
        authDomain: "mbstu-e-learning.firebaseapp.com",
        projectId: "mbstu-e-learning",
        storageBucket: "mbstu-e-learning.appspot.com",
        messagingSenderId: "170484105107",
        appId: "1:170484105107:web:e93e2b992d015f96173266"
    };

    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }

    const firestore = firebase.firestore();

    const servers = {
        iceServers: [
            {
                urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'],
            },
        ],
        iceCandidatePoolSize: 10,
    };

    // Global State
    const pc = new RTCPeerConnection(servers);
    let localStream = null;
    let remoteStream = null;



    // HTML elements
    // const webcamButton = document.getElementById('webcamButton');
    // const webcamVideo = document.getElementById('webcamVideo');
    // const callButton = document.getElementById('callButton');
    // const callInput = document.getElementById('callInput');
    // const answerButton = document.getElementById('answerButton');
    // const remoteVideo = document.getElementById('remoteVideo');
    // const hangupButton = document.getElementById('hangupButton');


    const webcamButton = useRef(null);
    const webcamVideo = useRef(null);
    const callButton = useRef(null);
    const callInput = useRef(null);
    const answerButton = useRef(null);
    const remoteVideo = useRef(null);
    const hangupButton = useRef(null);

    // 1. Setup media sources

    const handleWebCamBtnClick = async () => {
        localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        remoteStream = new MediaStream();

        // Push tracks from local stream to peer connection
        localStream.getTracks().forEach((track) => {
            pc.addTrack(track, localStream);
        });

        // Pull tracks from remote stream, add to video stream
        pc.ontrack = (event) => {
            event.streams[0].getTracks().forEach((track) => {
                remoteStream.addTrack(track);
            });
        };

        webcamVideo.current.srcObject = localStream;
        remoteVideo.current.srcObject = remoteStream;

        callButton.current.disabled = false;
        answerButton.current.disabled = false;
        webcamButton.current.disabled = true;
    };

    // 2. Create an offer
    const handleCallButtonClick = async () => {
        console.log("Call BTN Clicked =  ");
        // Reference Firestore collections for signaling
        const callDoc = firestore.collection('calls').doc();
        const offerCandidates = callDoc.collection('offerCandidates');
        const answerCandidates = callDoc.collection('answerCandidates');

        callInput.current.value = callDoc.id;

        // Get candidates for caller, save to db
        pc.onicecandidate = (event) => {
            event.candidate && offerCandidates.add(event.candidate.toJSON());
        };

        // Create offer
        const offerDescription = await pc.createOffer();
        await pc.setLocalDescription(offerDescription);

        const offer = {
            sdp: offerDescription.sdp,
            type: offerDescription.type,
        };

        await callDoc.set({ offer });

        // Listen for remote answer
        //useEffect(()=>{},[])
        callDoc.onSnapshot((snapshot) => {
            const data = snapshot.data();
            console.log("SnapShot Data =  ", data);
            if (!pc.currentRemoteDescription && data && data.answer) {
                const answerDescription = new RTCSessionDescription(data.answer);
                pc.setRemoteDescription(answerDescription);
            }
        });

        // When answered, add candidate to peer connection
        answerCandidates.onSnapshot((snapshot) => {
            snapshot.docChanges().forEach((change) => {
                if (change.type === 'added') {
                    const candidate = new RTCIceCandidate(change.doc.data());
                    pc.addIceCandidate(candidate);
                }
            });
        });

        hangupButton.current.disabled = false;
    };

    // 3. Answer the call with the unique ID
    const handleAnswerButtonClick = async () => {
        const callId = callInput.current.value;
        const callDoc = firestore.collection('calls').doc(callId);
        const answerCandidates = callDoc.collection('answerCandidates');
        const offerCandidates = callDoc.collection('offerCandidates');

        pc.onicecandidate = (event) => {
            event.candidate && answerCandidates.add(event.candidate.toJSON());
        };

        const callData = (await callDoc.get()).data();

        const offerDescription = callData.offer;
        await pc.setRemoteDescription(new RTCSessionDescription(offerDescription));

        const answerDescription = await pc.createAnswer();
        await pc.setLocalDescription(answerDescription);

        const answer = {
            type: answerDescription.type,
            sdp: answerDescription.sdp,
        };

        await callDoc.update({ answer });

        offerCandidates.onSnapshot((snapshot) => {
            snapshot.docChanges().forEach((change) => {
                console.log(change);
                if (change.type === 'added') {
                    let data = change.doc.data();
                    pc.addIceCandidate(new RTCIceCandidate(data));
                }
            });
        });
    };


    return (
        <div>
            <NavBar />
            <div className='videoBody'>
                <h2> VideoChat </h2>

                <h3 className='h3'>1. Start your Webcam</h3>
                <div className="videos d-flex justify-content-between">
                    <span>
                        <h4>Local Stream</h4>
                        <video className='video' ref={webcamVideo} id="webcamVideo" autoPlay playsInline></video>
                    </span>
                    <span>
                        <h4>Remote Stream</h4>
                        <video className='video' ref={remoteVideo} id="remoteVideo" autoPlay playsInline></video>
                    </span>


                </div>

                <button ref={webcamButton} onClick={() => handleWebCamBtnClick()} id="webcamButton">Start webcam</button>
                <h3 className='h3 my-4'>2. Create a new Call</h3>
                <button ref={callButton} onClick={() => handleCallButtonClick()} id="callButton" >Create Call (offer)</button>

                <h3 className='h3 mt-5'>3. Join a Call</h3>
                <p>Answer the call from a different browser window or device</p>

                <input ref={callInput} id="callInput" />
                <button ref={answerButton} onClick={() => handleAnswerButtonClick()} id="answerButton" >Answer</button>

                <h3 className='h3 mt-5'>4. Hangup</h3>

                <button ref={hangupButton} id="hangupButton" >Hangup</button>

            </div>

            <MobileMenu />

            <Footer />

        </div>
    )
}

VideoChat.protoTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(VideoChat);