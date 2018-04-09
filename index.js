const util = require('util');
const shipment_file_path = process.argv[2];
const ShipmentParser = require('./utils/shipment_parser');
const Graph = require('./utils/Graph');
const Bundler = require('./utils/Bundler');

const shipments = ShipmentParser(shipment_file_path);

const graph = new Graph();
graph.buildGraph(shipments);
graph.exploreRoutes();

const bundler = new Bundler(graph.getNumberOfShipments());
bundler.bundle(graph.getValidPaths());
bundler.print();