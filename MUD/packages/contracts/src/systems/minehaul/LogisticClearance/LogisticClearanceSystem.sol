// SPDX-License-Identifier: GPL-3.0
/*
    Copyright 2021 0KIMS association.

    This file is generated with [snarkJS](https://github.com/iden3/snarkjs).

    snarkJS is a free software: you can redistribute it and/or modify it
    under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    snarkJS is distributed in the hope that it will be useful, but WITHOUT
    ANY WARRANTY; without even the implied warranty of MERCHANTABILITY
    or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public
    License for more details.

    You should have received a copy of the GNU General Public License
    along with snarkJS. If not, see <https://www.gnu.org/licenses/>.
*/

import { System } from "@latticexyz/world/src/System.sol";

pragma solidity >=0.7.0 <0.9.0;

contract LogisticClearanceSystem is System {
  // Scalar field size
  uint256 constant r = 21888242871839275222246405745257275088548364400416034343698204186575808495617;
  // Base field size
  uint256 constant q = 21888242871839275222246405745257275088696311157297823662689037894645226208583;

  // Verification Key data
  uint256 constant alphax = 20491192805390485299153009773594534940189261866228447918068658471970481763042;
  uint256 constant alphay = 9383485363053290200918347156157836566562967994039712273449902621266178545958;
  uint256 constant betax1 = 4252822878758300859123897981450591353533073413197771768651442665752259397132;
  uint256 constant betax2 = 6375614351688725206403948262868962793625744043794305715222011528459656738731;
  uint256 constant betay1 = 21847035105528745403288232691147584728191162732299865338377159692350059136679;
  uint256 constant betay2 = 10505242626370262277552901082094356697409835680220590971873171140371331206856;
  uint256 constant gammax1 = 11559732032986387107991004021392285783925812861821192530917403151452391805634;
  uint256 constant gammax2 = 10857046999023057135944570762232829481370756359578518086990519993285655852781;
  uint256 constant gammay1 = 4082367875863433681332203403145435568316851327593401208105741076214120093531;
  uint256 constant gammay2 = 8495653923123431417604973247489272438418190587263600148770280649306958101930;
  uint256 constant deltax1 = 4049294766663078391899958499272307811187490747478547618424968637945243894922;
  uint256 constant deltax2 = 17267206761665819358348911440466739956501307890613806905888558010078168967503;
  uint256 constant deltay1 = 13352738181673544977046238992393172067363556744540922715196435578117670738744;
  uint256 constant deltay2 = 9617872652545778521956634140697973653619425853949323828300452734732630564355;

  uint256 constant IC0x = 7626259294522373751855075622760831529959264008282610339659291276106500618678;
  uint256 constant IC0y = 21442028530454123593570068981841075914566280711784810454948257170148826128741;

  uint256 constant IC1x = 10830146039192547543571948760752394632625997705285923868865966142228079542103;
  uint256 constant IC1y = 4533860051071245615740269202780052439213929114375426153012209400815686051347;

  uint256 constant IC2x = 12715955702737080142090298605351637365437845216106172596349672466622538149577;
  uint256 constant IC2y = 5638108767029663281711586375614442910180852414817770328420231318787730368693;

  uint256 constant IC3x = 18454382316823868588940691009052660509783817513074465272647252315102088389720;
  uint256 constant IC3y = 18556962211676206063912947978492565120148504732622902554072030040444417337768;

  uint256 constant IC4x = 5397787229039140577988467488400131888667761614476873447787889064084157362779;
  uint256 constant IC4y = 2237909960758220681136453387789953351513149232848668987040056782290676556092;

  uint256 constant IC5x = 18671840833205244575414392438211358358391291358666314750178831168414424518473;
  uint256 constant IC5y = 839411845734723494689457628186614404309280175006248420762466635051857444310;

  uint256 constant IC6x = 17654272511422840591489078287058155935657204383172079975178811961635534881517;
  uint256 constant IC6y = 7215435237072154230380027410645285168523185148457141803512872297115198552338;

  uint256 constant IC7x = 4804487735668008037443576374024178877047622327053604680289420285706736798419;
  uint256 constant IC7y = 8297695440434094786472210440733209487365612466214914381633869333912635063365;

  uint256 constant IC8x = 17987711648080509212481864149486340172384854899902338418215005102023966657757;
  uint256 constant IC8y = 17250714913630199719659791873528981356457793878977528981498140418287467899455;

  uint256 constant IC9x = 11102900904206687551927697274526503003550726350898878180136826314144349995894;
  uint256 constant IC9y = 4550651404643035149462392914096031720630443611370098635314107797549285768659;

  uint256 constant IC10x = 20644599259837561870980256978469680864707851933524500443194182909828899610184;
  uint256 constant IC10y = 11842789525153943697492830158613454329398011896446840124585589356246403035481;

  uint256 constant IC11x = 12024631836443046216754704928030050763036314362380042631796255528339579126129;
  uint256 constant IC11y = 3847138172630977657836121933282892838393102395759888326902264366620521161100;

  uint256 constant IC12x = 7358364193697566916389632890609689907165797390509481431307921396054829934306;
  uint256 constant IC12y = 21615951055963470408124468428314519017258271154232756102723279959151332808427;

  uint256 constant IC13x = 16172217977092698052851575378125144446758821452026359453756410149644385785835;
  uint256 constant IC13y = 12804648762278204225211947473506585916197302383045087546962452311519827824578;

  uint256 constant IC14x = 2834418925489964515044381151938453382253391869697383244446086973270983796435;
  uint256 constant IC14y = 5044629565748099622654049710087390891060696491262902086645001879025770675313;

  uint256 constant IC15x = 7373598046898382792770791366392958664445041228003320286715959843090927712280;
  uint256 constant IC15y = 17448517957891980302086758320491709746870106945498150795613550501742023793667;

  uint256 constant IC16x = 7780706012680195014749658169395197044678294866928303218185537957073214272554;
  uint256 constant IC16y = 20172882691365586157186210972946460075454993204574039840124057461665335383805;

  uint256 constant IC17x = 16552782404182130216898801443279351963683851283809731823900398981771806164378;
  uint256 constant IC17y = 10514959591902883826873749368618161417087696262696806987413864655958164111109;

  uint256 constant IC18x = 12501192908507912699096642613931793480913645058504550047890867590797349317367;
  uint256 constant IC18y = 7432499131657469610339528924446109978376330831109034426230226383467171745931;

  uint256 constant IC19x = 19422674013146155909384306929314084052684562496786389095459000109372107301049;
  uint256 constant IC19y = 13338141018196969163061552548586301630162085493635736188678559768732607858614;

  uint256 constant IC20x = 12319359683935516291194280395369988143760361666943553249899660348870187981877;
  uint256 constant IC20y = 17216229938346010556171794042886113552897522529375473029780522499458460115226;

  uint256 constant IC21x = 16975289350903658756796667963014806132032427133816922787359725940042862433945;
  uint256 constant IC21y = 2787856979632496245230465528151219179925795023474689945566579147735723807617;

  uint256 constant IC22x = 20063954497384256467952748731508494651120709180087199978796038232666808876947;
  uint256 constant IC22y = 21017055764307110114587953870323626250869222076195105729228428048165658124115;

  uint256 constant IC23x = 612571945233421340450522755971475104281543643638783730417788994430720514245;
  uint256 constant IC23y = 10950587367753670067979242637465294803143732389415822839665974098435867702536;

  uint256 constant IC24x = 8650458980838697389843101076601741822368796696054030567073783243775527438384;
  uint256 constant IC24y = 3499015097667914514344425297358182491901152607308919546004297928945461516290;

  uint256 constant IC25x = 4570041994777376383816727109999074770778291606142044054823929550361299250592;
  uint256 constant IC25y = 8384258476794090492734731612857073733584474544766566176257438675838512452907;

  uint256 constant IC26x = 20739086465915426715942122628213500840334850781458017301066690729038305877181;
  uint256 constant IC26y = 11314379290702749226727809790385886645019777156289525712506289126659056796276;

  uint256 constant IC27x = 19742331106533561152761804826307468062142162961404228541450610013115394197240;
  uint256 constant IC27y = 8108185395479308598085992042892127096558728985666681579580471593275543775220;

  uint256 constant IC28x = 11356605776868301524400052585016798193576448258821835162768518385488498025629;
  uint256 constant IC28y = 5307450879395771791500483880488926749568497154561932368396130300018354095464;

  uint256 constant IC29x = 1829700674474660094954345717547722646418751690581931461207389978390196064746;
  uint256 constant IC29y = 6529000388180883965003776512294944874916594557757164043758307978606082034780;

  uint256 constant IC30x = 17401880172899078751956298199457026451855657742031236246694548203245152255432;
  uint256 constant IC30y = 4830462884887034846492369935229577176280777313698552418484847215918674826945;

  uint256 constant IC31x = 14348219636316568995237405472855588807983532600589219903531192002982989155226;
  uint256 constant IC31y = 14315682751682103731321345419561608472576180821126876636957516149619134810398;

  uint256 constant IC32x = 17952242548997336775169110949596240206726061225532337912385849655535673550749;
  uint256 constant IC32y = 3313977151156585964780874946654318748860143587761039946412536679979756921579;

  uint256 constant IC33x = 16345187721165021493033962307476005305690355343695840020954870414328923837487;
  uint256 constant IC33y = 12172741892157382483152586757733255910361541248617756285811487454113491628745;

  uint256 constant IC34x = 12916384384657077400072049148493750931716075496336073420294557401944600782712;
  uint256 constant IC34y = 13167978463522585218826402642238661056754997094239444712035174446525900479382;

  uint256 constant IC35x = 5169379087642692089174606877131895224207323210184238778020417257303253598015;
  uint256 constant IC35y = 14971460867879375049577850245151093674466246617049722545495520877697278280046;

  uint256 constant IC36x = 372114854385384936227195165601046385469245608286209880918488132323189947909;
  uint256 constant IC36y = 19189082575914291490540335472030798903133979228380613857735019058822366064036;

  uint256 constant IC37x = 8376784032980267572309946609392498913547915950062674160386889960046756093861;
  uint256 constant IC37y = 9284368487126909782521772113449802494444837534729594666982890709123994752978;

  uint256 constant IC38x = 20941200683907945577232860851619506683299365267174493328982355714867477274375;
  uint256 constant IC38y = 3003054328437595970657734563145970921916934244069153434258058014491485150149;

  uint256 constant IC39x = 17590930765855562746980897650355416063069869802440114375221842079339746310763;
  uint256 constant IC39y = 1195559195793787925874405724143988605009752855798136966413846653782842967982;

  uint256 constant IC40x = 215927513849561098826377592308321088065060135391942821863424301597345877866;
  uint256 constant IC40y = 21473937515960123560036060103843575918361538814952676077165760255939851554798;

  uint256 constant IC41x = 8169997817693800128899272095471106949701367822450675353004590525586658643446;
  uint256 constant IC41y = 13869722506849696586941744588364422870925334690312424943393926010553197555819;

  uint256 constant IC42x = 91692879718586754619750047325262967060436651632081584946125097564028371218;
  uint256 constant IC42y = 2766818183835579619295234759787696144261267632175730239492726480183522269878;

  uint256 constant IC43x = 18909488793317678711154240738629800934165689448637545164898656678492390102811;
  uint256 constant IC43y = 16413114533098340474905077531197721382126063092694104905842979395345779372073;

  uint256 constant IC44x = 6484013544367432210933460572635885818577957995046425905561879485849825487308;
  uint256 constant IC44y = 14505376983619305971163381507869732271939821438229173291835275821993958285033;

  uint256 constant IC45x = 14886592977523118944779392763250904602392274541879842282361649871019016412335;
  uint256 constant IC45y = 14131405718243761143812963137801401720573902829880485802591557618377562572526;

  // Memory data
  uint16 constant pVk = 0;
  uint16 constant pPairing = 128;

  uint16 constant pLastMem = 896;

  function verifyProof(
    uint[2] calldata _pA,
    uint[2][2] calldata _pB,
    uint[2] calldata _pC,
    uint[45] calldata _pubSignals
  ) public view returns (bool) {
    assembly {
      function checkField(v) {
        if iszero(lt(v, r)) {
          mstore(0, 0)
          return(0, 0x20)
        }
      }

      // G1 function to multiply a G1 value(x,y) to value in an address
      function g1_mulAccC(pR, x, y, s) {
        let success
        let mIn := mload(0x40)
        mstore(mIn, x)
        mstore(add(mIn, 32), y)
        mstore(add(mIn, 64), s)

        success := staticcall(sub(gas(), 2000), 7, mIn, 96, mIn, 64)

        if iszero(success) {
          mstore(0, 0)
          return(0, 0x20)
        }

        mstore(add(mIn, 64), mload(pR))
        mstore(add(mIn, 96), mload(add(pR, 32)))

        success := staticcall(sub(gas(), 2000), 6, mIn, 128, pR, 64)

        if iszero(success) {
          mstore(0, 0)
          return(0, 0x20)
        }
      }

      function checkPairing(pA, pB, pC, pubSignals, pMem) -> isOk {
        let _pPairing := add(pMem, pPairing)
        let _pVk := add(pMem, pVk)

        mstore(_pVk, IC0x)
        mstore(add(_pVk, 32), IC0y)

        // Compute the linear combination vk_x

        g1_mulAccC(_pVk, IC1x, IC1y, calldataload(add(pubSignals, 0)))

        g1_mulAccC(_pVk, IC2x, IC2y, calldataload(add(pubSignals, 32)))

        g1_mulAccC(_pVk, IC3x, IC3y, calldataload(add(pubSignals, 64)))

        g1_mulAccC(_pVk, IC4x, IC4y, calldataload(add(pubSignals, 96)))

        g1_mulAccC(_pVk, IC5x, IC5y, calldataload(add(pubSignals, 128)))

        g1_mulAccC(_pVk, IC6x, IC6y, calldataload(add(pubSignals, 160)))

        g1_mulAccC(_pVk, IC7x, IC7y, calldataload(add(pubSignals, 192)))

        g1_mulAccC(_pVk, IC8x, IC8y, calldataload(add(pubSignals, 224)))

        g1_mulAccC(_pVk, IC9x, IC9y, calldataload(add(pubSignals, 256)))

        g1_mulAccC(_pVk, IC10x, IC10y, calldataload(add(pubSignals, 288)))

        g1_mulAccC(_pVk, IC11x, IC11y, calldataload(add(pubSignals, 320)))

        g1_mulAccC(_pVk, IC12x, IC12y, calldataload(add(pubSignals, 352)))

        g1_mulAccC(_pVk, IC13x, IC13y, calldataload(add(pubSignals, 384)))

        g1_mulAccC(_pVk, IC14x, IC14y, calldataload(add(pubSignals, 416)))

        g1_mulAccC(_pVk, IC15x, IC15y, calldataload(add(pubSignals, 448)))

        g1_mulAccC(_pVk, IC16x, IC16y, calldataload(add(pubSignals, 480)))

        g1_mulAccC(_pVk, IC17x, IC17y, calldataload(add(pubSignals, 512)))

        g1_mulAccC(_pVk, IC18x, IC18y, calldataload(add(pubSignals, 544)))

        g1_mulAccC(_pVk, IC19x, IC19y, calldataload(add(pubSignals, 576)))

        g1_mulAccC(_pVk, IC20x, IC20y, calldataload(add(pubSignals, 608)))

        g1_mulAccC(_pVk, IC21x, IC21y, calldataload(add(pubSignals, 640)))

        g1_mulAccC(_pVk, IC22x, IC22y, calldataload(add(pubSignals, 672)))

        g1_mulAccC(_pVk, IC23x, IC23y, calldataload(add(pubSignals, 704)))

        g1_mulAccC(_pVk, IC24x, IC24y, calldataload(add(pubSignals, 736)))

        g1_mulAccC(_pVk, IC25x, IC25y, calldataload(add(pubSignals, 768)))

        g1_mulAccC(_pVk, IC26x, IC26y, calldataload(add(pubSignals, 800)))

        g1_mulAccC(_pVk, IC27x, IC27y, calldataload(add(pubSignals, 832)))

        g1_mulAccC(_pVk, IC28x, IC28y, calldataload(add(pubSignals, 864)))

        g1_mulAccC(_pVk, IC29x, IC29y, calldataload(add(pubSignals, 896)))

        g1_mulAccC(_pVk, IC30x, IC30y, calldataload(add(pubSignals, 928)))

        g1_mulAccC(_pVk, IC31x, IC31y, calldataload(add(pubSignals, 960)))

        g1_mulAccC(_pVk, IC32x, IC32y, calldataload(add(pubSignals, 992)))

        g1_mulAccC(_pVk, IC33x, IC33y, calldataload(add(pubSignals, 1024)))

        g1_mulAccC(_pVk, IC34x, IC34y, calldataload(add(pubSignals, 1056)))

        g1_mulAccC(_pVk, IC35x, IC35y, calldataload(add(pubSignals, 1088)))

        g1_mulAccC(_pVk, IC36x, IC36y, calldataload(add(pubSignals, 1120)))

        g1_mulAccC(_pVk, IC37x, IC37y, calldataload(add(pubSignals, 1152)))

        g1_mulAccC(_pVk, IC38x, IC38y, calldataload(add(pubSignals, 1184)))

        g1_mulAccC(_pVk, IC39x, IC39y, calldataload(add(pubSignals, 1216)))

        g1_mulAccC(_pVk, IC40x, IC40y, calldataload(add(pubSignals, 1248)))

        g1_mulAccC(_pVk, IC41x, IC41y, calldataload(add(pubSignals, 1280)))

        g1_mulAccC(_pVk, IC42x, IC42y, calldataload(add(pubSignals, 1312)))

        g1_mulAccC(_pVk, IC43x, IC43y, calldataload(add(pubSignals, 1344)))

        g1_mulAccC(_pVk, IC44x, IC44y, calldataload(add(pubSignals, 1376)))

        g1_mulAccC(_pVk, IC45x, IC45y, calldataload(add(pubSignals, 1408)))

        // -A
        mstore(_pPairing, calldataload(pA))
        mstore(add(_pPairing, 32), mod(sub(q, calldataload(add(pA, 32))), q))

        // B
        mstore(add(_pPairing, 64), calldataload(pB))
        mstore(add(_pPairing, 96), calldataload(add(pB, 32)))
        mstore(add(_pPairing, 128), calldataload(add(pB, 64)))
        mstore(add(_pPairing, 160), calldataload(add(pB, 96)))

        // alpha1
        mstore(add(_pPairing, 192), alphax)
        mstore(add(_pPairing, 224), alphay)

        // beta2
        mstore(add(_pPairing, 256), betax1)
        mstore(add(_pPairing, 288), betax2)
        mstore(add(_pPairing, 320), betay1)
        mstore(add(_pPairing, 352), betay2)

        // vk_x
        mstore(add(_pPairing, 384), mload(add(pMem, pVk)))
        mstore(add(_pPairing, 416), mload(add(pMem, add(pVk, 32))))

        // gamma2
        mstore(add(_pPairing, 448), gammax1)
        mstore(add(_pPairing, 480), gammax2)
        mstore(add(_pPairing, 512), gammay1)
        mstore(add(_pPairing, 544), gammay2)

        // C
        mstore(add(_pPairing, 576), calldataload(pC))
        mstore(add(_pPairing, 608), calldataload(add(pC, 32)))

        // delta2
        mstore(add(_pPairing, 640), deltax1)
        mstore(add(_pPairing, 672), deltax2)
        mstore(add(_pPairing, 704), deltay1)
        mstore(add(_pPairing, 736), deltay2)

        let success := staticcall(sub(gas(), 2000), 8, _pPairing, 768, _pPairing, 0x20)

        isOk := and(success, mload(_pPairing))
      }

      let pMem := mload(0x40)
      mstore(0x40, add(pMem, pLastMem))

      // Validate that all evaluations ∈ F

      checkField(calldataload(add(_pubSignals, 0)))

      checkField(calldataload(add(_pubSignals, 32)))

      checkField(calldataload(add(_pubSignals, 64)))

      checkField(calldataload(add(_pubSignals, 96)))

      checkField(calldataload(add(_pubSignals, 128)))

      checkField(calldataload(add(_pubSignals, 160)))

      checkField(calldataload(add(_pubSignals, 192)))

      checkField(calldataload(add(_pubSignals, 224)))

      checkField(calldataload(add(_pubSignals, 256)))

      checkField(calldataload(add(_pubSignals, 288)))

      checkField(calldataload(add(_pubSignals, 320)))

      checkField(calldataload(add(_pubSignals, 352)))

      checkField(calldataload(add(_pubSignals, 384)))

      checkField(calldataload(add(_pubSignals, 416)))

      checkField(calldataload(add(_pubSignals, 448)))

      checkField(calldataload(add(_pubSignals, 480)))

      checkField(calldataload(add(_pubSignals, 512)))

      checkField(calldataload(add(_pubSignals, 544)))

      checkField(calldataload(add(_pubSignals, 576)))

      checkField(calldataload(add(_pubSignals, 608)))

      checkField(calldataload(add(_pubSignals, 640)))

      checkField(calldataload(add(_pubSignals, 672)))

      checkField(calldataload(add(_pubSignals, 704)))

      checkField(calldataload(add(_pubSignals, 736)))

      checkField(calldataload(add(_pubSignals, 768)))

      checkField(calldataload(add(_pubSignals, 800)))

      checkField(calldataload(add(_pubSignals, 832)))

      checkField(calldataload(add(_pubSignals, 864)))

      checkField(calldataload(add(_pubSignals, 896)))

      checkField(calldataload(add(_pubSignals, 928)))

      checkField(calldataload(add(_pubSignals, 960)))

      checkField(calldataload(add(_pubSignals, 992)))

      checkField(calldataload(add(_pubSignals, 1024)))

      checkField(calldataload(add(_pubSignals, 1056)))

      checkField(calldataload(add(_pubSignals, 1088)))

      checkField(calldataload(add(_pubSignals, 1120)))

      checkField(calldataload(add(_pubSignals, 1152)))

      checkField(calldataload(add(_pubSignals, 1184)))

      checkField(calldataload(add(_pubSignals, 1216)))

      checkField(calldataload(add(_pubSignals, 1248)))

      checkField(calldataload(add(_pubSignals, 1280)))

      checkField(calldataload(add(_pubSignals, 1312)))

      checkField(calldataload(add(_pubSignals, 1344)))

      checkField(calldataload(add(_pubSignals, 1376)))

      checkField(calldataload(add(_pubSignals, 1408)))

      // Validate all evaluations
      let isValid := checkPairing(_pA, _pB, _pC, _pubSignals, pMem)

      mstore(0, isValid)
      return(0, 0x20)
    }
  }
}
