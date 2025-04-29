// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./utils/Poseidon.sol";
import "./utils/Groth16Verifier.sol";

contract ClearanceVerifier is Groth16Verifier, Poseidon {
  // The known hash of the FrogCrypto signer
  uint256 constant MINEHAUL_CLEARANCE_SIGNER_HASH =
    14684911797742740124972512003331124235349568037059744667498504691061732129260;

  struct ProofArgs {
    uint256[2] _pA;
    uint256[2][2] _pB;
    uint256[2] _pC;
    uint256[45] _pubSignals;
  }

  struct ClearanceAttributes {
    uint256 network_id;
    uint256 access_level;
    string holder_address;
    string pod_type;
  }

  constructor() {}

  function verifyClearance(ProofArgs calldata proof) public view {
    // First verify the constants
    // require(verifyPubSignalKnownConstants(proof), "Invalid known constants");

    // Then verify the attributes
    //  require(verifyClearanceAttributes(proof, attributes), "Invalid clearance attributes");

    // And finally verify the proof
    require(this.verifyProof(proof._pA, proof._pB, proof._pC, proof._pubSignals), "Invalid proof");
  }

  function verifyClearanceAttributes(
    ProofArgs calldata proof,
    ClearanceAttributes calldata attrs
  ) public view returns (bool) {
    uint256[45] memory pubSignals = proof._pubSignals;

    uint256[1] memory input;

    // Verify level
    input[0] = attrs.access_level;
    require(this.hash(input) == pubSignals[0], "Invalid beauty value");

    return true;
  }

  function verifyPubSignalKnownConstants(ProofArgs calldata proof) public pure returns (bool) {
    uint256[45] memory pubSignals = proof._pubSignals;

    require(
      pubSignals[11] == 21888242871839275222246405745257275088548364400416034343698204186575808495616,
      "Invalid known constant 11"
    );

    // Verify FrogCrypto signer
    require(pubSignals[12] == MINEHAUL_CLEARANCE_SIGNER_HASH, "Invalid signer");

    // Fixed values for indices 13 to 59
    uint256[47] memory fixedValues = [
      21888242871839275222246405745257275088548364400416034343698204186575808495616,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      320469162396708332516033932244029190181315114284264408621970394677041964715,
      79811696653591665733987051350844413541610759479683385956516607740051690419,
      355166872430925829725279673336652965404834009932046877642532049371080064209,
      131784857445920278807149809616705815466379358159709139801848746703275797463,
      281816578944984323586893082955502346500813215897786536562124638649161032021,
      190563830761898862018106264927787031412916351705218672411626223525427995849,
      230817354225034729219104242291752751725751467730056472112085822421181653966,
      134391921332508560099964544679493715295561887371159641958333364222734962117,
      353266386363935664439509954355717614533254106148005157507977650263408718488,
      331813365179563087827748601718945520853733728907634595064819635670819214786,
      220503421335407425308639442017232224940359242843979015945964974707193355771,
      2047,
      2,
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      8191,
      21888242871839275222246405745257275088548364400416034343698204186575808495616,
      21888242871839275222246405745257275088548364400416034343698204186575808495616,
      0,
      0,
      0,
      0,
      0,
      21888242871839275222246405745257275088548364400416034343698204186575808495616
    ];

    for (uint256 i = 13; i <= 59; i++) {
      require(pubSignals[i] == fixedValues[i - 13], string(abi.encodePacked("Invalid known constant at index ", i)));
    }

    return true;
  }
}
