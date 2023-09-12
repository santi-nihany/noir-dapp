// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "forge-std/Test.sol";
import "forge-std/console2.sol";

import {Kevin} from "contracts/Kevin.sol";

import {NoirHelper} from "test/utils/NoirHelper.sol";

contract KevinTest is Test, NoirHelper {
    Kevin kevin;

    function setUp() external {
        kevin = new Kevin();
    }

    function _sheesh(string memory name) internal {
        this.withInput(
            "hash",
            0x1bbeb13ec87a172551c79252551df87bf1e0445d51de912fc00a1d7e330c5d6b
        );
        bytes memory proof = this.generateProof(name);
        bytes32[] memory inputs = new bytes32[](1);
        inputs[0] = bytes32(
            uint256(
                0x1bbeb13ec87a172551c79252551df87bf1e0445d51de912fc00a1d7e330c5d6b
            )
        );
        kevin.set(proof, inputs);
        assertEq(
            kevin.last(),
            0x1bbeb13ec87a172551c79252551df87bf1e0445d51de912fc00a1d7e330c5d6b
        );
    }

    function testLabouji() external {
        _sheesh("ageVerifier");
    }

    // function testKingBob() external {
    //     _sheesh("test_1");
    // }
}
