import Principal "mo:base/Principal";
import Time "mo:base/Time";
import Array "mo:base/Array";
import Trie "mo:base/Trie";
import Text "mo:base/Text";

actor DonationSystem {
  // NGO structure
  type NGO = {
    id: Text;
    name: Text;
    description: Text;
    imageUrl: Text;
    owner: Principal;
  };

  // Donation structure
  type Donation = {
    user: Principal;
    ngoId: Text;
    amount: Nat;
    timestamp: Int;
  };

  // Coupon structure
  type Coupon = {
    id: Text;
    description: Text;
    pointsRequired: Nat;
  };

  // Storage
  stable var ngos: [NGO] = [];
  stable var donations: [Donation] = [];
  stable var rewardPoints: Trie.Trie<Principal, Nat> = Trie.empty();
  stable var coupons: [Coupon] = [
    { id = "c1"; description = "Free Coffee Voucher"; pointsRequired = 100 },
    { id = "c2"; description = "50% Off Restaurant"; pointsRequired = 200 }
  ];

  // Admin management
  stable var admin: Principal = Principal.fromText("aaaaa-aa"); // Default value
  stable var isInitialized: Bool = false;

  // Admin initialization function - first caller becomes admin
  public shared(msg) func initialize(): async Text {
    if (isInitialized) {
      return "Already initialized";
    };
    
    admin := msg.caller;
    isInitialized := true;
    return "Initialization successful. You are now the admin.";
  };

  // Helper function for Trie key
  func key(p: Principal) : Trie.Key<Principal> {
    { key = p; hash = Principal.hash(p) }
  };

  // --- NGO Functions ---
  public shared(msg) func registerNGO(id: Text, name: Text, description: Text, imageUrl: Text): async Text {
    if (not Principal.equal(msg.caller, admin)) {
      return "Only admin can register NGOs.";
    };

    let newNGO: NGO = {
      id = id;
      name = name;
      description = description;
      imageUrl = imageUrl;
      owner = msg.caller;
    };

    ngos := Array.append(ngos, [newNGO]);
    return "NGO registered successfully";
  };

  public query func getAllNGOs(): async [NGO] {
    return ngos;
  };

  // --- Donation Functions ---
  public shared(msg) func donate(ngoId: Text, amount: Nat): async Text {
    if (amount == 0) {
      return "Donation amount must be greater than 0";
    };

    let donation: Donation = {
      user = msg.caller;
      ngoId = ngoId;
      amount = amount;
      timestamp = Time.now();
    };

    donations := Array.append(donations, [donation]);

    // Add reward points: 1 point = 1 unit donated
    let userKey = key(msg.caller);
    let currentPoints = switch (Trie.get(rewardPoints, userKey, Principal.equal)) {
      case (?points) { points };
      case null { 0 };
    };

    rewardPoints := Trie.put(rewardPoints, userKey, Principal.equal, currentPoints + amount / 10).0;
    return "Donation successful";
  };

  public shared query(msg) func getDonationsByUser(): async [Donation] {
    let user = msg.caller;
    return Array.filter<Donation>(donations, func (d) { Principal.equal(d.user, user) });
  };

  public shared query(msg) func getRewardPoints(): async Nat {
    let userKey = key(msg.caller);
    switch (Trie.get(rewardPoints, userKey, Principal.equal)) {
      case (?points) { points };
      case null { 0 };
    }
  };

  // --- Coupon Functions ---
  public shared query(msg) func getAvailableCoupons(): async [Coupon] {
    let userKey = key(msg.caller);
    let userPoints = switch (Trie.get(rewardPoints, userKey, Principal.equal)) {
      case (?points) { points };
      case null { 0 };
    };

    return Array.filter<Coupon>(coupons, func (c) { c.pointsRequired <= userPoints });
  };

  // Allow updating the admin role
  public shared(msg) func setAdmin(newAdmin: Principal): async Text {
    if (not Principal.equal(msg.caller, admin)) {
      return "Only current admin can set a new admin";
    };
    
    admin := newAdmin;
    return "Admin updated successfully";
  };
}
