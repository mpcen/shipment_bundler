const util = require('util');
const shipment_file_path = process.argv[2];
const ShipmentParser = require('./utils/shipment_parser');
const Graph = require('./utils/Graph');
const Bundler = require('./utils/Bundler');

// construct a collection of shipments
const shipments = ShipmentParser(shipment_file_path);

// construct and build a directed graph of shipments
const graph = new Graph();
graph.buildGraph(shipments);
// explore each shipment path to construct a collection of valid paths
graph.explorePaths();

// construct a bundler, passing in the total number of required shipments
const bundler = new Bundler(graph.getNumberOfShipments());

// get the minimum number of bundles required to satisfy all shipments and print them
bundler.bundle(graph.getValidPaths());
bundler.print();