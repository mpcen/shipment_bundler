/*
	- We aim for the longest path to exhaust as many shipments as possible from the start which helps elimiate recursive calls
	- The Bundler attempts to take all subsets of each set if and only if the items in each subset are unique.
	- This is the purpose of the cache - it's used to keep track of each item in the current set for O(1) lookup time.
	- Each time a new subset is added to the set, shipmentsToGo is decremented by the total number of items in the
	new subset and we only attempt to add new subsets that have items <= shipmentsToGo.
	- This also helps in optimization to avoid adding subsets that will eventually exhaust to failure.
		For example:
			given  valid paths: [[1,2,3], [2,3,4], [3], [4]] and current set of [[1,2,3]], shipmentsToGo would be 1 at this point.
			If we try to add the subset [2,3,4] into the current set,
			we would end up rejecting this because it contains 3 paths when we only need 1.
	- Once all paths have been exhausted, we can assume we've found our optimal bundle so we avoid any other check to
	quickly break out of the recursion.
*/

class Bundler {
	constructor(shipmentsToGo) {
		this.shipmentsToGo = shipmentsToGo;
		this.cache = {};
		this.bundleGenerated = false;
		this.bundles = [];
	}

	bundle(paths, set = [], shipmentsToGo = this.shipmentsToGo) {
		if(!paths.length && !this.bundleGenerated) {
		    if(!this.bundles.length) {
		        this.bundles = [...set];
		    }
		    
		    this.bundleGenerated = true;
		} else if(!this.bundleGenerated) {
			let item = paths.shift();

			if(item.length > this.shipmentsToGo) {
			    this.bundle(paths, set, this.shipmentsToGo);
			} else {
			    const notYetSeen = item.every(_item => !this.cache[_item]);

	            if(notYetSeen) {
	                item.forEach(_item => {
	                    this.cache[_item] = true;
	                    this.shipmentsToGo--;
	                });

	                set.push(item);
	            }

	            this.bundle(paths, set, this.shipmentsToGo);

	            const removed = set.pop();

	            if(removed) {
	                removed.forEach(_item => {
	                    this.cache[_item] = false;
	                    this.shipmentsToGo++;
	                });
	            }

	            this.bundle(paths, set, this.shipmentsToGo);

				paths.unshift(item);
			}
		}
	}

	print() {
		this.bundles.forEach(s => {
		    console.log(s.join(' '));
		});
	}
}

module.exports = Bundler;