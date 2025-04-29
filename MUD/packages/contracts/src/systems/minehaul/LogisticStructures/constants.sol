// SPDX-License-Identifier: MIT
pragma solidity >=0.8.21;

// NOTE in the future, LogisticSources and LogisticSinks will in the structures category which represent, a source of resources that we can capture and process in our depot network, and sink which consumes these resources to.
// NOTE there is also a LogisticTransducer, which acts both as a sink and a source, it consumes resources of one type and spits another type.

uint256 constant LOGISTIC_SOURCE = 1;

uint256 constant LOGISTIC_SINK = 2;
