// SPDX-License-Identifier: MIT
pragma solidity >=0.8.24;

import "forge-std/Test.sol";
import { MudTest } from "@latticexyz/world/test/MudTest.t.sol";
import { IWorld } from "@world/IWorld.sol";

import { LogisticNetwork, LogisticNetworkData, LogisticDepot, LogisticDepotData, LogisticOperation, LogisticOperationData, LogisticAction, LogisticActionData, LogisticTransaction, LogisticTransactionData } from "@store/index.sol";
import { ClearanceLib } from "@systems/LogisticClearance/Utils.sol";
import { ProofArgs } from "@systems/LogisticClearance/types.sol";
import { LogisticActionType, LogisticTransactionType } from "@store/common.sol";

// import { SetupTest } from "@tests/SetupTest.t.sol";

contract ProofVerificationTest is MudTest {
  IWorld logisticWorld;
  uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

  uint256 player1PrivateKey = vm.envUint("TEST_PRIVATE_KEY_1");
  uint256 player2PrivateKey = vm.envUint("TEST_PRIVATE_KEY_2");
  uint256 player3PrivateKey = vm.envUint("TEST_PRIVATE_KEY_3");
  uint256 player4PrivateKey = vm.envUint("TEST_PRIVATE_KEY_4");

  address deployer = vm.addr(deployerPrivateKey);
  address player1 = vm.addr(player1PrivateKey);
  address player2 = vm.addr(player2PrivateKey);
  address player3 = vm.addr(player3PrivateKey);
  address player4 = vm.addr(player4PrivateKey);

  string private networkName = "Test Network";
  // Test addresses
  address private PROVIDER_ADDRESS = player1;
  address private COORDINATOR_ADDRESS = player2;
  address private AGENT_ADDRESS = player3;
  address private INVALID_ADDRESS = player4;

  // Store common IDs
  uint256 private providerId;
  uint256 private networkId;
  uint256 private coordinatorId;
  uint256 private operationId;
  uint256 private agentId;
  uint256 private sourceDepotId;
  uint256 private destinationDepotId;

  // Proof
  ProofArgs private proof =
    ProofArgs({
      _pA: [
        5713257483938919078453547592280288525355136064980996296641943920706478613110,
        18075269706066830221340157331819654910460727795291583865137400508781151518092
      ],
      _pB: [
        [
          21118212145547102126627581769464459020347268282904489918316618057204632204094,
          20009571965303581645942276645070385265152163064468164508297191750614804283470
        ],
        [
          16362568686681547832376850352380497577191985872132467412680968423798832835289,
          13781226986744725887351014097952312349730971362081656257664405019754398735379
        ]
      ],
      _pC: [
        15488520432991272646765137794050176983378462161707501925263901426990792849756,
        11940380098198371830536669103112450385659937663438059407587855963153608813283
      ],
      _pubSignals: [
        18586133768512220936620570745912940619677854269274689475585506675881198879027,
        178153708830439080956131321985876514622914766145297385079526394097017302678,
        17407676228024588307375060494808185668377214548579009094260483029038054423873,
        248148014700125642104525307549910372470484839083827731376986261963143301583,
        21888242871839275222246405745257275088548364400416034343698204186575808495616,
        21888242871839275222246405745257275088548364400416034343698204186575808495616,
        8093821485214269328389004542394237209037452657522929891144731833981969398000,
        21888242871839275222246405745257275088548364400416034343698204186575808495616,
        21888242871839275222246405745257275088548364400416034343698204186575808495616,
        0,
        0,
        0,
        0,
        0,
        165847399263984454074227653489547710010158431342693314191390953912651951076,
        36229605480381579291278134134309610635351535475186875211361048445711707236,
        99240182344212554053374036315527713829266265444781305908192942786338332782,
        397348248760116564404816980715330587046050915614109965689176862368323164211,
        165847399263984454074227653489547710010158431342693314191390953912651951076,
        15,
        2,
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        127,
        21888242871839275222246405745257275088548364400416034343698204186575808495616,
        21888242871839275222246405745257275088548364400416034343698204186575808495616,
        0,
        21888242871839275222246405745257275088548364400416034343698204186575808495616,
        0,
        21888242871839275222246405745257275088548364400416034343698204186575808495616,
        21888242871839275222246405745257275088548364400416034343698204186575808495616,
        3,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        21888242871839275222246405745257275088548364400416034343698204186575808495616
      ]
    });

  // Test Setup
  function setUp() public override {
    // super.setUp();
    worldAddress = vm.envAddress("WORLD_ADDRESS");
    logisticWorld = IWorld(worldAddress);
  }

  function testProofValidation() public {
    vm.startPrank(COORDINATOR_ADDRESS);
    bool valid = ClearanceLib.verifyClearance(logisticWorld, proof);
    vm.stopPrank();
    assertTrue(valid, "Proof verification failed");
  }
}
