class Graph {
	constructor() {
		this.adjList = new Map();
		this.validPaths = [];
		this.numberOfShipments = 0;
		this.NEXT_DAY = {
			M: 'T',
			T: 'W',
			W: 'R',
			R: 'F'
		};		
	}

	addCities(start_city, end_city) {
		if(!this.adjList.has(start_city)) {
			this.adjList.set(start_city, []);
		}

		if(!this.adjList.has(end_city)) {
			this.adjList.set(end_city, []);
		}
	}

	addShipment(shipment_id, start_city, end_city, day_of_week) {
		this.adjList.get(start_city).push({
			shipment_id,
			end_city,
			day_of_week
		});

		this.numberOfShipments++;
	}

	exploreRoutes() {
		for(let city of this.getCities()) {
			if(city[1].length) {
				this.traverseDFS(city[0]);
			}
		}
	}

	getCities() {
	    return this.adjList;
	}

	getValidPaths() {
		return this.validPaths;
	}

	getNumberOfShipments() {
		return this.numberOfShipments;
	}

	buildGraph(shipments) {
		shipments.forEach(({ shipment_id, start_city, end_city, day_of_week }) => {
			this.addCities(start_city, end_city);
			this.addShipment(shipment_id, start_city, end_city, day_of_week);
		});
	}

	traverseDFS(city) {
        const visited = {};
        const pathStack = [];
        const shipments_from_city = this.adjList.get(city);

        this.DFS(city, shipments_from_city[0].shipment_id, visited, pathStack, true, shipments_from_city[0].day_of_week);

        this.validPaths.sort((a,b) => {
			if(a.length < b.length) return 1;
			else if(a.length > b.length) return -1;
			else return 0;
		});
    }

    DFS(city, shipment_id, visited, pathStack, first, current_day) {
        const shipments_from_city = this.adjList.get(city);
        
        if(!shipments_from_city.length) {
            this.validPaths.push([...pathStack])
            pathStack.pop();
            return;
        }
 
        for (let shipment_no in shipments_from_city) {
            const shipment = shipments_from_city[shipment_no];

            if (!visited[shipment.shipment_id] && (this.NEXT_DAY[current_day] === shipment.day_of_week) || first) {
                visited[shipment.shipment_id] = true;
                pathStack.push(shipment.shipment_id);
                this.DFS(shipment.end_city, shipment.shipment_id, visited, pathStack, false, shipment.day_of_week);
            }
        }

        if(pathStack.length) {
            this.validPaths.push([...pathStack])
            pathStack.pop();
        }
    }
}

module.exports = Graph;