import React, { useMemo, useRef, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { io } from "socket.io-client";
import { getLocalStorage } from "../constants/LocalStorageData";

const AudioCall = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const targetUserId = queryParams.get("to");

  const user = getLocalStorage("user");
  const userId = user.unique_id;

  const socket = useMemo(() => io(process.env.REACT_APP_SOCETURL), []);
  const [isCalling, setIsCalling] = useState(false);
  const localAudioRef = useRef(null);
  const remoteAudioRef = useRef(null);
  const peerConnectionRef = useRef(null);
  const candidateQueueRef = useRef([]); // Queue for candidates

  useEffect(() => {
    // Join signaling server with userId
    socket.emit("joinaudiocall", { userId });

    // Handle incoming offer
    socket.on("offer", async ({ offer, from }) => {
      peerConnectionRef.current = new RTCPeerConnection();

      const localStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      localAudioRef.current.srcObject = localStream;

      localStream.getTracks().forEach((track) => {
        peerConnectionRef.current.addTrack(track, localStream);
      });

      peerConnectionRef.current.ontrack = (event) => {
        remoteAudioRef.current.srcObject = event.streams[0];
      };

      peerConnectionRef.current.onicecandidate = (event) => {
        if (event.candidate) {
          socket.emit("candidate", { candidate: event.candidate, to: from });
        }
      };

      await peerConnectionRef.current.setRemoteDescription(
        new RTCSessionDescription(offer)
      );

      // Process queued ICE candidates after setting remote description
      candidateQueueRef.current.forEach((candidate) => {
        peerConnectionRef.current.addIceCandidate(
          new RTCIceCandidate(candidate)
        );
      });
      candidateQueueRef.current = []; // Clear the queue

      const answer = await peerConnectionRef.current.createAnswer();
      await peerConnectionRef.current.setLocalDescription(answer);
      socket.emit("answer", { answer, to: from });

      setIsCalling(true); // Set to calling state
    });

    // Handle incoming answer
    socket.on("answer", async ({ answer }) => {
      if (peerConnectionRef.current) {
        await peerConnectionRef.current.setRemoteDescription(
          new RTCSessionDescription(answer)
        );
      }
    });

    // Handle incoming ICE candidates
    socket.on("candidate", async ({ candidate }) => {
      if (
        peerConnectionRef.current &&
        peerConnectionRef.current.remoteDescription
      ) {
        await peerConnectionRef.current.addIceCandidate(
          new RTCIceCandidate(candidate)
        );
      } else {
        // Queue candidates if remote description is not set
        candidateQueueRef.current.push(candidate);
      }
    });
  }, [userId]);

  const handleStartCall = async () => {
    if (!isCalling) {
      // Start the call
      peerConnectionRef.current = new RTCPeerConnection();

      const localStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      localAudioRef.current.srcObject = localStream;

      localStream.getTracks().forEach((track) => {
        peerConnectionRef.current.addTrack(track, localStream);
      });

      peerConnectionRef.current.ontrack = (event) => {
        remoteAudioRef.current.srcObject = event.streams[0];
      };

      peerConnectionRef.current.onicecandidate = (event) => {
        if (event.candidate) {
          socket.emit("candidate", {
            candidate: event.candidate,
            to: targetUserId,
          });
        }
      };

      const offer = await peerConnectionRef.current.createOffer();
      await peerConnectionRef.current.setLocalDescription(offer);
      socket.emit("offer", { offer, to: targetUserId });

      setIsCalling(true);
    } else {
      // End the call
      peerConnectionRef.current.close();
      peerConnectionRef.current = null;
      localAudioRef.current.srcObject
        .getTracks()
        .forEach((track) => track.stop());
      remoteAudioRef.current.srcObject = null;

      setIsCalling(false);
    }
  };

  return (
    <div>
      <h2>Audio Call</h2>
      <button onClick={handleStartCall}>
        {isCalling ? "End Call" : "Start Call"}
      </button>
      <audio ref={localAudioRef} autoPlay muted />
      <audio ref={remoteAudioRef} autoPlay />
    </div>
  );
};

export default AudioCall;
