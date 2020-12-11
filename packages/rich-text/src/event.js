function LoadEvent() {
  this.listeners = {};
  this.on = function(eventName, callback) {
    if (this.listeners[eventName] === undefined) {
      this.listeners[eventName] = [];
    }
    this.listeners[eventName].push(callback);
  };
  this.emit = function(eventName) {
    this.listeners[eventName] &&
			this.listeners[eventName].forEach((callback) => callback());
  };
}
export default LoadEvent;
