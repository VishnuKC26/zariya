import { AuthClient } from "@dfinity/auth-client";
import { Actor, HttpAgent  } from "@dfinity/agent";
import {
  idlFactory as donationIDL
  // canisterId as donationCanisterId,
} from "../../../declarations/zariya_final_backend";

const donationCanisterId = import.meta.env.VITE_CANISTER_ID_ZARIYA_FINAL_BACKEND;
const isLocalEnv = import.meta.env.DFX_NETWORK === "local";
const host = "http://127.0.0.1:4943";

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
  await authClient.login({
    identityProvider: "https://identity.ic0.app/#authorize",
    onSuccess: async () => {
      identity = authClient.getIdentity();
      console.log('🔐 Captured Identity:', identity);
      donationActor = createActor(identity);
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
  console.log("🚀 Creating actor with canister ID:", donationCanisterId);let backendActor = createActor(import.meta.env.VITE_CANISTER_ID_ZARIYA_FINAL_BACKEND, { agentOptions: { identity: identity } });
  console.log("Backend Actor : ",backendActor)

  return Actor.createActor(donationIDL, {
    agent,
    canisterId: donationCanisterId,
  });
}