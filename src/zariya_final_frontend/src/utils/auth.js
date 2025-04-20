import React from "react";
import { AuthClient } from "@dfinity/auth-client";
import { Actor, HttpAgent } from "@dfinity/agent";
import {
  idlFactory as donationIDL
} from "../../../declarations/zariya_final_backend";

const donationCanisterId="uxrrr-q7777-77774-qaaaq-cai";
const isLocalEnv = import.meta.env.DFX_NETWORK === "local";
const host = "http://127.0.0.1:4943";

// Module-level variables for the non-React approach
let authClient = null;
let donationActor = null;
let identity = null;

export async function initAuth() {
  authClient = await AuthClient.create();
  if (await authClient.isAuthenticated()) {
    identity = authClient.getIdentity();
    donationActor = createActor(identity);
  }
}

export async function login() {
  authClient = await AuthClient.create();
  console.log("🔐 AuthClient created:", authClient);
  await authClient.login({
    identityProvider: "https://identity.ic0.app/#authorize",
    onSuccess: async () => {
      identity = authClient.getIdentity();
      console.log('🔐 Captured Identity:', identity);
      donationActor = createActor(identity);
      console.log("🚀 Actor created:", donationActor);
    },
  });
}

export async function logout() {
  await authClient.logout();
  authClient = null;
  donationActor = null;
  identity = null;
}

export function getActor() {
  console.log("🔍 Before Getting actor:", donationActor);
  return donationActor;
}

function createActor(identity) {
  const agent = new HttpAgent({
    identity,
    verifyQuerySignatures: false
  });
  
  // Fetch the root key for local development
  if (isLocalEnv) {
    agent.fetchRootKey().catch(err => {
      console.warn("Unable to fetch root key. Check to ensure that your local replica is running");
      console.error(err);
    });
  }
  console.log("🚀 Creating actor with canister ID:", donationCanisterId);
  
  // REMOVED the recursive call to createActor here
  
  return Actor.createActor(donationIDL, {
    agent,
    canisterId: donationCanisterId,
  });
}