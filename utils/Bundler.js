class Bundler {
	constructor(shipmentsToGo) {
		this.shipmentsToGo = shipmentsToGo;
		this.cache = {};
		this.bundleGenerated = true;
		this.bundles = [];
	}

	bundle(paths, set = [], shipmentsToGo = this.shipmentsToGo) {
		if(!paths.length && this.bundleGenerated) {
		    if(!this.bundles.length) {
		        this.bundles = [...set];
		    }
		    
		    this.bundleGenerated = false;
		} else if(this.bundleGenerated) {
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