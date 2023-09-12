// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import {UltraVerifier} from "circuits/contract/ageVerifier/plonk_vk.sol";

contract Kevin is UltraVerifier {
    event Banana(uint256 birthYearHash);

    uint256 public last;

    function set(bytes calldata proof, bytes32[] calldata inputs) public {
        require(this.verify(proof, inputs));
        last = uint256(inputs[0]);
        emit Banana(uint256(inputs[0]));
    }
}
