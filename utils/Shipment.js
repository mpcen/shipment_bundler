/*

	A Standard shipment class

*/

class Shipment {
	constructor(shipment_id, start_city, end_city, day_of_week) {
		this.shipment_id = shipment_id;
		this.start_city = start_city;
		this.end_city = end_city;
		this.day_of_week = day_of_week;
	}
}

module.exports = Shipment;