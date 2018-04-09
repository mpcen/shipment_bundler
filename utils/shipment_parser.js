const fs = require('fs');
const Shipment = require('./Shipment');

const shipment_parser = shipment_file => {
	const data = fs.readFileSync(shipment_file, 'utf8');

	const shipments = data.split('\n').map(shipment_string => {
		const shipment = shipment_string.split(' ');
		return new Shipment(shipment[0], shipment[1], shipment[2], shipment[3]);
	});

	// gets rid of empty shipment that was brought into dataset due to empty line
	if(!shipments[shipments.length - 1].shipment_id) {
		shipments.pop();
	}

	return shipments;
};

module.exports = shipment_parser;